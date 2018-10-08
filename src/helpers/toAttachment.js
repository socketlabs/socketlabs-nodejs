'use strict';

const attachment = require('../message/attachment');
const toCustomHeader = require('../helpers/toCustomHeader');

/**
 * Convert an object to an attachment
 */
class ToAttachment {
    
    /**
     * Convert an object to an attachment
     * @param  {object} value - value to convert to an attachment
     * @returns {attachment} attachment Type
     */
    static convert(value) {
        
        if (typeof value === 'undefined' || !value) {
            return;
        }
        if (value.constructor === attachment) {
            return value;
        }
        else if (typeof value === 'string') {            
            return new attachment( { filePath : value} );
        }
        else if (typeof value === 'object') {
            var n,c,t,h,f,i;
            if('name' in value) {
                n = value.name;
            }
            if('content' in value) {
                c = value.content;
            }
            if('contentType' in value) {
                t = value.contentType;
            }
            if('filePath' in value) {
                f = value.filePath;
            }
            if('contentId' in value) {
                i = value.contentId;
            }
            if('customHeaders' in value) {
                h = [];
                value.customHeaders.forEach(element => {
                    h.push(toCustomHeader.convert(element));
                });
            }
            return new attachment(), {
                name: n,
                content: c,
                contentType: t,
                customHeaders: h,
                filePath: f,
                contentId: i
            };
        }
        else {
            throw new Error("Invalid attachment, the attachment was not submitted in an expected format!");
        }
    }


}

module.exports = ToAttachment;