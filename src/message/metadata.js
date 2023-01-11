'use strict';

/**
 * Represents Metadata as a name and value pair.
 * @example
 * var metadata = require('./metadata');
 * ...
 *
 * var header1 = new metadata("name1", "value1");
 */
class Metadata {

    /**
     * Creates a new instance of the Metadata class.
     * @constructor
     * @param {string} name, The name of your custom header.
     * @param {string} value, The value of your custom header.
     * @example
     * var header1 = Metadata("name1", "value1");
     *
     */
    constructor(name, value) {
        this.setName(name);
        this.setValue(value);
    }

    /**
     * Sets the Metadata Name.
     * @param  {string} value
     */
    setName(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid custom header name, type of 'string' was expected.");
        }
        /**
         * The Metadata Name.
         */
        this.name = value;
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
        if ((!this.name && this.name !== "") && (!this.value && this.value !== ""))
            return false;
        return true;
    }
    /**
     * String representation of the Metadata class.
     */
    toString() {
        return `${this.name}, ${this.value}`;
    }
    /**
     * JSON string representation of the Metadata class.
     */
    toJSON() {

        return {
            name: this.name,
            value: this.value
        };

    }
}

module.exports = Metadata;