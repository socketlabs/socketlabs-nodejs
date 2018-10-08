'use strict';

/**
 * Represents an individual EmailAddress for a message.
 * @example
 * var emailAddress = require('./emailAddress');
 * ...
 * 
 * var email1 = new emailAddress("recipient1@example.com");
 * var email2 = new emailAddress("recipient2@example.com", { friendlyName: "Recipient #2" });
 */
class EmailAddress {

    /**
     * Creates a new instance of the EmailAddress class.
     * @constructor
     * @param {string} emailAddress, A valid email address.
     * @param {string} [friendlyName], The friendly or display name for the recipient.
     */
    constructor(emailAddress, { friendlyName = null } = {}) {
        this.setEmail(emailAddress);
        this.setFriendlyName(friendlyName);
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
          throw new Error("Invalid attachment name, type of 'string' was expected.");
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
        return this.emailAddress;
    }
    /**
     * JSON string representation of the CustomHeader class.
     */
    toJSON() {

        if (this.friendlyName && this.friendlyName !== "") {
            return { 
                emailAddress:  this.emailAddress,
                friendlyName: this.friendlyName                
            };
        }
        return { emailAddress:  this.emailAddress };

    }
}

module.exports = EmailAddress;