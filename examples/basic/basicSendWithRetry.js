const { SocketLabsClient, EmailAddress, BasicMessage } = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending An Email Through A Proxy";
message.htmlBody = "<html><body><h1>Sending An Email Through A Proxy</h1><p>This is the Html Body of my message.</p></body></html>";
message.textBody = "This is the Plain Text Body of my message.";

message.from = new EmailAddress("from@example.com");

message.to.push("recipient@example.com");

/**
 * Create the client
 */
var client = new SocketLabsClient(exampleConfig.ServerId, exampleConfig.ApiKey,
    {
        optionalProxy: "http://localhost:4433"
    });

client.numberOfRetries = 3;

/**
 * Send the message
 */
client.requestTimeout = 20;
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