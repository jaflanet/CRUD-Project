const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
const { Client } = require('pg');
const { response } = require('express');
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "tugas_kuis",
    password: "",
    port: "5432",
});

client.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
});

app.get('/',(req, res) => {
    const query = "SELECT * FROM music order by id asc";
    client.query(query , (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(results.rows)
        // for (let row of results.rows) {
        //     console.log(row);
        // }
        // res.send('Data send to console');
    });
});

app.post('/insert', function(req, res) {
    const query = `INSERT INTO music VALUES (DEFAULT, '${req.body.title}', '${req.body.genre}','${req.body.singer}', '${req.body.time_length}')`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(res);
            return;
        }
        console.log(`Data berhasil dimasukkan`);
        res.send(`Data berhasil dimasukkan`);
    });
});

app.put('/update/:id', function(req, res) {
    const query = `UPDATE music SET title = '${req.body.title}', genre = '${req.body.genre}',singer = '${req.body.singer}', time_length = '${req.body.time_length}' WHERE id = ${req.params.id}`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Data ${req.params.id} berhasil diubah`);
        res.send(`Data ${req.params.id} berhasil diubah`);
    });
});

app.delete('/delete/:id', function(req, res) {
    const query = `DELETE FROM music WHERE id = '${req.params.id}'`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${req.params.id} berhasil dihapus`);
        res.send(`${req.params.id} berhasil dihapus`);
    });
});

//server listening
app.listen(12345, () => {
    console.log(`on port 12345`);
});