'use strict';

const mergeDataType = require('./mergeData');
const toMergeData = require('../helpers/toMergeData');

/**
 * Represents an individual BulkRecipient for a message.
 * @example
 * var bulkRecipient = require('./bulkRecipient');
 * var mergeData = require('./mergeData');
 * ...
 * var email1 = new bulkRecipient("recipient@example.com");
 * 
 * var email2 = new bulkRecipient("recipient@example.com", "Recipient");
 * 
 * var email3 = new bulkRecipient("recipient@example.com", "Recipient"); 
 * email3.mergeData.push(new mergeData("name1", "value1")); ;
 * email3.addMergeData(mdata2)
 */
class BulkRecipient {

    /**
     * Creates a new instance of the BulkRecipient class.
     * @constructor
     * @param {string} emailAddress, A valid email address.
     * @param {string} [friendlyName], The friendly or display name for the recipient.
     * @param {MergeData} mergeData, Merge data unique to the instance of the bulk recipient.
     */
    constructor(emailAddress, { friendlyName = null, mergeData = null } = {}) {
        this.setEmail(emailAddress);
        this.setFriendlyName(friendlyName);
        
        /**
         * the list of merge data, an array of MergeData items
         */
        this.mergeData = [];

        this.setMergeData(mergeData);    
    }

    /**
     * Sets A valid email address
     * @param  {string} value
     */
    setEmail(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid email address, type of 'string' was expected.");
        }
        /**
         * A valid email address
         */
        this.emailAddress = value;
    }

    /**
     * Sets the friendly or display name for the recipient.
     * @param  {string} value
     */
    setFriendlyName(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment name, type of 'string' was expected.");
        }
        /**
         * The friendly or display name for the recipient.
         */
        this.friendlyName = value;
    }

    /**
     * Sets the list of merge data, an array of MergeData items
     * @param  {MergeData} value
     */
    setMergeData(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if(value && Array.isArray(value)) {
            value.forEach(element => {
                this.mergeData.push(toMergeData.convert(element));
            });            
        }
        else  {
            this.mergeData.push(toMergeData.convert(value));
        }
    }
    /**
     * Add a MergeData to the array of GlobalMergeData
     * @param  {string} key
     * @param  {string} value
     */
    addMergeData(key, value) {
        this.mergeData.push(new mergeDataType(key, value));
    }
    
    /**
     * Determines if the Email Address is valid. Does simple syntax validation on the address.
     * @returns {boolean}
     */
    isValid() {

        if (this.emailAddress && this.emailAddress === "") return false;        
        if (this.emailAddress.length > 320) return false;

        var parts = this.emailAddress.split("@");
        if (parts.length !== 2) return false;
        if (parts[0].trim().length < 1) return false;
        if (parts[1].trim().length < 1) return false;
        
        var badEmailCharacters = [ ",", " ", ";"];
        return !badEmailCharacters.some(x=>this.emailAddress.includes(x));
    }

    /**
     * String representation of the CustomHeader class.
     * @returns {string}
     */
    toString() {
        if (this.friendlyName && this.friendlyName !== "") {
            return `${this.friendlyName} <${this.email}>`;            
        }
        return this.email;
    }
    /**
     * JSON string representation of the bulkRecipient class.
     */
    toJSON() {
        
        var json = [];
        json.push({ field: "DeliveryAddress", value: this.emailAddress });
        
        if (this.friendlyName && this.friendlyName !== "") {
            json.push({ field: "RecipientName", value: this.friendlyName });
        }
        
        if (this.mergeData.length > 0) {
            this.mergeData.forEach(element => {                
                json.push(toMergeData.convert(element).toJSON());
            });
        }
        return json

    }
}

module.exports = BulkRecipient;