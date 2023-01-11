const { SocketLabsClient, EmailAddress, BulkMessage, BulkRecipient, Attachment, CustomHeader, MergeData, Metadata } = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');
const resolve = require('path').resolve;

/**
 * Build the message
 */
var message = new BulkMessage();

message.messageId = "ComplexExample";
message.mailingId = "BulkSend";

message.charSet = "UTF-8";
message.subject = "Sending A Complex Test Message (Bulk Send)";

// Build the Content (Note the %% symbols used to denote the data to be merged)
var html = "<html>"
    + "   <head><title>Sending A Complex Test Message</title></head>"
    + "   <body>"
    + "       <h1>Sending A Complex Test Message</h1>"
    + "       <h2>Merge Data</h2>"
    + "       <p>"
    + "           Motto = <b>%%Motto%%</b> </br>"
    + "           Birthday = <b>%%Birthday%%</b> </br>"
    + "           Age = <b>%%Age%%</b> </br>"
    + "           UpSell = <b>%%UpSell%%</b>"
    + "       </p>"
    + "       <h2>Example of Merge Usage</h2>"
    + "       <p>"
    + "           Our company motto is '<b>%%Motto%%</b>'. </br>"
    + "           Your birthday is <b>%%Birthday%%</b> and you are <b>%%Age%%</b> years old."
    + "       </p>"
    + "       <h2>UTF-8 Characters:</h2>"
    + "       <p>✔ - Check</p>"
    + "   </body>"
    + "</html>";
message.htmlBody = html

var text = "Sending A Complex Test Message"
    + "       Merged Data"
    + "           Motto = %%Motto%%"
    + "           Birthday = %%Birthday%%"
    + "           Age = %%Age%%"
    + "           UpSell = %%UpSell%%"
    + "       "
    + "       Example of Merge Usage"
    + "           Our company motto is '%%Motto%%'."
    + "           Your birthday is %%Birthday%% and you are %%Age%% years old.";
message.textBody = text;

var amp = "<!doctype html>"
    + "<html amp4email>"
    + "<head>"
    + "  <meta charset=\"utf-8\">"
    + "  <script async src=\"https://cdn.ampproject.org/v0.js\"></script>"
    + "  <style amp4email-boilerplate>body{visibility:hidden}</style>"
    + "  <style amp-custom>"
    + "    h1 {"
    + "      margin: 1rem;"
    + "    }"
    + "  </style>"
    + "</head>"
    + "<body>"
    + "  <h1>This is the AMP Html Body of my message</h1>"
    + "  <h2>Merge Data</h2>"
    + "  <p>"
    + "      Motto = <b>%%Motto%%</b> </br>"
    + "      Birthday = <b>%%Birthday%%</b> </br>"
    + "      Age = <b>%%Age%%</b> </br>"
    + "      UpSell = <b>%%UpSell%%</b>"
    + "  </p>"
    + "  <h2>Example of Merge Usage</h2>"
    + "  <p>"
    + "      Our company motto is '<b>%%Motto%%</b>'. </br>"
    + "      Your birthday is <b>%%Birthday%%</b> and you are <b>%%Age%%</b> years old."
    + "  </p>"
    + "  <h2>UTF-8 Characters:</h2>"
    + "  <p>✔ - Check</p>"
    + "</body>"
    + "</html>";
message.ampBody = amp;

message.from = new EmailAddress("from@example.com");
message.replyTo = new EmailAddress("replyto@example.com");

/**
 * Adding To global merge data
 * (These will be applied to all Recipients unless specifically overridden by Recipient level merge data)
 */
// Add global merge data using an Array
var globalMergeData = [];
globalMergeData.push(new MergeData("Birthday", "Unknown"));
globalMergeData.push({ key: "Age", value: "an unknown number of" });
message.globalMergeData = globalMergeData;

// Add global merge data directly to the Array
message.globalMergeData.push(new MergeData("Motto", "When hitting the Inbox matters!"));

// Add global merge data  using the addGlobalMergeData function
message.addGlobalMergeData("UpSell", "BTW:  You are eligible for discount pricing when you upgrade your service!")

/**
 * Adding To Recipients
 * Including merge data on the recipient with the same name as the global merge data will override global merge data
 */
// Add recipients with merge data using an Array
var rec1MergeData = [];
rec1MergeData.push(new MergeData("Birthday", "08/05/1991"));
rec1MergeData.push(new MergeData("Age", "27"));
var rec1 = new BulkRecipient("recipient1@example.com", { mergeData: rec1MergeData });
message.to.push(rec1);

// Add recipients with merge data directly to the Array
var rec2MergeData = [];
rec2MergeData.push(new MergeData("Birthday", "04/12/1984"));
rec2MergeData.push(new MergeData("UpSell", ""));
rec2MergeData.push({ key: "Age", value: "34" });
message.addToRecipient("recipient2@example.com", "Recipient #2", rec2MergeData);

// Add recipients with merge data directly to the Array
message.to.push({
    emailAddress: "recipient3@example.com",
    friendlyName: "Recipient #3",
    mergeData: [
        { key: "Birthday", value: "10/30/1978" },
        { key: "UpSell", value: "" },
        { key: "Age", value: "40" },
    ]
});

// Add recipients using the addToRecipient function
// The merge data for this Recipient will be populated with Global merge data
message.addToRecipient("recipient4@example.com", "Recipient #4");

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

// Add Attachment a filePath {string} to the array
message.attachments.push(resolve("../html/sampleemail.html"));

/**
 * Adding Custom Headers
 */
// Add Custom Headers using an Array
var headers = [];
headers.push(new CustomHeader("example-type", "bulk-send-complex"));
headers.push({ name: "message-contains", value: "merge data, attachments, headers" });
message.customHeaders = headers;

// Add Custom Headers directly to the Array
message.customHeaders.push(new CustomHeader("message-has-attachments", "true"));

// Add Custom Headers using the addCustomHeaders function
message.addCustomHeaders("testMessageHeader", "I am a message header");

/**
 * Adding Metadata
 */
// Add Custom Headers using an Array
var metadata = [];
metadata.push(new Metadata("example-type", "basic-send-complex"));
metadata.push({ name: "message-contains", value: "attachments, headers" });
message.metadata = metadata;

// Add Custom Headers directly to the Array
message.metadata.push(new Metadata("message-has-attachments", "true"));

// Add Custom Headers using the addCustomHeaders function
message.addMetadata("testMessageHeader", "I am metadata");

/**
 * Adding Tags
 */
// Add Custom Headers using an Array
var tags = [];
tags.push("basic-send-complex");
message.tags = tags;

// Add Custom Headers directly to the Array
message.tags.push("has-attachments:true");

// Add Custom Headers using the addCustomHeaders function
message.addTag("I am a test message");

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