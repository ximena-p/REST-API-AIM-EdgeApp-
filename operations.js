const mysql = require('mysql');


// GET
function readClients (connection, callback) {
    connection.query("SELECT * FROM client", function(err, result){
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function readProducts (connection, callback) {
    connection.query("SELECT * FROM product", function(err, result){
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function readInvoices (connection, callback) {
    connection.query("SELECT * FROM invoice", function(err, result){
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function readDetails (connection, callback) {
    connection.query(
        " SELECT details.idIn, details.idPro, product.name, product.description, product.price FROM details INNER JOIN product ON details.idPro = product.id WHERE details.idIn = ?",
         function(err, result){
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function insertInvoice(connection,data,callback) {
    let insertQuery = "INSERT INTO invoice (idCli,client,date,subtotal,discount,total) VALUES (?,?,?,?,?,?,?)";
    let query = mysql.format(insertQuery, [data.idCli, data.date, data.subtotal,data.discount,data.total]);
    
    connection.query(query, function(err,result) {
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function insertDetails(connection,data,callback) {
    let insertQuery = "INSERT INTO details (idIn,idPro) VALUES (?,?)";
    let query = mysql.format(insertQuery, [data.idIn, data.idPro]);
    
    connection.query(query, function(err,result) {
        if (err) throw err;
        callback(result);
    })
    connection.end()
}


module.exports = {readClients, readProducts, readInvoices, readDetails, insertInvoice, insertDetails};

/*
function readInvoices (connection, callback) {
    connection.query("SELECT * FROM invoices", function(err, result){
        if (err) throw err;
        callback(result);
    })
    connection.end()
}


function insert(connection,data,callback) {
    let insertQuery = "INSERT INTO users (Id,Nombre,Email,Password) VALUES (?,?,?,?)";
    let query = mysql.format(insertQuery, [data.Id, data.Nombre, data.Email, data.Password]);
    
    connection.query(query, function(err,result) {
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function found (connection, data, callback) {
    let foundQuery = "SELECT Nombre, Id FROM users WHERE Password = ? ";
    let query = mysql.format(foundQuery, [data.Password]);
    
    connection.query(query, function(err,result) {
        if (err) throw err;
        const token = jwt.sign({
            Name: result.Name,
            Id: result.Id
        }, process.env.TOKEN_SECRET)
        
        callback(result);
        
       
    })
}



function update(connection,data,callback) {
    let updateQuery = "UPDATE users SET nombre = ? WHERE id = ? ";
    let query = mysql.format(updateQuery, [data.Nombre, data.Id ]);
    
    connection.query(query, function(err,result) {
        if (err) throw err;
        callback(result);
    })
    connection.end()
}

function remove(connection,data,callback) {
    let removeQuery = "DELETE FROM users WHERE id = ? ";
    let query = mysql.format(removeQuery, [ data.Id ]);
    
    connection.query(query, function(err,result) {
        if (err) throw err;
        callback(result);
    })
    connection.end()
} */
