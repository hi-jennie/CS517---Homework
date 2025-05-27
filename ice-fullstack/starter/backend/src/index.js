// !!! IMPORTANT !!!
// Be sure to run 'npm run dev' from a
// terminal in the 'backend' directory!

import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'

const app = express();
const port = 53706;

const GET_POST_SQL = 'SELECT * FROM BadgerComment;'
const GET_SPECIFIC_POST_SQL = 'SELECT * FROM BadgerComment WHERE id = ?;'
const INSERT_POST_SQL = 'INSERT INTO BadgerComment(comment, created) VALUES (?, ?) RETURNING id;'
const DELETE_POST_SQL = "DELETE FROM BadgerComment WHERE id = ?;"

const db = await open({
    filename: process.env['MINI_BADGERCHAT_DB_LOC'] ?? "./db.db",
    driver: sqlite3.Database
});

await db.exec("CREATE TABLE IF NOT EXISTS BadgerComment(id INTEGER PRIMARY KEY UNIQUE, comment TEXT NOT NULL, created TIMESTAMP NOT NULL);")

let comments = [];
applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

app.get('/api/hello-world', (req, res) => {
    res.status(200).send({
        msg: "Hello! :)"
    })
})

app.get('/api/comments', async (req, res) => {

    res.status(200).send(comments)
})

app.post('/api/comments', async (req, res) => {
    const comment = req.body.comment;
    let commentId = comments.length;
    let commentDt = new Date();
    let commentObj = {
        id: commentId,
        comment: comment,
        created: commentDt
    }
    comments.push(commentObj)

    res.status(200).send({
        msg: "I should create a comment.",
        id: commentId
    })
})

app.delete('/api/comments', async (req, res) => {
    const commentId = req.query.id;
    comments = comments.filter(c => c.id != commentId);

    res.status(200).send({
        msg: "I should delete a comment.",
        len: comments.length
    })
});

applyErrorCatching(app);

// Open server for business!
app.listen(port, () => {
    console.log(`My API has been opened on :${port}`)
});
