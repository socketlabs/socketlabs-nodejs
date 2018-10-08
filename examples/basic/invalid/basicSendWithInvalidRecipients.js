const {SocketLabsClient, EmailAddress, BasicMessage} = require('../../../src/socketlabsClient');
const exampleConfig = require('../../exampleConfig');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending A Test Message";
message.htmlBody = "<html>This is the Html Body of my message.</html>";
message.textBody = "This is the Plain Text Body of my message.";

message.from = new EmailAddress("from@example.com");

message.to.push("!@#$!@#$!@#$@#!$");
message.to.push("failure.com");
message.to.push("ImMissingSomething");
message.to.push("Fail@@!.Me");

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