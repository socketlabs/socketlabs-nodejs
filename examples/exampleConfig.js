'use strict';

const { endpointUrl } = require("../src/core/retryHandler");

module.exports = {
    ServerId: parseInt(process.env.SOCKETLABS_SERVER_ID),
    ApiKey: process.env.SOCKETLABS_INJECTION_API_KEY
};

