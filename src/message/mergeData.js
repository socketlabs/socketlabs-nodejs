'use strict';

/**
 * Represents MergeData as a key and value pair.
 * @example
 * var mergeData = require('./mergeData');
 * ...
 * 
 * var header1 = new mergeData("key1", "value1");
 */
class MergeData {

    /**
     * Creates a new instance of the MergeData class.
     * @constructor
     * @param {string} key, The name of your MergeData field.
     * @param {string} value, The value of your field.
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    /**
     * Sets the MergeData Key.
     * @param  {string} value
     */
    setKey(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment name, type of 'string' was expected.");
        }
        this.key = value;
    }

    /**
     * Sets the MergeData Value.
     * @param  {string} value
     */
    setValue(val) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment name, type of 'string' was expected.");
        }
        this.value = val;
    }
    
    /**
     * A quick check to ensure that the MergeData is valid.
     */
    isValid() {
        if ((!this.key && this.key !== "") && (!this.value && this.value !== ""))
            return false;
        return true;
    }
    /**
     * String representation of the MergeData class.
     */
    toString() {
        return `${this.key}, ${this.value}`;
    }
    /**
     * JSON string representation of the CustomHeader class.
     */
    toJSON() {

        return {
            field : this.key, 
            value : this.value
        };

    }
}

module.exports = MergeData;