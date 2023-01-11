
/**
 * Enumerated result of the client send
 */
module.exports = Object.freeze(
    {
        /**
         * An error has occured that was unforeseen
         */
        UnknownError: {
            name: "UnknownError",
            value: 0,
            message: "An error has occured that was unforeseen"
        },
        /**
         * A timeout occurred sending the message
         */
        Timeout: {
            name: "Timeout",
            value: 1,
            message: "A timeout occurred sending the message"
        },
        /**
         * Successful send of message
         */
        Success: {
            name: "Success",
            value: 2,
            message: "Successful send of message"
        },
        /**
         * Warnings were found while sending the message
         */
        Warning: {
            name: "Warning",
            value: 3,
            message: "Warnings were found while sending the message"
        },
        /**
         * Internal server error
         */
        InternalError: {
            name: "InternalError",
            value: 4,
            message: "Internal server error"
        },


        /**
         * Message has exceeded the size limit
         */
        MessageTooLarge: {
            name: "MessageTooLarge",
            value: 5,
            message: "Message has exceeded the size limit"
        },
        /**
         * Message exceeded the maximum allowed recipient count
         */
        TooManyRecipients: {
            name: "TooManyRecipients",
            value: 6,
            message: "Message exceeded the maximum allowed recipient count"
        },
        /**
         * The message request contained invalid data
         */
        InvalidData: {
            name: "InvalidData",
            value: 7,
            message: "The message request contained invalid data"
        },
        /**
         * The account is over the send quota, rate limit exceeded
         */
        OverQuota: {
            name: "OverQuota",
            value: 8,
            message: "The account is over the send quota, rate limit exceeded"
        },
        /**
         * Too many errors occurred sending the message
         */
        TooManyErrors: {
            name: "TooManyErrors",
            value: 9,
            message: "Too many errors occurred sending the message"
        },
        /**
         * The serverId and apiKey combination is not valid
         */
        InvalidAuthentication: {
            name: "InvalidAuthentication",
            value: 10,
            message: "The serverId and apiKey combination is not valid"
        },
        /**
         * The account has been disabled
         */
        AccountDisabled: {
            name: "AccountDisabled",
            value: 11,
            message: "The account has been disabled"
        },
        /**
         * Too many messages were found on the request
         */
        TooManyMessages: {
            name: "TooManyMessages",
            value: 12,
            message: "Too many messages were found on the request"
        },
        /**
         * No valid recipients were found on the message
         */
        NoValidRecipients: {
            name: "NoValidRecipients",
            value: 13,
            message: "No valid recipients were found on the message"
        },
        /**
         * An invalid recipient address was found on the message
         */
        InvalidAddress: {
            name: "InvalidAddress",
            value: 14,
            message: "An invalid recipient address was found on the message"
        },
        /**
         * An invalid attachment was found on the message
         */
        InvalidAttachment: {
            name: "InvalidAttachment",
            value: 15,
            message: "An invalid attachment was found on the message"
        },
        /**
         * No messages were found on the request
         */
        NoMessages: {
            name: "NoMessages",
            value: 16,
            message: "No messages were found on the request"
        },
        /**
         * No message content was found on the request
         */
        EmptyMessage: {
            name: "EmptyMessage",
            value: 17,
            message: "No message content was found on the request"
        },
        /**
         * No subject was found on the message
         */
        EmptySubject: {
            name: "EmptySubject",
            value: 18,
            message: "No subject was found on the message"
        },
        /**
         * An invalid From address was found on the message
         */
        InvalidFrom: {
            name: "InvalidFrom",
            value: 19,
            message: "An invalid From address was found on the message"
        },
        /**
         * No To addresses were found on the message
         */
        EmptyToAddress: {
            name: "EmptyToAddress",
            value: 20,
            message: "No To addresses were found on the message"
        },
        /**
         * No valid message body was found on the message
         */
        NoValidBodyParts: {
            name: "NoValidBodyParts",
            value: 21,
            message: "No valid message body was found on the message"
        },
        /**
         * An invalid templateId was found on the message
         */
        InvalidTemplateId: {
            name: "InvalidTemplateId",
            value: 22,
            message: "An invalid templateId was found on the message"
        },
        /**
         * The specified templateId has no content associated with it
         */
        TemplateHasNoContent: {
            name: "TemplateHasNoContent",
            value: 23,
            message: "The specified templateId has no content associated with it"
        },
        /**
         * A conflict occurred due to the use of templateId and HtmlBody or TextBody
         */
        MessageBodyConflict: {
            name: "MessageBodyConflict",
            value: 24,
            message: "A conflict occurred due to the use of templateId and HtmlBody or TextBody"
        },
        /**
         * Invalid merge data was found on the message
         */
        InvalidMergeData: {
            name: "InvalidMergeData",
            value: 25,
            message: "Invalid merge data was found on the message"
        },
        /**
         * SDK Validation Error: Authentication validation failed, missing or invalid ServerId or ApiKey
         */
        AuthenticationValidationFailed: {
            name: "AuthenticationValidationFailed",
            value: 26,
            message: "SDK Validation Error: Authentication validation failed, missing or invalid ServerId or ApiKey"
        },
        /**
         * SDK Validation Error: Message exceeded maximim recipient count
         */
        RecipientValidationMaxExceeded: {
            name: "RecipientValidationMaxExceeded",
            value: 27,
            message: "SDK Validation Error: Message exceeded maximim recipient count"
        },
        /**
         * SDK Validation Error: No recipients were found in the message
         */
        RecipientValidationNoneInMessage: {
            name: "RecipientValidationNoneInMessage",
            value: 28,
            message: "SDK Validation Error: No recipients were found in the message"
        },
        /**
         * SDK Validation Error: Message is missing From address
         */
        EmailAddressValidationMissingFrom: {
            name: "EmailAddressValidationMissingFrom",
            value: 29,
            message: "SDK Validation Error: Message is missing From address"
        },
        /**
         * SDK Validation Error: Message is missing To address(es)
         */
        RecipientValidationMissingTo: {
            name: "RecipientValidationMissingTo",
            value: 30,
            message: "SDK Validation Error: Message is missing To address(es)"
        },
        /**
         * SDK Validation Error: Message contains an invalid From address
         */
        EmailAddressValidationInvalidFrom: {
            name: "EmailAddressValidationInvalidFrom",
            value: 31,
            message: "SDK Validation Error: Message contains an invalid From address"
        },
        /**
         * SDK Validation Error: Message does not contain a subject
         */
        MessageValidationEmptySubject: {
            name: "MessageValidationEmptySubject",
            value: 32,
            message: "SDK Validation Error: Message does not contain a subject"
        },
        /**
         * SDK Validation Error: Message does not contain a message body
         */
        MessageValidationEmptyMessage: {
            name: "MessageValidationEmptyMessage",
            value: 33,
            message: "SDK Validation Error: Message does not contain a message body"
        },
        /**
         * SDK Validation Error: Message contains invalid custom headers
         */
        MessageValidationInvalidCustomHeaders: {
            name: "MessageValidationInvalidCustomHeaders",
            value: 34,
            message: "SDK Validation Error: Message contains invalid custom headers"
        },
        /**
         * SDK Validation Error: Message contains invalid ReplyTo address
         */
        RecipientValidationInvalidReplyTo: {
            name: "RecipientValidationInvalidReplyTo",
            value: 35,
            message: "SDK Validation Error: Message contains invalid ReplyTo address"
        },
        /**
         * SDK Validation Error: Message contains invalid recipients
         */
        RecipientValidationInvalidRecipients: {
            name: "RecipientValidationInvalidRecipients",
            value: 36,
            message: "SDK Validation Error: Message contains invalid recipients"
        },
        /**
         * SDK Validation Error: Expected messageType of basic or bulk
         */
        MessageValidationInvalidMessageType: {
            name: "MessageValidationInvalidMessageType",
            value: 37,
            message: "SDK Validation Error: Expected messageType of basic or bulk"
        },
        /**
         * SDK Validation Error: Message contains invalid metadata
         */
        MessageValidationInvalidMetadata: {
            name: "MessageValidationInvalidMetadata",
            value: 38,
            message: "SDK Validation Error: Message contains invalid metadata"
        },

        /**
  *Bad Gateway
  */

        BadGateway:
        {
            name: "Bad Gatway",
            value: 38,
            message: "SDK Validation Error: Bad Gateway Error"

        },

        /**
*ServiceUnavailable
*/

        ServiceUnavailable:
        {
            name: "Service Unavailable",
            value: 39,
            message: "SDK Validation Error: Service Unavailable"

        },


        /**
*GateWayTimeout
*/

        GateWayTimeout:
        {
            name: "GateWay Timeout",
            value: 40,
            message: "SDK Validation Error: GateWay Timeout"

        },


    });