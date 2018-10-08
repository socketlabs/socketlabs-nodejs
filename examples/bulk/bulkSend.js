const {SocketLabsClient, EmailAddress, BulkRecipient, BulkMessage} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BulkMessage();

message.subject = "Sending A Test Message (Bulk Send)";
message.htmlBody = "<html><body><h1>Sending A Test Message</h1><p>This is the Html Body of my message.</p></body></html>";
message.textBody = "This is the Plain Text Body of my message.";

message.from = new EmailAddress("from@example.com");
message.replyTo = new EmailAddress("replyto@example.com");

//Add recipients by passing a string, instantiating BulkRecipient, or passing an object literal
message.to.push("recipient1@example.com");
message.to.push(new BulkRecipient("recipient2@example.com"));
message.to.push(new BulkRecipient("recipient3@example.com", { friendlyName: "Recipient #3" }));
message.to.push({ emailAddress: "recipient4@example.com" });
message.to.push({ emailAddress: "recipient5@example.com", friendlyName: "Recipient #5" });

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