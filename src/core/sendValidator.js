'use strict';

const { ToBulkRecipient, ToEmailAddress, ToCustomHeader } = require('../helpers/helpersClasses');

const sendResponse = require('../sendResponse');
const addressResult = require('../addressResult');
const sendResultEnum = require('../sendResultEnum');

const MaximumRecipientsPerMessage = 50;

/**
 * Used by the SocketLabsClient to conduct basic validation on the message before sending to the Injection API.
 */
class SendValidator {

    /**
     * Validate the ServerId and Api Key pair prior before sending to the Injection API.
     * @param  {number} serverId - Your SocketLabs ServerId number.
     * @param  {string} apiKey - Your SocketLabs Injection API key.
     * @returns A SendResponse with the validation results
     */
    validateCredentials(serverId, apiKey) {
        var result = new sendResponse();

        //String given
        if (typeof apiKey !== 'string') {
            result.setResult(sendResultEnum.AuthenticationValidationFailed);
            return result;
        }

        if (apiKey && apiKey === '') {
            result.setResult(sendResultEnum.AuthenticationValidationFailed);
            return result;
        }

        //int given
        if (Number.isInteger(serverId)) {
            result.setResult(sendResultEnum.AuthenticationValidationFailed);
            return result;
        }

        if (serverId <= 0) {
            result.setResult(sendResultEnum.AuthenticationValidationFailed);
            return result;
        }

        result.setResult(sendResultEnum.Success);
        return result;
    }

    /**
     * Validate a basic email message before sending to the Injection API.
     * @param  {basicMessage} message -  basicMessage to be sent.
     * @returns A SendResponse with the validation results
     */
    validateBasicMessage(message) {

        var result = new sendResponse();

        // Check Subject
        if (!this.hasValidString(message.subject)) {
            result.setResult(sendResultEnum.MessageValidationEmptySubject);
            return result;
        }

        // Check From
        var from = ToEmailAddress.convert(message.from);
        if (!this.hasFromAddress(from)) {
            result.setResult(sendResultEnum.EmailAddressValidationMissingFrom);
            return result;
        }
        if (!from.isValid()) {
            result.setResult(sendResultEnum.EmailAddressValidationInvalidFrom);
            return result;
        }

        // Check ReplyTo
        if (!this.isValidReplyTo(message.replyTo)) {
            result.setResult(sendResultEnum.RecipientValidationInvalidReplyTo);
            return result;
        }

        // Check message body
        if (!this.hasMessageBody(message.apiTemplate, message.htmlBody, message.textBody)) {
            result.setResult(sendResultEnum.MessageValidationEmptyMessage);
            return result;
        }

        // Check custom headers
        if (typeof message.customHeaders !== 'undefined' || message.customHeaders) {
            if (!this.hasValidCustomHeaders(message.customHeaders)) {
                result.setResult(sendResultEnum.MessageValidationInvalidCustomHeaders);
                return result;
            }
        }

        // Check email addresses
        return this.validateEmailAddresses(message.to, message.cc, message.bcc);

    }

    /**
     * Validate a bulk email message before sending to the Injection API.
     * @param  {bulkMessage} message -  bulkMessage to be sent.
     * @returns A SendResponse with the validation results
     */
    validateBulkMessage(message) {

        var result = new sendResponse();

        // Check Subject
        if (!this.hasValidString(message.subject)) {
            result.setResult(sendResultEnum.MessageValidationEmptySubject);
            return result;
        }

        // Check From
        var from = ToEmailAddress.convert(message.from);
        if (!this.hasFromAddress(from)) {
            result.setResult(sendResultEnum.EmailAddressValidationMissingFrom);
            return result;
        }
        if (!from.isValid()) {
            result.setResult(sendResultEnum.EmailAddressValidationInvalidFrom);
            return result;
        }

        // Check ReplyTo
        if (!this.isValidReplyTo(message.replyTo)) {
            result.setResult(sendResultEnum.RecipientValidationInvalidReplyTo);
            return result;
        }

        // Check message body
        if (!this.hasMessageBody(message.apiTemplate, message.htmlBody, message.textBody)) {
            result.setResult(sendResultEnum.MessageValidationEmptyMessage);
            return result;
        }

        // Check custom headers
        if (typeof message.customHeaders !== 'undefined' || message.customHeaders) {
            if (!this.hasValidCustomHeaders(message.customHeaders)) {
                result.setResult(sendResultEnum.MessageValidationInvalidCustomHeaders);
                return result;
            }
        }

        // Check bulk recipients
        return this.validateBulkRecipients(message.to, message.cc, message.bcc);

    }


    /**
     * Check if the fromAddress is not empty
     * @param  {emailAddress} fromAddress - the from email address
     * @returns {bool} the validation result
     */
    hasValidString(value) {
        if (typeof value === 'undefined' || !value) {
            return false;
        }
        if (value && value === '') {
            return false;
        }
        return true;
    }

    /**
     * Check if the fromAddress is not empty
     * @param  {emailAddress} fromAddress - the from email address
     * @returns {bool} the validation result
     */
    hasFromAddress(value) {
        if (typeof value === 'undefined' || !value) {
            return false;
        }
        if (value && value.emailAddress === '') {
            return false;
        }
        return true;
    }

    /**
     * Check if the reply to is not empty and valid
     * @param  {emailAddress} replyTo - the reply To email address
     * @returns {bool} the validation result
     */
    isValidReplyTo(value) {
        if (typeof value === 'undefined' || !value) {
            return true; // undefined is allowed
        }
        var replyTo = ToEmailAddress.convert(value);
        if (replyTo && replyTo.emailAddress === '' && replyTo.friendlyName === '') {
            return true;
        }
        return replyTo.isValid();
    }


    /**
     * Check if the message has a Message Body
     * If an Api Template is specified it will override the HtmlBody, and/or the textBody.
     * If no Api Template is specified the HtmlBody, and/or the textBody must me set
     * @param  {number} apiTemplate - the api template id
     * @param  {string} htmlBody - the html body
     * @param  {string} textBody - the text body
     * @returns {bool} the validation result
     */
    hasMessageBody(apiTemplate, htmlBody, textBody) {

        if ((typeof apiTemplate !== 'undefined' || apiTemplate) &&
            (typeof apiTemplate === 'number') &&
            (apiTemplate > 0)) {
            return true;
        }

        return (this.hasValidString(htmlBody) || this.hasValidString(textBody));
    }

    /**
     * Check if customHeaders in the array are valid
     * @param  {customHeader[]} value - array of customHeader
     * @returns {bool} the validation result
     */
    hasValidCustomHeaders(value) {
        if (typeof value === 'undefined' || !value) {
            return true;
        }
        if (!Array.isArray(value)) {
            return false;
        }
        if (value.length == 0) {
            return true;
        }
        if (value.length > 0) {
            try {
                value.forEach(element => {
                    if (!ToCustomHeader.convert(element).isValid())
                        return false;
                });
            } catch (error) {
                return false;
            } finally {
                return true;
            }
        }
    }

    /**
     * Validate all emailAddresses in all 3 recipient lists 'to', 'cc', and 'bcc'
     * @param  {emailAddress[]} to - array of emailAddress
     * @param  {emailAddress[]} cc - array of emailAddress
     * @param  {emailAddress[]} bcc - array of emailAddress
     * @returns {sendResponse} the validation result
     */
    validateEmailAddresses(to, cc, bcc) {

        var result = new sendResponse();

        var fullRecipientCount = this.getEmailAddressesCount(to, cc, bcc);
        if (fullRecipientCount <= 0) {
            result.setResult(sendResultEnum.RecipientValidationNoneInMessage);
            return result;
        }

        if (fullRecipientCount > MaximumRecipientsPerMessage) {
            result.setResult(sendResultEnum.RecipientValidationMaxExceeded);
            return result;
        }

        var invalidRec = this.hasInvalidEmailAddresses(to, cc, bcc);
        if (invalidRec != null && invalidRec.length > 0) {
            result.setResult(sendResultEnum.RecipientValidationInvalidRecipients);
            result.addressResults = invalidRec;
            return result;
        }

        result.setResult(sendResultEnum.Success);
        return result;

    }
    /**
     * Validate all bulkRecipients in the 'to' recipient list
     * @param  {bulkRecipient[]} to - array of bulkRecipient
     * @returns {addressResult} the validation result
     */
    validateBulkRecipients(to) {

        var result = new sendResponse();

        var fullRecipientCount = 0;
        if ((typeof to !== 'undefined' || to) && (Array.isArray(to))) {
            fullRecipientCount = to.length;
        }
        if (fullRecipientCount <= 0) {
            result.setResult(sendResultEnum.RecipientValidationNoneInMessage);
            return result;
        }
        if (fullRecipientCount > MaximumRecipientsPerMessage) {
            result.setResult(sendResultEnum.RecipientValidationMaxExceeded);
            return result;
        }

        var invalidRec = this.hasInvalidBulkRecipients(to);
        if (invalidRec != null && invalidRec.length > 0) {
            result.setResult(sendResultEnum.RecipientValidationInvalidRecipients);
            result.addressResults = invalidRec;
            return result;
        }

        result.setResult(sendResultEnum.Success);
        return result;
    }



    /**
     * Get a cumulative count of all emailAddresses in all 3 recipient lists 'to', 'cc', and 'bcc'
     * @param  {emailAddress[]} to - array of emailAddress
     * @param  {emailAddress[]} cc - array of emailAddress
     * @param  {emailAddress[]} bcc - array of emailAddress
     * @returns {addressResult} the validation result
     */
    getEmailAddressesCount(to, cc, bcc) {
        var recipientCount = 0;
        if ((typeof to !== 'undefined' || to) && (Array.isArray(to))) {
            recipientCount += to.length;
        }
        if ((typeof cc !== 'undefined' || cc) && (Array.isArray(cc))) {
            recipientCount += cc.length;
        }
        if ((typeof bcc !== 'undefined' || bcc) && (Array.isArray(bcc))) {
            recipientCount += bcc.length;
        }
        return recipientCount;
    }

    /**
     * Find all invalid email addresses in all 3 recipient lists 'to', 'cc', and 'bcc'
     * @param  {emailAddress[]} to - array of emailAddress
     * @param  {emailAddress[]} cc - array of emailAddress
     * @param  {emailAddress[]} bcc - array of emailAddress
     * @returns {addressResult[]} the validation result
     */
    hasInvalidEmailAddresses(to, cc, bcc) {
        var invalid = [];
        if ((typeof to !== 'undefined' || to) && (Array.isArray(to))) {
            this.findInvalidEmailAddresses(to).forEach(e => {
                invalid.push(e)
            });
        }
        if ((typeof cc !== 'undefined' || cc) && (Array.isArray(cc))) {
            this.findInvalidEmailAddresses(cc).forEach(e => {
                invalid.push(e)
            });
        }
        if ((typeof bcc !== 'undefined' || bcc) && (Array.isArray(bcc))) {
            this.findInvalidEmailAddresses(bcc).forEach(e => {
                invalid.push(e)
            });
        }
        return invalid;
    }

    /**
     * Find all invalid bulkRecipients in the 'to' recipient list
     * @param  {bulkRecipient[]} to - array of bulkRecipient
     * @returns {addressResult[]} the validation result
     */
    hasInvalidBulkRecipients(to) {
        if ((typeof to !== 'undefined' || to) && (Array.isArray(to))) {
            return this.findInvalidBulkRecipients(to);
        }
    }

    /**
     * Find all invalid bulkRecipients in the array
     * @param  {emailAddress[]} value - array of emailAddress
     * @returns {addressResult[]} the validation result
     */
    findInvalidEmailAddresses(value) {
        var invalid = [];
        if (value.length > 0) {
            try {
                value.forEach(element => {
                    var e = ToEmailAddress.convert(element);
                    if (!e.isValid()) {
                        invalid.push(new addressResult(
                            {
                                accepted: false,
                                emailAddress: e.emailAddress,
                                errorCode: "InvalidAddress"
                            })
                        );
                    }
                });
            } catch (error) {
                return invalid;
            }
        }
        return invalid;
    }

    /**
     * Find all invalid bulkRecipients in the array
     * @param  {bulkRecipient[]} value - array of bulkRecipient
     * @returns {addressResult[]} the validation result
     */
    findInvalidBulkRecipients(value) {
        var invalid = [];
        if (value.length > 0) {
            try {
                value.forEach(element => {
                    var e = ToBulkRecipient.convert(element);
                    if (!e.isValid()) {
                        invalid.push(new addressResult(
                            {
                                accepted: false,
                                emailAddress: e.emailAddress,
                                errorCode: "InvalidAddress"
                            })
                        );
                    }
                });
            } catch (error) {
                return invalid;
            }
        }
        return invalid;
    }

}


module.exports = SendValidator;
