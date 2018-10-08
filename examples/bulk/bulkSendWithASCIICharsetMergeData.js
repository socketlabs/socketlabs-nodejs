const {SocketLabsClient, EmailAddress, BulkMessage, BulkRecipient, MergeData} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');

/**
 * Build the message
 */
var message = new BulkMessage();

message.messageId = "ASCIICharsetExample";
message.mailingId = "BulkSend";

message.subject = "Sending A Test Message With ASCII Charset Merge Data";

// Build the Content (Note the %% symbols used to denote the data to be merged)
var html = "<html>"
+ "   <body>"
    + "       <h1>Sending A Test Message With ASCII Charset Merge Data</h1>"
+ "       <h2>Merge Data</h2>"
+ "       <p>Complete? = %%Complete%%</p>"
+ "   </body>"
+ "</html>";
message.htmlBody = html

var text = "Sending A Test Message With ASCII Charset Merge Data"
+ "       Merged Data"
+ "           Complete? = %%Complete%%";
message.textBody = text; 

message.charSet = "ASCII";

message.from = new EmailAddress("from@example.com");

/**
 * Adding To Recipients
 * Incliding merge data on the recipient with the same name as the global merge data will override global merge data
 */
// Add recipients with merge data using an Array
var rec1MergeData = [];
rec1MergeData.push(new MergeData("Complete", "✔"));
var rec1 = new BulkRecipient("recipient1@example.com", { mergeData: rec1MergeData });
message.to.push(rec1);

// Add recipients with merge data directly to the Array
var rec2MergeData = [];
rec2MergeData.push({ key: "Complete", value: "✔" });
message.addToRecipient("recipient2@example.com", "Recipient #2", rec2MergeData);

// Add recipients with merge data directly to the Array
message.to.push({ 
    emailAddress: "recipient3@example.com",  
    friendlyName: "Recipient #3",
    mergeData: [
        { key: "Complete", value: "✘" }
    ]
});

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