const model = require('../models/addressesModel')

async function createAddress(city, street, zipcode) {
    try {
        return model.createAddress(city, street, zipcode);
    } catch (err) {
        throw err;
    }

}

async function getAddresses() {
    try {
        return model.getAddresses();
    } catch (err) {
        throw err;
    }

}

async function getAddress(id) {
    try {
        return model.getAddress(id);
    } catch (err) {
        throw err;
    }
}

async function deleteAddress(id) {
    try {
        return model.deleteAddress(id);
    } catch (err) {
        throw err;
    }
}
async function updateAddress(id, city, street, zipcode) {
    try {
        return model.updateAddress(id, city, street, zipcode);
    } catch (err) {
        throw err;
    }
}
module.exports = { createAddress, getAddresses, getAddress , deleteAddress, updateAddress}