'use strict';

const mergeData = require('../message/mergeData');

/**
 * Convert an object to a mergeData
 */
class ToMergeData {
    
    /**
     * Convert an object to a mergeData
     * @param  {object} value - value to convert to an mergeData
     * @returns {mergeData} mergeData Type
     */
    static convert(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value.constructor === mergeData) {
            return value;
        }
        else if (typeof value === 'object') {
            var k,v;
            if('key' in value) {
                k = value.key;
            }
            if('value' in value) {
                v = value.value;
            }
            return  new mergeData(k,v);
        }
        else {
            throw new Error("Invalid merge data, the merge data was not submitted in an expected format!");
        }
    }
}

module.exports = ToMergeData;