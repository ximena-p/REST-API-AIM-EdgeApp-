const express = require("express");
const mysql = require("mysql");
const bodyparser = require('body-parser');
const router = express.Router();
const { 
    readClients, 
    readProducts, 
    readInvoices, 
    insertInvoice,
    insertDetails,
    readDetails
} = require("./operations");

require("dotenv").config();
const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


//conexion a bases de datos 
const connection = mysql.createConnection({
    host: process.env.LOCALHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if(err) throw err;
    console.log("conecion a la base de datos exitosa");
})


//midelwares
app.use("/api",router)
app.get("/", (req, res) => {
    res.send("helo world");
});

app.get("/product", (req, res) => {
    readProducts(
        connection,
        (result) => res.json(result)
    );
});

app.get("/client", (req, res) => {
    readClients(
        connection,
        (result) => res.json(result)
    );
});

app.get("/invoice", (req, res) => {
    readInvoices(
        connection,
        (result) => res.json(result)
    );
});

app.get("/details", (req, res) => {
    readDetails(
        connection,
        (result) => res.json(result)
    );
});

router.post("/insert-invoice", (req, res) => {
    
    insertInvoice(
        connection,
        {
        idCli: req.body.idCli,
        client: req.body.client,
        date: req.body.date,
        subtotal: req.body.subtotal,
        discount: req.body.discount,
        total: req.body.total
    },
    (result) => res.json(result)
    );
});

router.post("/insert-details", (req, res) => {
    
    insertDetails(
        connection,
        {
        idIn: req.body.idCli,
        idPro: req.body.idPro
    },
    (result) => res.json(result)
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("nodejs app running...");
});

