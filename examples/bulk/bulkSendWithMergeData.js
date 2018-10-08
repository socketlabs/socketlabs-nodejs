const {SocketLabsClient, EmailAddress, BulkMessage, BulkRecipient, MergeData} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BulkMessage();

message.messageId = "MergeData";
message.mailingId = "BulkSend";

message.subject = "Sending A Test Message With Merge Data";

// Build the Content (Note the %% symbols used to denote the data to be merged)
var html = "<html>"
+ "   <head><title>Sending A Test Message With Merge Data</title></head>"
+ "   <body>"
+ "       <h1>Sending A Complex Test Message</h1>"
+ "       <h2>Global Merge Data</h2>"
+ "       <p>Motto = <b>%%Motto%%</b></p>"
+ "       <h2>Per Recipient Merge Data</h2>"
+ "       <p>"
+ "       EyeColor = %%EyeColor%%<br/>" 
+ "       HairColor = %%HairColor%%"
+ "       </p>" 
+ "   </body>"
+ "</html>";
message.htmlBody = html

var text = "Sending A Test Message With Merge Data"
+ "       Merged Data"
+ "           Motto = %%Motto%%"
+ "       "
+ "       Example of Merge Usage"
+ "           EyeColor = %%EyeColor%%" 
+ "           HairColor = %%HairColor%%";
message.textBody = text; 

message.from = new EmailAddress("from@example.com");

/**
 * Adding To global merge data
 */
message.globalMergeData.push( new MergeData("Motto", "When hitting the Inbox matters!"));

/**
 * Adding To Recipients
 * Incliding merge data on the recipient with the same name as the global merge data will override global merge data
 */
// Add recipients with merge data using an Array
var rec1MergeData = [];
rec1MergeData.push(new MergeData("EyeColor", "Blue"));
rec1MergeData.push({ key: "HairColor", value: "Blond" });
var rec1 = new BulkRecipient("recipient1@example.com", { mergeData: rec1MergeData });
message.to.push(rec1);

// Add recipients with merge data directly to the Array
var rec2MergeData = [];
rec2MergeData.push(new MergeData("EyeColor", "Green"));
rec2MergeData.push({ key: "HairColor", value: "Brown" });
message.addToRecipient("recipient2@example.com", "Recipient #2", rec2MergeData);

// Add recipients with merge data directly to the Array
message.to.push({ 
    emailAddress: "recipient3@example.com",  
    friendlyName: "Recipient #3",
    mergeData: [
        { key: "EyeColor", value: "Hazel" },
        { key: "HairColor", value: "Black" }
    ]
});

// Add recipients using the addToRecipient function
// The merge data for this Recipient will be populated with Global merge data
message.addToRecipient("recipient4@example.com", "Recipient #5"); 

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