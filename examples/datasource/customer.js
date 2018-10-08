

class Customer{

    constructor({
        firstName = null,
        lastName = null,
        emailAddress = null,
        favoriteColor = null
    } = {}) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.favoriteColor = favoriteColor;

    }

}
module.exports = Customer;