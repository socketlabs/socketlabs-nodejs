'use strict';

const apiKeyParseResult = require('../apiKeyParseResult');
/**
 * Used by the SocketLabsClient to parse the provided API Key and determine the authorization method.
 */
class ApiKeyParser {

    constructor(){
        
    }

    parseApiKey(wholeApiKey) {

        if (!wholeApiKey || wholeApiKey === "")
        {
            return apiKeyParseResult.InvalidEmptyOrWhitespace;
        }

        if (wholeApiKey.length != 61)
        {
            return apiKeyParseResult.InvalidKeyLength;
        }

        let seperator = wholeApiKey.indexOf(".");

        if (seperator == -1)
        {
            return apiKeyParseResult.InvalidKeyFormat;
        }

        let publicPart = wholeApiKey.substring(0, seperator);

        if (publicPart.length != 20)
        {
            return apiKeyParseResult.InvalidPublicPartLength;
        }

        let privatePart = wholeApiKey.substring(seperator +1);

        if (privatePart.length != 40)
        {
            return apiKeyParseResult.InvalidSecretPartLength;
        }

        return apiKeyParseResult.Success;

    }

}

module.exports = ApiKeyParser;