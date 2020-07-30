const {SocketLabsClient, EmailAddress, BasicMessage} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending A Test Message (Basic Send)";
message.htmlBody = "<html><body><h1>Sending A Test Message</h1><p>This is the Html Body of my message.</p></body></html>";
message.textBody = "This is the Plain Text Body of my message.";

message.from = new EmailAddress("from@example.com");
message.replyTo = new EmailAddress("replyto@example.com");

//Many different ways to add recipients
message.to.push("recipient1@example.com");
message.to.push(new EmailAddress("recipient2@example.com"));
message.to.push(new EmailAddress("recipient3@example.com", { friendlyName: "Recipient #3" }));
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
