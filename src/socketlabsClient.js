const axios = require('axios');
const http = require('http');
const https = require('https');

const version = require('../package.json').version;
const sendValidator = require('./core/sendValidator');
const factory = require('./core/injectionRequestFactory');
const { Attachment, BasicMessage, BulkMessage, BulkRecipient, CustomHeader, EmailAddress, MergeData } = require('./message/messageClasses');
const sendResultEnum = require('./sendResultEnum');
const sendResponse = require('./sendResponse');

/**
 * SocketLabsClient is a wrapper for the SocketLabs Injection API that makes
 * it easy to send messages and parse responses.
 * @example
 * var message = new BasicMessage();
 *
 * // Build your message
 *
 * var client = new SocketLabsClient(00000, "apiKey");
 *
 * client.send(message).then(
 *     (res)=>{
 *         // Handle Success
 *     },
 *     (err) => {
 *         // Handle Error
 *     }
 * );
 */
class SocketLabsClient {

    /**
     * Creates a new instance of the SocketLabsClient
     * @param {number} serverId - Your SocketLabs ServerId number.
     * @param {string} apiKey - Your SocketLabs Injection API key
     * @param {string} endpointUrl - The SocketLabs Injection API endpoint Url
     * @param {string} optionalProxy - The http proxy you would like to use.
     * @param {number} requestTimeout  - the timeout period for the Injection API request (in Seconds). Default: 120s
     */
    constructor(serverId, apiKey, {

        endpointUrl = null,
        optionalProxy = null,
        requestTimeout = null,
    } = {}) {

        /**
         * Your SocketLabs ServerId number.
         */
        this.serverId = serverId;

        /**
         * Your SocketLabs Injection API key
         */
        this.apiKey = apiKey;

        /**
         * The SocketLabs Injection API user agent
         */
        this.userAgent = `SocketLabs-node/${version} (nodejs ${process.version})`;

        /**
         * The SocketLabs Injection API endpoint Url
         */
        this.endpointUrl = "https://inject.socketlabs.com/api/v1/email";

        if (endpointUrl && endpointUrl !== '') {
            this.endpointUrl = endpointUrl;
        }

        if (optionalProxy && typeof optionalProxy === 'string') {
            this.proxy = optionalProxy;
        }

        /**
         * A timeout period for the Injection API request (in Seconds). Default: 120s
         */
        this.requestTimeout = 120;

        if (requestTimeout && requestTimeout !== '') {
            this.requestTimeout = requestTimeout
        }

    }

    createRequest(requestJson) {

        let request = {
            url: this.endpointUrl,
            method: "POST",
            data: {
                apiKey: this.apiKey,
                serverId: this.serverId,
                messages: [requestJson],
            },
            headers: { 'User-Agent': this.userAgent },
            timeout: this.requestTimeout * 1000,

        };

        if (this.proxy) {
            let proxyUrl = new URL(this.proxy);
            if (proxyUrl.port == 443) {
                request.httpAgent = new http.Agent({
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                });
            }
            else {
                request.httpsAgent = new https.Agent({
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                });
            };

        }

        console.log(request);

        return request;
    }

    /**
     * Sends a basic or bulk email message and returns the response from the Injection API.
     * @param {object[]} messageData.to - the list of To recipients. (emailAddress[] or bulkRecipient[])
     * @param {emailAddress} messageData.from - the From address.
     * @param {emailAddress} [messageData.replyTo] - the Reply To address.
     * @param {string} messageData.subject - the message Subject.
     * @param {emailAddress[]} [messageData.cc] - the optional list of CC recipients. (basic send only)
     * @param {emailAddress[]} [messageData.bcc] - the optional list of BCC recipients. (basic send only)
     * @param {string} [messageData.textBody] - the plain text portion of the message body.
     * @param {string} [messageData.htmlBody] - the HTML portion of the message body.
     * @param {number} [messageData.apiTemplate] - the Api Template for the message.
     * @param {*} [messageData.attachments] - the optional list of file attachments for the message.
     * @param {string} [messageData.messageId] - the custom MessageId for the message.
     * @param {string} [messageData.mailingId] - the custom MailingId for the message.
     * @param {string} [messageData.charSet] - the optional character set for your message.
     * @param {customHeaders[]} [messageData.customHeaders] - the optional list of custom message headers added to the message.
     * @param {mergeData[]} [messageData.globalMergeData] - the optional list of mergeData items that will be global across the whole message. (bulk send only)
     * @param {string} messageData.messageType - type of message being sent
     * @returns {sendResponse} - SendResponse promise
     */
    send(messageData) {
        return new Promise((resolve, reject) => {

            var validator = new sendValidator();
            var result = validator.validateCredentials(this.serverId, this.apiKey);
            if (result.result !== sendResultEnum.Success) {
                return reject(result);
            }

            factory.generateRequest(messageData).then(
                (requestJson) => {
                    if (requestJson) {

                        let request = this.createRequest(requestJson);

                        axios(request)
                            .then((response) => {
                                var response = sendResponse.parse(response);
                                if (response.result === sendResultEnum.Success) {
                                    resolve(response);
                                } else {
                                    reject(response)
                                }

                            }, (error) => {
                                result = new sendResponse({ result: sendResultEnum.UnknownError });
                                if (typeof error === 'string') result.responseMessage = error;
                                reject(result);
                            });

                    }
                },
                (errorResult) => {
                    reject(errorResult);
                });
        });
    }
}


module.exports = {
    SocketLabsClient,
    Attachment,
    BasicMessage,
    BulkMessage,
    BulkRecipient,
    CustomHeader,
    EmailAddress,
    MergeData
};
