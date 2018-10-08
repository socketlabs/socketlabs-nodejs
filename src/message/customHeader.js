'use strict';

/**
 * Represents CustomHeader as a name and value pair.
 * @example
 * var customHeader = require('./customHeader');
 * ...
 * 
 * var header1 = new customHeader("name1", "value1");
 */
class CustomHeader {

    /**
     * Creates a new instance of the CustomHeader class.
     * @constructor
     * @param {string} name, The name of your custom header.
     * @param {string} value, The value of your custom header.
     * @example
     * var header1 = CustomHeader("name1", "value1");
     * 
     */
    constructor(name, value) {
        this.setName(name);
        this.setValue(value);
    }

    /**
     * Sets the CustomHeader Name.
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
         * The CustomHeader Name.
         */
        this.name = value;
    }

    /**
     * Sets the CustomHeader Value.
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
         * The CustomHeader Value.
         */
        this.value = value;
    }
    
    /**
     * A quick check to ensure that the CustomHeader is valid.
     */
    isValid() {
        if ((!this.name && this.name !== "") && (!this.value && this.value !== ""))
            return false;
        return true;
    }
    /**
     * String representation of the CustomHeader class.
     */
    toString() {
        return `${this.name}, ${this.value}`;
    }
    /**
     * JSON string representation of the CustomHeader class.
     */
    toJSON() {

        return {
            name : this.name, 
            value : this.value
        };

    }
}

module.exports = CustomHeader;