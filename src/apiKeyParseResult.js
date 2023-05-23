/**
 * Enumerated result of the client send
 */
module.exports = Object.freeze(
    {
        /**
         * No result could be produced.
         */
        Invalid: {
            name: "None",
            value: 0
        },
        /**
         * The key length was found to be invalid.
         */
        InvalidKeyLength: {
            name: "InvalidKeyLength",
            value: 1
        },
        /**
         * The key format was found to be invalid.
         */
        InvalidKeyFormat: {
            name: "InvalidKeyFormat",
            value: 2
        },
        /**
         * The key was found to be blank or invalid.
         */
        InvalidEmptyOrWhitespace: {
            name: "InvalidEmptyOrWhitespace",
            value: 3
        },
        /**
         * The public portion of the key was unable to be parsed.
         */
        InvalidUnableToExtractPublicPart: {
            name: "InvalidUnableToExtractPublicPart",
            value: 4
        },
        /**
         * The secret portion of the key was unable to be parsed.
         */
        InvalidUnableToExtractSecretPart: {
            name: "InvalidUnableToExtractSecretPart",
            value: 5
        },
        /**
         * The public portion of the key is the incorrect length.
         */
        InvalidPublicPartLength: {
            name: "InvalidPublicPartLength",
            value: 6
        },
        /**
         * The secret portion of the key is the incorrect length.
         */
        InvalidSecretPartLength: {
            name: "InvalidSecretPartLength",
            value: 7
        },
        /**
         * Key was successfully parsed.
         */
        Success: {
            name: "Success",
            value: 8
        }
    });