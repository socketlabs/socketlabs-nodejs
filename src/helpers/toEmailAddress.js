'use strict';

const emailAddress = require('../message/emailAddress');

/**
 * Convert an object to an emailAddress
 */
class ToEmailAddress {
    
    /**
     * Convert an object to an emailAddress
     * @param  {object} value - value to convert to an emailAddress
     * @returns {emailAddress} emailAddress Type
     */
    static convert(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        else if (value.constructor === emailAddress) {
            return value;
        }
        else if (typeof value === 'string') {
            return new emailAddress(value);
        }
        else if (typeof value === 'object') {
            var e,f;
            if('emailAddress' in value) {
                e = value.emailAddress;
            }
            if('friendlyName' in value) {
                f = value.friendlyName;
            }
            return new emailAddress(e, { friendlyName: f });
        }
        else {
            throw new Error("Invalid email address, the email address was not submitted in an expected format!");
        }
    }

}

module.exports = ToEmailAddress;