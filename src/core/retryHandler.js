'use strict';

const axios = require('axios');
const promiseRetry = require('promise-retry');

class RetryHandler {
    /**
   * Creates a new instance of the SocketLabsClient
   * @param {object} request - Request options
   * @param {object} retrySettings  - The retry value sent .
   *
   */

    constructor(
        maximumNumberOfRetries) {

        this._defaultNumberOfRetries = 0;
        this._maximumAllowedNumberOfRetries = 5;

        if (maximumNumberOfRetries != null) {
            if (maximumNumberOfRetries < 0) throw new Error(`Argument maximumNumberOfRetries is invalid. maximumNumberOfRetries must be greater than 0`);
            if (maximumNumberOfRetries > this._maximumAllowedNumberOfRetries) throw new Error(`Argument maximumNumberOfRetries is invalid. The maximum number of allowed retries is ${this._maximumAllowedNumberOfRetries}`);

            this.MaximumNumberOfRetries = maximumNumberOfRetries;
        }
        else
            this.MaximumNumberOfRetries = this._defaultNumberOfRetries;

        this.errorStatusCodes = [500, 502, 503, 504, "ECONNABORTED"];

    }

    /**
     *
     * @param {*} request
     * @returns
     */
    send(request) {
        return new Promise((resolve, reject) => {

            promiseRetry(
                {
                    retries: this.MaximumNumberOfRetries,
                    factor: 2,
                    randomize: true,
                    minTimeout: 1000,
                    maxTimeout: 10000
                },
                (retry, number) => {
                    console.log(`attempt: ${number}`);
                    return axios(request)
                        .then(
                            (response) => { resolve(response); },
                            (error) => {
                                let statusCode = (error.code) ? error.code : (error.status) ? error.status : error.response.status;
                                console.log(`statusCode: ${statusCode}`);
                                if ((this.errorStatusCodes.includes(statusCode) &&
                                    number <= this.MaximumNumberOfRetries))
                                    retry(error);
                                reject(error);
                            }
                        )
                        .catch(retry);
                })
                .then(
                    (result) => { resolve(result); },
                    (error) => { reject(error) })
                .catch(error => { reject(error); });

        });
    }
}

module.exports = RetryHandler;