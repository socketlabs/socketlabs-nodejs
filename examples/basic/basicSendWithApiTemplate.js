const {SocketLabsClient, EmailAddress, BasicMessage} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending An Email Using a Template";
message.apiTemplate = 1;

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