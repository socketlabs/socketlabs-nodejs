const { SocketLabsClient, EmailAddress, BasicMessage, Attachment, CustomHeader } = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');
const resolve = require('path').resolve;

/**
 * Build the message
 */
var message = new BasicMessage();

message.messageId = "ComplexExample";
message.mailingId = "BasicSend";

message.charSet = "UTF16";
message.subject = "Sending A Complex Test Message (Basic Send)";

message.htmlBody = "<html><body><h1>Sending A Complex Test Message</h1><p>This is the Html Body of my message.</p><h2>UTF16 Characters:</h2><p>例 (example)</p><h2>Embedded Image:</h2><p><img src=\"cid:bus\" /></p></body></html>";
message.textBody = "This is the Plain Text Body of my message.";
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

/**
 * Adding To Recipients
 */
// Add Email Addresses using an Array
var toRecipients = [];
toRecipients.push("recipient1@example.com");
toRecipients.push(new EmailAddress("recipient2@example.com"));
message.to = toRecipients;

// Add Email Addresses directly to the Array
message.to.push({ emailAddress: "recipient3@example.com", friendlyName: "Recipient #3" });

// Add Email Addresses using the addToEmailAddress function
message.addToEmailAddress("recipient4@example.com");
message.addToEmailAddress("recipient5@example.com", "Recipient #5");

/**
 * Adding CC Recipients
 */
// Add Email Addresses using an Array
var ccRecipients = [];
ccRecipients.push("cc_recipients1@example.com");
ccRecipients.push(new EmailAddress("cc_recipients2@example.com"));
message.cc = ccRecipients;

// Add Email Addresses directly to the Array
message.cc.push({ emailAddress: "cc_recipients3@example.com", friendlyName: "Recipient #3" });

// Add Email Addresses using the addCcEmailAddress function
message.addCcEmailAddress("cc_recipients4@example.com");
message.addCcEmailAddress("cc_recipients5@example.com", "Recipient #5");

/**
 * Adding Bcc Recipients
 */
// Add Email Addresses using an Array
var bccRecipients = [];
bccRecipients.push("bcc_recipients1@example.com");
bccRecipients.push(new EmailAddress("bcc_recipients2@example.com"));
message.bcc = bccRecipients;

// Add Email Addresses directly to the Array
bccRecipients.push({ emailAddress: "bcc_recipients3@example.com", friendlyName: "Recipient #3" });

// Add Email Addresses using the addBccEmailAddress function
message.addBccEmailAddress("bcc_recipients4@example.com");
message.addBccEmailAddress("bcc_recipients5@example.com", "Recipient #5");

/**
 * Adding Attachments
 */
// Add Attachment directly to the Array
var attachment1 = new Attachment({
    name: "bus.png",
    filePath: resolve("../img/bus.png"),
    contentType: "image/png"
});
message.attachments.push(attachment1);

// Add Attachment using the addAttachments function
var attachment2 = new Attachment({
    name: "bus2",
    filePath: resolve("../img/bus.png"),
    contentType: "image/png",
    contentId: "bus"
});
message.addAttachments(attachment2)

// Add Attachment a filePath {string} to the array
message.attachments.push(resolve("./html/sampleemail.html"));

/**
 * Adding Custom Headers
 */
// Add Custom Headers using an Array
var headers = [];
headers.push(new CustomHeader("example-type", "basic-send-complex"));
headers.push({ name: "message-contains", value: "attachments, headers" });
message.customHeaders = headers;

// Add Custom Headers directly to the Array
message.customHeaders.push(new CustomHeader("message-has-attachments", "true"));

// Add Custom Headers using the addCustomHeaders function
message.addCustomHeaders("testMessageHeader", "I am a message header");

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