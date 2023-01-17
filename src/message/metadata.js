'use strict';

/**
 * Represents Metadata as a key and value pair.
 * @example
 * var metadata = require('./metadata');
 * ...
 *
 * var metadata1 = new metadata("key1", "value1");
 */
class Metadata {

    /**
     * Creates a new instance of the Metadata class.
     * @constructor
     * @param {string} key, The key of your custom header.
     * @param {string} value, The value of your custom header.
     * @example
     * var metadata1 = Metadata("key1", "value1");
     *
     */
    constructor(key, value) {
        this.setKey(key);
        this.setValue(value);
    }

    /**
     * Sets the Metadata Key.
     * @param  {string} value
     */
    setKey(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid metadata, type of 'string' was expected.");
        }
        /**
         * The Metadata Key.
         */
        this.key = value;
    }

    /**
     * Sets the Metadata Value.
     * @param  {string} value
     */
    setValue(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid custom header value, type of 'string' was expected.");
        }
        /**
         * The Metadata Value.
         */
        this.value = value;
    }

    /**
     * A quick check to ensure that the Metadata is valid.
     */
    isValid() {
        if ((!this.key && this.key !== "") && (!this.value && this.value !== ""))
            return false;
        return true;
    }
    /**
     * String representation of the Metadata class.
     */
    toString() {
        return `${this.key}, ${this.value}`;
    }
    /**
     * JSON string representation of the Metadata class.
     */
    toJSON() {

        return {
            key: this.key,
            value: this.value
        };

    }
}

module.exports = Metadata;