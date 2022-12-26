const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
// const mydb = require('./config');
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;
const sqlQuery = "SELECT * FROM electronic ";

app.listen(port, () => console.log(`Listening to port ${port}`));

app.get('/get_electronics_status', (req, res) => {
    let choice = req.query.type;

    if (!((choice.includes("=")))) {
        mydb.query(sqlQuery + "WHERE name = '" + choice + "'", (err, result) => {
            let sqlResult = JSON.parse(JSON.stringify(result));
            res.json(sqlResult[0]);
        });
    } else {
        res.json({
            "messageAR": "اَلَآ اِنَّهُمْ هُمُ الْمُفْسِدُوْنَ وَلٰكِنْ لَّا يَشْعُرُوْن",
            "message": "Ingatlah, sesungguhnya merekalah yang berbuat kerusakan, tetapi mereka tidak menyadari. (QS Al Baqarah: 12)"
        });
    }
});

app.get('/get_all_status', (req, res) => {
    mydb.query(sqlQuery, (err, result) => {
        if (err) throw err;
        res.json(JSON.parse(JSON.stringify(result)));
    });
});

app.get('/set_status', (req, res) => {
    let choice = req.query.type;
    let status = req.query.status;

    let query = "";

    if ("value" in req.query) {
        query = "UPDATE electronic SET status = '" + status + "', value = '" + req.query.value + "' WHERE name = '"
                    + choice + "'";
    } else {
        query = "UPDATE electronic SET status = '" + status + "' WHERE name = '"
                    + choice + "'";

    }

    if (!((choice.includes("=")))) {
        mydb.query(query, (err, result) => {
            if (err) throw err;
        });
        mydb.query(sqlQuery + "WHERE name = '" + choice + "'", (err, result) => {
            let sqlResult = JSON.parse(JSON.stringify(result));
            res.json(sqlResult[0]);
        });
    } else {
        res.json({
            "messageAR": "اَلَآ اِنَّهُمْ هُمُ الْمُفْسِدُوْنَ وَلٰكِنْ لَّا يَشْعُرُوْن",
            "message": "Ingatlah, sesungguhnya merekalah yang berbuat kerusakan, tetapi mereka tidak menyadari. (QS Al Baqarah: 12)"
        });
    }
});

app.get("*", (req, res) => {
    res.end("Tidak ada api disini");
});

app.post("*", (req, res) => {
    res.end("Tidak ada api disini");
});

module.exports = app;