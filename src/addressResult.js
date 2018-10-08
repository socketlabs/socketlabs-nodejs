'use strict';

/**
 * The result of a single recipient in the Injection request.
 */
class AddressResult {

    /**
     * Creates a new instance of the AddressResult class.
     * @constructor
     * @param {string} emailAddress - The recipient's email address.
     * @param {string} accepted - Whether the recipient was accepted for delivery.
     * @param {string} errorCode - An error code detailing why the recipient was not accepted.
     */
    constructor({
        emailAddress = null,
        accepted = null,
        errorCode = null,
    } = {}) { 
        
        if(emailAddress){
            this.setEmailAddress(emailAddress);
        }

        if(accepted){
            this.setAccepted(accepted);
        }

        if(errorCode){
            this.setErrorCode(errorCode);
        }
    }

    /**
     * Set the recipient's email address.
     * @param  {string} value
     */
    setEmailAddress(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid emailAddress value, type of 'string' was expected.");
        }
        /**
         * The recipient's email address.
         */
        this.emailAddress = value;
    }

    /**
     * Set whether the recipient was accepted for delivery.
     * @param  {boolean} value
     */
    setAccepted(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'boolean') {
          throw new Error("Invalid accepted value, type of 'boolean' was expected.");
        }
        /**
         * Whether the recipient was accepted for delivery.
         */
        this.accepted = value;
    }
    
    /**
     * set an error code detailing why the recipient was not accepted.
     * @param  {string} value
     */
    setErrorCode(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid errorCode value, type of 'string' was expected.");
        }
        /**
         * An error code detailing why the recipient was not accepted.
         */
        this.errorCode = value;
    }
    
    /**
     * String representation of the AddressResult class.
     */
    toString() {
        return `${this.errorCode}: ${this.emailAddress}`;
    }

}

module.exports = AddressResult;