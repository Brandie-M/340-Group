//Citation: Lines 6-19
//Date: 4/5/2023
//Copied from CS340 Starter code from Week 1 - Activity 2


// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_mcginneb',
    password        : 'DpcPHBElDLMi',
    database        : 'cs340_mcginneb'
})

// Export it for use in our application
module.exports.pool = pool;