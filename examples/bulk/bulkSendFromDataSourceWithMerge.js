const {SocketLabsClient, EmailAddress, BulkMessage} = require('../../src/socketlabsClient');
const exampleConfig = require('../exampleConfig');
const customerRepository = require('../../examples/datasource/customerRepository');

/**
 * Build the message
 */
var message = new BulkMessage();

message.messageId = "DatasourceExample";
message.mailingId = "BulkSend";

message.subject = "Hello %%FirstName%%";

// Build the Content (Note the %% symbols used to denote the data to be merged)
var html = "<html>"
+ "   <body>"
+ "       <h1>Sending A Test Message With Merge Data From Datasource</h1>"
+ "       <h2>Hello %%FirstName%% %%LastName%%.</h2>"
+ "       <p>Is your favorite color still %%FavoriteColor%%?</p>"
+ "   </body>"
+ "</html>";
message.htmlBody = html

var text = "Sending A Test Message With Merge Data From Datasource"
+ "       Hello %%FirstName%% %%LastName%%. Is your favorite color still %%FavoriteColor%%?";
message.textBody = text; 

message.from = new EmailAddress("from@example.com");

/**
 * Adding Recipients
 */

// Retrieve data from the datasource
customerRepo = new customerRepository();
var customers = customerRepo.getCustomers();

// Merge in the customers from the datasource
customers.forEach(c => {
    message.to.push({ 
        emailAddress: c.emailAddress,  
        friendlyName: c.firstName + " " + c.lastName,
        mergeData: [
            { key: "FirstName", value: c.firstName },
            { key: "LastName", value: c.lastName },
            { key: "FavoriteColor", value: c.favoriteColor }
        ]
    });
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