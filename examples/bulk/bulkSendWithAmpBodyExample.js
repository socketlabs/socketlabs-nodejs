const { SocketLabsClient, EmailAddress, BulkRecipient, BulkMessage } = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BulkMessage();

message.subject = "Sending A Test Message (Bulk Send with Amp)";
message.htmlBody = "<html><body><h1>Sending A Test Message</h1><p>This is the Html Body of my message.</p></body></html>";
message.ampBody = "<!doctype html>" +
    "<html amp4email>" +
    "<head>" +
    "  <meta charset=\"utf-8\">" +
    "  <script async src=\"https://cdn.ampproject.org/v0.js\"></script>" +
    "  <style amp4email-boilerplate>body{visibility:hidden}</style>" +
    "  <style amp-custom>" +
    "    h1 {" +
    "      margin: 1rem;" +
    "    }" +
    "  </style>" +
    "</head>" +
    "<body>" +
    "  <h1>This is the AMP Html Body of my message</h1>" +
    "</body>" +
    "</html>";

message.from = new EmailAddress("from@example.com");
message.replyTo = new EmailAddress("replyto@example.com");

//Add recipients by passing a string, instantiating BulkRecipient, or passing an object literal
message.to.push("recipient1@example.com");
message.to.push(new BulkRecipient("recipient2@example.com"));

/**
 * Create the client
 */
var client = new SocketLabsClient(exampleConfig.ServerId, exampleConfig.ApiKey);

/**
 * Send the message
 */
client.send(message).then(
    (res) => {
        console.log("Promise resolved: ")
        console.log(res)
    },
    (err) => {
        console.log("Promise rejected: ")
        console.log(err)
    }
);