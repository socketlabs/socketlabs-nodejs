const {SocketLabsClient, EmailAddress, BasicMessage, CustomHeader} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending An Email With Custom Headers";
message.htmlBody = "<html><body><h1>Sending An Email With Custom Headers</h1><p>This is the Html Body of my message.</p></body></html>";
message.textBody = "This is the Plain Text Body of my message.";

message.from = new EmailAddress("from@example.com");
message.to.push("recipient1@example.com");

//Use the CustomHeader class or an object literal
message.customHeaders.push(new CustomHeader("My-Header", "1...2...3..."));
message.customHeaders.push({ name: "Example-Type", value: "BasicSendWithCustomHeaders" });

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