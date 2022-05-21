
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => { 
    const existentRole = await Role.findOne({role})
    if (!existentRole) {
        throw new Error(`${role} role is not registered. `);
    }
}

const emailExists = async(email) => {
    
    const existentEmail = await User.findOne({email});

    if ( existentEmail ) {
        throw new Error(`Email: ${email} is already registered.`);
    }
}

const userExistsByID = async(id) => {
    
    const existentEmail = await User.findById(id);

    if ( !existentEmail ) {
        throw new Error(`Id: ${id} does not exist.`);
    }
}


module.exports = {
    isValidRole,
    emailExists,
    userExistsByID
}