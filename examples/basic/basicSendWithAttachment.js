const {SocketLabsClient, EmailAddress, BasicMessage, Attachment} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');
const resolve = require('path').resolve;

/**
 * Build the message
 */
var message = new BasicMessage();

message.subject = "Sending An Email With An Attachment";
message.htmlBody = "<html><body><h1>Sending An Email With An Attachment</h1><p>This is the Html Body of my message.</p></body></html>";
message.textBody = "This is the Plain Text Body of my message.";

message.from = new EmailAddress("from@example.com");
message.to.push("recipient@example.com");

var attachment = new Attachment({
    name: 'bus.png',
    filePath: resolve("./examples/img/bus.png"),
    contentType: "image/png"
});
attachment.addCustomHeaders("myHeader", "myValue")
message.attachments.push(attachment)

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