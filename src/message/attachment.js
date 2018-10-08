'use strict';

const fs = require('fs');
const path = require('path');
const customHeader = require('./customHeader');
const toCustomHeader = require('../helpers/toCustomHeader');

/**
 * Represents a message attachment in the form of a byte array.
 * @example
 * var attachment = require('./attachment');
 * ...
 * 
 * var attachment1 = var attachment = new attachment({
 *     name: 'bus.png',
 *     filePath: 'bus.png',
 *     contentType: "image/png"
 * });
 * 
 * var attachment2 = var attachment = new attachment({
 *     filePath: 'bus.png'
 * });
 * 
 * var fs = require('./fs');
 * var fileBuffer = fs.readFileSync(filePath);
 * var attachment2 = var attachment = new attachment({
 *     content: fileBuffer.toString('base64')
 * });
 * 
 * // Adding Custom Headers
 * var attachment = var attachment = new attachment({
 *     filePath: 'bus.png'
 * });
 * attachment.customHeaders.push(new customHeader("name1", "value1"));
 * attachment.addCustomHeaders("name2", "value2");
 */
class Attachment {
    
    /**
     * Initializes a new instance of the Attachment class.
     * @constructor
     * @param  {string} name - Name of attachment (displayed in email clients).
     * @param  {string} content - BASE64 encoded string containing the contents of an attachment.
     * @param  {string} contentType - The content type or MIME type of the attachment.
     * @param  {CustomHeader[]} customHeaders - A list of custom headers for the attachment.
     * @param  {string} filePath - The local filepath for your attachment, used to stream the file in.
     * @param  {string} contentId - The contentId for your attachment, used if you need to reference the attachment in your email content.
     */
    constructor({
        name = null,
        content = null,
        contentType = null,
        customHeaders = null,
        filePath = null,
        contentId = null
    } = {}){

        if(name){
            this.setName(name);
        }

        if(contentType){
            this.setContentType(contentType);
        }

        if (this.customHeaders === undefined) {
            this.customHeaders = [];
        }

        if(customHeaders) {
            this.setCustomHeaders(customHeaders);
        }

        if (contentId) {
            this.setContentId(contentId);
        }

        if(content){
            this.setContent(content);
        }
        else if(filePath){
            this.setFilePath(filePath);
            this.setContent(this.readAttachmentFromFile(filePath));            
            if (!this.name || (this.name && this.name === '')) {
                this.setName(path.basename(filePath));
            } 
            if (!this.contentType || (this.contentType && this.contentType === '')) {
                this.setContentType(Attachment.GetMimeTypeFromExtension(path.extname(filePath)));
            }
        }
    }
    
    /**
     * Sets the attachment Name.
     * @param  {string} value
     */
    setName(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment name, type of 'string' was expected.");
        }
        /**
         * The attachment Name.
         */
        this.name = value;
    }
    
    /**
     * Sets the attachment content type (MIME).
     * @param  {string} value
     */
    setContentType(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment content type, type of 'string' was expected.");
        }
        /**
         * The attachment content type (MIME).
         */
        this.contentType = value;
    }
    
    /**
     * Sets the attachment content id.
     * @param  {string} value
     */
    setContentId(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment content id, type of 'string' was expected.");
        }
        /**
         * The attachment content id.
         */
        this.contentId = value;
    }
    
    /**
     * Sets the attachment content (base64 string).
     * @param  {string} value
     */
    setContent(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment content, type of 'string' was expected.");
        }
        /**
         * The attachment content (base64 string).
         */
        this.content = value;
    }
    
    /**
     * Sets the attachment Name.
     * @param  {string} value
     */
    setFilePath(value) {
        if (typeof value === 'undefined' || !value) {
          return;
        }
        if (typeof value !== 'string') {
          throw new Error("Invalid attachment filePath, type of 'string' was expected.");
        }
        /**
         * The attachment Name.
         */
        this.filePath = value;
    }

    /**
     * Reading the contents of the attachment into a BASE64 encoded string
     * @param  {string} filePath
     */
    readAttachmentFromFile(filePath){
        const fileBuffer = fs.readFileSync(filePath);        
        return fileBuffer.toString('base64');
    }

    /**
     * Sets the list of custom headers, an array of CustomHeader items
     * @param  {CustomHeader} value
     */
    setCustomHeaders(value) {
        if (this.customHeaders === undefined) {
            /**
             * The list of custom headers, an array of CustomHeader items
             */
            this.customHeaders = [];
        }
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
        if ((typeof name === 'undefined' || !name) || (typeof value === 'undefined' || !value)) {
          return;
        }

        if (typeof name !== 'string') {
          throw new Error("Invalid name, type of 'string' was expected.");
        }

        if (typeof value !== 'string') {
          throw new Error("Invalid value, type of 'string' was expected.");
        }

        this.customHeaders.push(new customHeader(name, value));
    }

    /**
     * String representation of the CustomHeader class.
     * @returns {string}
     */
    toString() {
        return `${this.name}, ${this.contentType}`;
    }
    /**
     * JSON string representation of the CustomHeader class.
     */
    toJSON() {

        var json = {
            name: this.name,
            content: this.content,
            contentType: this.contentType
        };

        if (this.contentId) {
            json.contentId = this.contentId;
        }
        
        if (this.customHeaders.length > 0) {
            var _ch = [];
            this.customHeaders.forEach(element => { 
                _ch.push(toCustomHeader.convert(element).toJSON()); 
            });
            json.customHeaders = _ch;            
        }       
        
        return json;
    }


    /**
     * Converts the file extension to the correct mime type. This is a small subset of more common used formats.
     * @param {string} extension - file extension of the attachment
     * @returns {string} mime-type
     */
    static GetMimeTypeFromExtension(extension)
    {
        switch (extension)
        {
            case ".xml":
                return "application/xml";
            case ".txt":
            case ".ini":
            case ".sln":
            case ".cs":
            case ".js":
            case ".config":
            case ".vb":
                return "text/plain";
            case ".html":
                return "text/html";
            case ".wav":
                return "audio/wav";
            case ".eml":
                return "message/rfc822";
            case ".mp3":
                return "audio/mpeg";
            case ".mp4":
                return "video/mp4";
            case ".bmp":
                return "image/bmp";
            case ".gif":
                return "image/gif";
            case ".jpeg":
            case ".jpg":
                return "image/jpeg";
            case ".png":
                return "image/png";
            case ".zip":
                    return "application/x-zip-compressed";
            case ".doc":
                return "application/msword";
            case ".docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case ".xls":
                return "application/vnd.ms-excel";
            case ".xlsx":
                return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            case ".ppt":
                return "application/vnd.ms-powerpoint";
            case ".pptx":
                return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
            case ".csv":
                return "text/csv";
            case ".pdf":
                return "application/pdf";
            case ".mov":
                return "video/quicktime";

            default:
                return "application/octet-stream";
        }
    }

}

module.exports = Attachment;