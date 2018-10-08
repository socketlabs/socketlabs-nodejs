const customer = require('../datasource/customer')

class CustomerRepository {

    getCustomers() {

        var customers = [];
        
        customers.push(new customer({firstName: "Recipient", lastName: "One", emailAddress: "recipient1@example.com", favoriteColor: "Green"}));
        customers.push(new customer({firstName: "Recipient", lastName: "Two", emailAddress: "recipient2@example.com", favoriteColor: "Red"}));
        customers.push(new customer({firstName: "Recipient", lastName: "Three", emailAddress: "recipient3@example.com", favoriteColor: "Blue"}));
        customers.push(new customer({firstName: "Recipient", lastName: "Four", emailAddress: "recipient4@example.com", favoriteColor: "Orange"}));
        return customers;
    }

}

module.exports = CustomerRepository;