const {SocketLabsClient, EmailAddress, BasicMessage} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');
const resolve = require('path').resolve;
const fs = require('fs');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending An Email With Body From Html File";
var body = fs.readFileSync(resolve("./examples/html/sampleemail.html"));
message.htmlBody = body.toString();

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
