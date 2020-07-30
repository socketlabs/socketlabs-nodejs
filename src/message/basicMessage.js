'use strict';

const emailAddress = require('./emailAddress');
const attachment = require('./attachment');
const customHeader = require('./customHeader');

const toEmailAddress = require('../helpers/toEmailAddress');
const toCustomHeader = require('../helpers/toCustomHeader');
const toAttachment = require('../helpers/toAttachment');

/**
 * A basic email message similar to one created in a personal email client such as Outlook.
 * This message can have many recipients of different types, such as To, CC, and BCC.  This
 * message does not support merge fields.
 * 
 * @example
 * Example:
 * var basicMessage = require('./basicMessage');
 * var emailAddress = require('./emailAddress');
 * ...
 * 
 * var message = new basicMessage();
 * 
 * message.subject = "Sending A Message";
 * message.htmlBody = "<html>This is the Html Body of my message.</html>";
 * message.textBody = "This is the Plain Text Body of my message.";
 * 
 * message.from = new emailAddress("from@example.com");
 * message.replyTo = new emailAddress("replyto@example.com");
 * 
 * message.to.push(new emailAddress("recipient1@example.com"));
 * message.to.push(new emailAddress("recipient2@example.com", { friendlyName: "Recipient #2" }));
  * 
 * message.addToEmailAddress("recipient3@example.com");
 * message.addToEmailAddress("recipient4@example.com", "Recipient #4");
 * 
 */
class BasicMessage{

    /**
     * Initializes a new instance of the BasicMessage class
     */
    constructor() {        
        /**
         * The list of To recipients.
         */
        this.to = [];

        /**
         * The list of CC recipients.
         */
        this.cc = [];

        /**
         * The list of BCC recipients.
         */
        this.bcc = [];

        /**
         * The list of custom headers.
         */
        this.customHeaders = [];

        /**
         * The list of attachments.
         */
        this.attachments = [];
                
        /**
         * The type of message.
         */
        this.messageType = "basic";
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
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate"
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
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate"
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
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate"
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
     * (Optional) Either TextBody or HtmlBody must be used with the AmpBody or use a ApiTemplate"
     * @param  {int} value
     */
    setAmpBody(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
            throw new Error("Invalid Amp Body, type of 'string' was expected.");
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
     * Sets the list of To recipients, an array of EmailAddress items
     * @param  {Array} value
     */
    setTo(value) {      
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if(value && Array.isArray(value)) {
            value.forEach(element => {
                this.to.push(toEmailAddress.convert(element));
            });            
        }
        else {
            this.to.push(toEmailAddress.convert(value));
        }
    } 
    /**
     * Add a new emailAddress to the array of To recipients
     * @param  {string} value
     * @param  {string} name
     */
    addToEmailAddress(value, name) {
        this.to.push(new emailAddress(value, { friendlyName: name }));
    }

    /**
     * Sets the list of CC recipients, an array of EmailAddress items
     * @param  {Array} value
     */
    setCc(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if(value && Array.isArray(value)) {
            value.forEach(element => {
                this.cc.push(toEmailAddress.convert(element));
            });            
        }
        else {
            this.cc.push(toEmailAddress.convert(value));
        }
    } 
    /**
     * Add an EmailAddress to the array of CC recipients
     * @param  {string} value
     * @param  {string} name
     */
    addCcEmailAddress(value, name) {
        this.cc.push(new emailAddress(value, { friendlyName: name }));
    }

    /**
     * Sets the list of BCC recipients, an array of EmailAddress items
     * @param  {Array} value
     */
    setBcc(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if(value && Array.isArray(value)) {
            value.forEach(element => {
                this.bcc.push(toEmailAddress.convert(element));
            });            
        }
        else {
            this.bcc.push(toEmailAddress.convert(value));
        }
    } 
    /**
     * Add an EmailAddress to the array of BCC recipients
     * @param  {string} value
     * @param  {string} name
     */
    addBccEmailAddress(value, name) {
        this.bcc.push(new emailAddress(value, { friendlyName: name }));
    }

    /**
     * Sets the list of attachments, an array of Attachment items
     * @param  {EmailAddress} value
     */
    setAttachments(value) {
        this.addAttachments(value);
    } 
    /**
     * Add an EmailAddress to the array of Attachment items
     * @param  {Attachment} value
     */
    addAttachments(value) {
        if(value && Array.isArray(value)) {
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
        if(value && Array.isArray(value)) {
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
     * String representation of the CustomHeader class.
     * @returns {string}
     */
    toString() {
        return `Recipients: ${this.to.length},  Subject: '${this.subject}'`;
    }

    /**
     * JSON string representation of the CustomHeader class.
     * @returns {object}
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
            json.charSet = this.charSet;
        }

        if (this.to.length > 0) {
            var _to = [];
            this.to.forEach(element => { 
                _to.push(toEmailAddress.convert(element).toJSON()); 
            });
            json.to = _to;
        }

        if (this.cc.length > 0) {
            var _cc = [];
            this.cc.forEach(element => { 
                _cc.push(toEmailAddress.convert(element).toJSON()); 
            });
            json.cc = _cc; 
        }

        if (this.bcc.length > 0) {
            var _bcc = [];
            this.bcc.forEach(element => { 
                _bcc.push(toEmailAddress.convert(element).toJSON()); 
            });
            json.bcc = _bcc;
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
        
        return json;
    }
}

module.exports = BasicMessage;
