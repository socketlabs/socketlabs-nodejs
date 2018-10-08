'use strict';

const customHeader = require('../message/customHeader');

/**
 * Convert an object to a customHeader
 */
class ToCustomHeader {
    
    /**
     * Convert an object to a customHeader
     * @param  {object} value - value to convert to an customHeader
     * @returns {customHeader} customHeader Type
     */
    static convert(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value.constructor === customHeader) {
            return value;
        }
        else if (typeof value === 'object') {
            var n,v;
            if('name' in value) {
                n = value.name;
            }
            if('value' in value) {
                v = value.value;
            }
            return  new customHeader(n,v);
        }
        else {
            throw new Error("Invalid custom header, the custom header was not submitted in an expected format!");
        }
    }

}

module.exports = ToCustomHeader;