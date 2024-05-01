const mariadb = require('mariadb');
const express = require('express');
const app = express();
const port = 8080;

const pool = mariadb.createPool({
    host: '127.0.0.1', 
    user:'shootmgr', 
    password: 'DavidNuthall', 
    database: 'fullbore',
    connectTimeout: 20000,
    connectionLimit: 20,
    multipleStatements: true
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', (req, res) => {
    res.redirect('http://localhost:8081');
});

app.get('/add/:name/:score/:V/:coach/:distance/:toCount', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO scores (name, score, V, coach, distance, toCount) VALUES ('${req.params.name}', ${req.params.score}, ${req.params.V}, '${req.params.coach}', ${req.params.distance}, ${req.params.toCount})`);
        res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
});

app.get('/add/:name/:score/:V/:coach/:distance/:toCount/:A/:B', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO scores (name, score, V, coach, distance, toCount, A, B) VALUES ('${req.params.name}', ${req.params.score}, ${req.params.V}, '${req.params.coach}', ${req.params.distance}, ${req.params.toCount}, '${req.params.A}', '${req.params.B}')`);
        res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
});

app.get('/ctr/:name/:score/:V/:coach/:distance/:toCount/:A/:B', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO ctr (name, score, V, coach, distance, toCount, A, B) VALUES ('${req.params.name}', ${req.params.score}, ${req.params.V}, '${req.params.coach}', ${req.params.distance}, ${req.params.toCount}, ${req.params.A}, ${req.params.B})`);
        res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
});

app.get('/users', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT name FROM users;');
        res.send(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
});

app.get('/date/:date', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM scores where date=${req.params.date};`);
        res.send(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
});

app.get('/user/:user', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM scores where name='${req.params.user}';`);
        res.send(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});