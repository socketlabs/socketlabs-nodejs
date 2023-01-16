'use strict';

const metadata = require('../message/metadata');

/**
 * Convert an object to a metadata
 */
class ToMetadata {

    /**
     * Convert an object to a metadata
     * @param  {object} value - value to convert to an metadata
     * @returns {metadata} metadata Type
     */
    static convert(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value.constructor === metadata) {
            return value;
        }
        else if (typeof value === 'object') {
            var n, v;
            if ('key' in value) {
                n = value.key;
            }
            if ('value' in value) {
                v = value.value;
            }
            return new metadata(n, v);
        }
        else {
            throw new Error("Invalid metadata, the metadata was not submitted in an expected format!");
        }
    }

}

module.exports = ToMetadata;