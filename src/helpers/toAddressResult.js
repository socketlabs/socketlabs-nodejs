'use strict';

const addressResult = require('../addressResult');

/**
 * Convert an object to an addressResult
 */
class ToAddressResult {
    
    /**
     * Convert an object to an addressResult
     * @param  {object} value - value to convert to an addressResult
     * @returns {addressResult} addressResult Type
     */
    static convert(value) {
        
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value.constructor === addressResult) {
            return value;
        }
        else if (typeof value === 'object') {
            var e,a,r;
            if('emailAddress' in value) {
                e = value.emailAddress;
            }
            if('accepted' in value) {
                a = value.accepted;
            }
            if('errorCode' in value) {
                r = value.errorCode;
            }
            return new addressResult(), {
                emailAddress: e,
                accepted: a,
                errorCode: r
            };
        }
        else {
            throw new Error("Invalid addressResult, the addressResult was not submitted in an expected format!");
        }
    }


}

module.exports = ToAddressResult;