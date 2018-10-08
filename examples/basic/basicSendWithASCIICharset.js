const {SocketLabsClient, EmailAddress, BasicMessage} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending A ASCII CharSet Email";
message.htmlBody = "<html><body><h1>Sending A ASCII CharSet Email</h1><p>This is the Html Body of my message.</p><h2>UTF-8 Characters:</h2><p>✔ - Check</p></body></html>";

message.charSet = "ASCII";

message.from = new EmailAddress("from@example.com");
message.to.push("recipient@example.com");

/**
 * Create the client
 */
var client = new SocketLabsClient(exampleConfig.ServerId, exampleConfig.ApiKey);

/**
 * Send the message
 */
client.send(message).then(
    (res)=>{
        console.log("Promise resolved: ")
        console.log(res)
    },
    (err) => {
        console.log("Promise rejected: ")
        console.log(err)
    }
);