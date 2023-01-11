'use strict';

const emailAddress = require('./emailAddress');
const bulkRecipient = require('./bulkRecipient');
const attachment = require('./attachment');
const customHeader = require('./customHeader');
const mergeData = require('./mergeData');
const metadata = require('./metadata');

const toBulkRecipient = require('../helpers/toBulkRecipient');
const toEmailAddress = require('../helpers/toEmailAddress');
const toCustomHeader = require('../helpers/toCustomHeader');
const toMergeData = require('../helpers/toMergeData');
const toAttachment = require('../helpers/toAttachment');
const toMetadata = require('../helpers/toMetadata');

/**
 * A bulk message usually contains a single recipient per message
 * and is generally used to send the same content to many recipients,
 * optionally customizing the message via the use of MergeData.
 *
 * @example
 * Example:
 * var bulkMessage = require('./bulkMessage');
 * var emailAddress = require('./emailAddress');
 * var bulkRecipient = require('./bulkRecipient');
 * var mergeData = require('./mergeData');
 * ...
 *
 * var message = new bulkMessage();
 *
 * message.subject = "Sending A Message";
 * message.htmlBody = "<html>This is the HtmlBody of my message sent to ##Name##</html>";
 * message.textBody = "This is the body of my message sent to ##Name##";
 *
 * message.from = new emailAddress("from@example.com");
 * message.replyTo = new emailAddress("replyto@example.com");
 *
 * var rec1MergeData = [];
 * rec1MergeData.push(new mergeData("Name", "recipient1"));
 * message.to.push(new bulkRecipient("recipient1@example.com"));
 *
 * var rec2MergeData = [];
 * rec2MergeData.push({ key: "Name", value: "recipient2" });
 * message.to.push(new bulkRecipient("recipient2@example.com", { friendlyName: "Recipient #2" }));
  *
 * message.addToEmailAddress("recipient3@example.com");
 * message.addToEmailAddress("recipient4@example.com", "Recipient #4");
 *
 * message.GlobalMergeData.push(new MergeData("Name", "value1"));
 *
 */
class BulkMessage {

    /**
     * Initializes a new instance of the BasicMessage class
     */
    constructor() {
        /**
         * The list of To recipients.
         */
        this.to = [];

        /**
         * The list of custom headers.
         */
        this.customHeaders = [];

        /**
         * The list of attachments.
         */
        this.attachments = [];

        /**
         * The list of global merge data.
         */
        this.globalMergeData = [];

        /**
         * The type of message.
         */
        this.messageType = "bulk";

        /**
         * The list of metadata.
         */
        this.metadata = [];

        /**
         * The list of tags.
         */
        this.tags = [];
    }

    /**
     * Sets the message Subject
     * @param  {string} value
     */
    setSubject(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid subject, type of 'string' was expected.");
        }
        /**
         * The message Subject
         */
        this.subject = value;
    }

    /**
     * Sets the plain text portion of the message body.
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate
     * @param  {string} value
     */
    setTextBody(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid Plain Text Body, type of 'string' was expected.");
        }
        /**
         * The plain text portion of the message body.
         */
        this.textBody = value;
    }

    /**
     * Sets the HTML portion of the message body.
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate
     * @param  {string} value
     */
    setHtmlBody(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid HTML Body, type of 'string' was expected.");
        }
        /**
         * The HTML portion of the message body.
         */
        this.htmlBody = value;
    }

    /**
     * Sets the Api Template for the message.
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate
     * @param  {int} value
     */
    setApiTemplate(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (!Number.isInteger(value)) {
            throw new Error("Invalid Api Template, type of 'Integer' was expected.");
        }
        /**
         * The Api Template for the message.
         */
        this.apiTemplate = value;
    }

    /**
     * Sets the ampBody for the message.
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate
     * @param  {int} value
     */
    setAmpBody(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid ampBody, type of 'string' was expected.");
        }
        /**
         * The Api Template for the message.
         */
        this.ampBody = value;
    }


    /**
     * Sets the custom MailingId for the message.
     * @param  {string} value
     */
    setMailingId(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid Mailing Id, type of 'string' was expected.");
        }
        /**
         * The custom MailingId for the message.
         * (Optional) See https://www.socketlabs.com/blog/best-practices-for-using-custom-mailingids-and-messageids/ for more information.
         */
        this.mailingId = value;
    }

    /**
     * Sets the custom MessageId for the message.
     * @param  {string} value
     */
    setMessageId(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid Message Id, type of 'string' was expected.");
        }
        /**
         * The custom MessageId for the message.
         */
        this.messageId = value;
    }

    /**
     * Sets the From address.
     * @param  {EmailAddress} value
     */
    setFrom(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        else {
            this.from = toEmailAddress.convert(value);
        }
    }
    /**
     * Sets the From address.
     * @param  {string} value
     * @param  {string} name
     */
    setFromAddress(value, name) {
        /**
         * The From emailAddress.
         */
        this.from = new emailAddress(value, { friendlyName: name });
    }

    /**
     * Sets the Reply To address.
     * @param  {EmailAddress} value
     */
    setReplyTo(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        else {
            this.replyTo = toEmailAddress.convert(value);
        }
    }
    /**
     * Sets the Reply To address.
     * @param  {string} value
     * @param  {string} name
     */
    setReplyToAddress(value, name) {
        /**
         * The Reply emailAddress.
         */
        this.replyTo = new emailAddress(value, { friendlyName: name });
    }

    /**
     * Sets the character set for your message.
     * (Optional) Default is UTF8
     * @param  {string} value
     */
    setCharSet(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid character set, type of 'string' was expected.");
        }
        /**
         * The character set for your message.
         */
        this.charSet = value;
    }


    /**
     * Sets the list of To recipients, an array of BulkRecipient items
     * @param  {Array} value
     */
    setTo(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value && Array.isArray(value)) {
            value.forEach(element => {
                this.to.push(toBulkRecipient.convert(element));
            });
        }
        else {
            this.to.push(toBulkRecipient.convert(value));
        }
    }
    /**
     * Add a new EmailAddress to the array of To recipients
     * @param  {string} value
     * @param  {string} name
     * @param  {string} mergeData
     */
    addToRecipient(value, name, mergeData) {
        this.to.push(new bulkRecipient(value, { friendlyName: name, mergeData: mergeData }));
    }

    /**
     * Sets the list of attachments, an array of Attachment items
     * @param  {EmailAddress} value
     */
    setAttachments(value) {
        this.addAttachments(value);
    }
    /**
     * Add an EmailAddress to the array of BCC recipients
     * @param  {Attachment} value
     */
    addAttachments(value) {
        if (value && Array.isArray(value)) {
            value.forEach(element => {
                if (element.constructor === attachment) {
                    this.attachments.push(element);
                }
            });
        }
        else if (value.constructor === attachment) {
            this.attachments.push(value);
        }
        else {
            throw new Error("Invalid attachment, the attachment was not submitted in an expected format!");
        }
    }


    /**
     * Sets the list of custom headers, an array of CustomHeader items
     * @param  {CustomHeader} value
     */
    setCustomHeaders(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value && Array.isArray(value)) {
            value.forEach(element => {
                this.customHeaders.push(toCustomHeader.convert(element));
            });
        }
        else {
            this.customHeaders.push(toCustomHeader.convert(value));
        }
    }
    /**
     * Add a CustomHeader to the message
     * @param  {string} name
     * @param  {string} value
     */
    addCustomHeaders(name, value) {
        this.customHeaders.push(new customHeader(name, value));
    }

    /**
     * Sets the list of MergeData items that will be global across the whole message, an array of MergeData items.
     * @param  {MergeData} value
     */
    setGlobalMergeData(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value && Array.isArray(value)) {
            value.forEach(element => {
                this.globalMergeData.push(toMergeData.convert(element));
            });
        }
        else {
            this.globalMergeData.push(toMergeData.convert(value));
        }
    }
    /**
     * Add a MergeData to the array of GlobalMergeData
     * @param  {string} key
     * @param  {string} value
     */
    addGlobalMergeData(key, value) {
        this.globalMergeData.push(new mergeData(key, value));
    }

    /**
     * Sets the list of metadata, an array of Metadata items
     * @param  {Metadata} value
     */
    setMetadata(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value && Array.isArray(value)) {
            value.forEach(element => {
                this.metadata.push(toMetadata.convert(element));
            });
        }
        else {
            this.metadata.push(toMetadata.convert(value));
        }
    }
    /**
     * Add a Metadata to the message
     * @param  {string} key
     * @param  {string} value
     */
    addMetadata(name, value) {
        this.metadata.push(new metadata(name, value));
    }

    /**
     * Sets the list of tags, an array of tags
     * @param  {Metadata} value
     */
    setTags(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value && Array.isArray(value)) {
            value.forEach(element => {
                this.tags.push(element);
            });
        }
        else {
            this.tags.push(value);
        }
    }
    /**
     * Add a Tag to the message
     * @param  {string} value
     */
    addTag(value) {
        this.tags.push(value);
    }

    /**
     * String representation of the CustomHeader class.
     * @returns {string}
     */
    toString() {
        return `Recipients: ${this.to.length},  Subject: '${this.subject}'`;
    }
    /**
     * JSON string representation of the CustomHeader class.
     */
    toJSON() {

        var json = {};

        if (this.subject) {
            json.subject = this.subject;
        }

        if (this.htmlBody) {
            json.htmlBody = this.htmlBody;
        }

        if (this.textBody) {
            json.textBody = this.textBody;
        }

        if (this.apiTemplate) {
            json.apiTemplate = this.apiTemplate;
        }

        if (this.ampBody) {
            json.ampBody = this.ampBody;
        }

        if (this.mailingId) {
            json.mailingId = this.mailingId;
        }

        if (this.messageId) {
            json.messageId = this.messageId;
        }

        json.from = toEmailAddress.convert(this.from).toJSON();

        if (this.replyTo) {
            json.replyTo = this.replyTo.toJSON();
        }

        if (this.charSet) {
            json.charSet = this.CharSet;
        }

        if (this.customHeaders.length > 0) {
            var _ch = [];
            this.customHeaders.forEach(element => {
                _ch.push(toCustomHeader.convert(element).toJSON());
            });
            json.customHeaders = _ch;
        }

        if (this.attachments.length > 0) {
            var _at = [];
            this.attachments.forEach(element => {
                _at.push(toAttachment.convert(element).toJSON());
            });
            json.attachments = _at;
        }

        if (this.to.length > 0) {

            if (!json.mergeData)
                json.mergeData = {};

            json.to = [{ emailAddress: "%%DeliveryAddress%%", friendlyName: "%%RecipientName%%" }];

            var _pm = [];
            if (this.to.length > 0) {
                this.to.forEach(element => {
                    _pm.push(toBulkRecipient.convert(element).toJSON());
                });
            }
            json.mergeData.PerMessage = _pm;
        }

        if (this.globalMergeData.length > 0) {

            if (!json.mergeData)
                json.mergeData = {};

            var _gd = [];
            if (this.globalMergeData.length > 0) {
                var keys = this.globalMergeData.map((mdata) => mdata.key.toLowerCase());
                var duplicateKeys = keys.reduce((acc, curr, i, arr) => {
                    if (arr.indexOf(curr) !== i && acc.indexOf(curr) < 0) {
                        acc.push(curr);
                    }
                    return acc;
                }, []);
                if (duplicateKeys.length > 0) {
                    throw new Error(`Invalid global merge data, merge data items contained duplicate keys: ${duplicateKeys}.`);
                }

                this.globalMergeData.forEach(element => {
                    _gd.push(toMergeData.convert(element).toJSON());
                });
            }
            json.mergeData.Global = _gd;
        }

        if (this.metadata.length > 0) {
            var _md = [];
            this.metadata.forEach(element => {
                _md.push(toMetadata.convert(element).toJSON());
            });
            json.meta = _md;
        }

        if (this.tags.length > 0) {
            var _t = [];
            this.tags.forEach(element => {
                _t.push(element);
            });
            json.tags = _t;
        }

        return json;
    }



}

module.exports = BulkMessage;
