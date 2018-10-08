const { ToBulkRecipient, ToEmailAddress, ToCustomHeader, ToMergeData } = require('../helpers/helpersClasses');
const { BasicMessage, BulkMessage } = require('../message/messageClasses');
const sendValidator = require('./sendValidator');
const sendResultEnum = require('../sendResultEnum');
const sendResponse = require('../sendResponse');

class InjectionRequestFactory {
    //constructor(){}
    generateRequest(messageData) {
        return new Promise((resolve, reject) => {
                var {
                    to,
                    from,
                    replyTo,
                    subject,
                    textBody,
                    htmlBody,
                    apiTemplate,
                    cc,
                    bcc,
                    attachments,
                    messageId,
                    mailingId,
                    charSet,
                    customHeaders,
                    globalMergeData,
                    messageType
                } = messageData;

                var result = {};
                var validator = new sendValidator();

                if (messageType === "basic") {

                    var basicMsg = new BasicMessage();

                    if (to) {
                        if (Array.isArray(to)) basicMsg.to = to;
                        else basicMsg.to.push(ToEmailAddress.convert(to));
                    }
                    basicMsg.from = from;
                    basicMsg.replyTo = replyTo;
                    basicMsg.subject = subject;
                    basicMsg.textBody = textBody;
                    basicMsg.htmlBody = htmlBody;
                    if (attachments) {
                        if (Array.isArray(attachments)) basicMsg.attachments = attachments;
                        else basicMsg.attachments.push(attachments);
                    }
                    if (cc) {
                        if (Array.isArray(cc)) basicMsg.cc = cc;
                        else basicMsg.cc.push(ToEmailAddress.convert(cc));
                    }
                    if (bcc) {
                        if (Array.isArray(bcc)) basicMsg.bcc = bcc;
                        else basicMsg.bcc.push(ToEmailAddress.convert(bcc));
                    }
                    basicMsg.apiTemplate = apiTemplate;
                    basicMsg.messageId = messageId;
                    basicMsg.mailingId = mailingId;
                    basicMsg.charSet = charSet;
                    if (customHeaders) {
                        if (Array.isArray(customHeaders)) basicMsg.customHeaders = customHeaders;
                        else basicMsg.customHeaders.push(ToEmailAddress.convert(customHeaders));
                    }

                    result = validator.validateBasicMessage(basicMsg);
                    if (result.result !== sendResultEnum.Success) {
                        reject(result);
                    }

                    resolve(basicMsg.toJSON());
                } else if (messageType === "bulk") {
                    var bulkMsg = new BulkMessage();

                    if (to) {
                        if (Array.isArray(to)) bulkMsg.to = to;
                        else bulkMsg.to.push(ToBulkRecipient.convert(to));
                    }
                    bulkMsg.from = from;
                    bulkMsg.replyTo = replyTo;
                    bulkMsg.subject = subject;
                    bulkMsg.textBody = textBody;
                    bulkMsg.htmlBody = htmlBody;
                    if (attachments) {
                        if (Array.isArray(attachments)) bulkMsg.attachments = attachments;
                        else bulkMsg.attachments.push(attachments);
                    }
                    bulkMsg.apiTemplate = apiTemplate;
                    bulkMsg.messageId = messageId;
                    bulkMsg.mailingId = mailingId;
                    bulkMsg.charSet = charSet;
                    if (customHeaders) {
                        if (Array.isArray(customHeaders)) bulkMsg.customHeaders = customHeaders;
                        else bulkMsg.customHeaders.push(ToCustomHeader.convert(customHeaders));
                    }
                    if (globalMergeData) {
                        if (Array.isArray(globalMergeData)) bulkMsg.globalMergeData = globalMergeData;
                        else bulkMsg.globalMergeData.push(ToMergeData.convert(globalMergeData));
                    }

                    result = validator.validateBulkMessage(bulkMsg);
                    if (result.result !== sendResultEnum.Success) {
                        reject(result);
                    }

                    resolve(bulkMsg.toJSON());
                } else {
                    result = new sendResponse({
                        result: sendResultEnum.MessageValidationInvalidMessageType
                    });
                    reject(result);
                }
            }
        )}
    }

    module.exports = new InjectionRequestFactory();