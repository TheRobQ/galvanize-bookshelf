'use strict';

const express = require('express');
const knex = require('../knex.js')
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/books', (req, res, next) => {
  return knex('books').select('id', 'title', 'author', 'description', 'genre', 'books.cover_url AS coverUrl', 'books.created_at AS createdAt', 'books.updated_at as updatedAt').orderBy('title')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(function(error) {
      next(error);
    });
})

router.get('/books/:id', (req, res, next) => {
  console.log(req.params.id);
  return knex('books').where('id', req.params.id).first('id', 'title', 'author', 'description', 'genre', 'books.cover_url AS coverUrl', 'books.created_at AS createdAt', 'books.updated_at as updatedAt')
    .then((result) => {
      res.status(200).send(result)
    })
    .catch(error => {
      next(error)
    })
})

router.post('/books', (req, res, next) => {
  let myBook = req.body
  console.log()
  return knex('books').insert({
      title: myBook.title,
      author: myBook.author,
      description: myBook.description,
      genre: myBook.genre,
      cover_url: myBook.coverUrl,
      created_at: myBook.createdAt,
      updated_at: myBook.updatedAt
    }).returning(['id', 'title', 'author', 'description', 'genre', 'books.cover_url AS coverUrl'])
    .then((id) => {
      res.status(200).send(id[0])
    }).catch(error => {
      next(error)
    })
})


router.patch('/books/:id', (req, res, next) => {
  let id = req.params.id;
  let myBook = req.body;
  //console.log(myBook);
  return knex('books').update({
      title: myBook.title,
      author: myBook.author,
      description: myBook.description,
      genre: myBook.genre,
      cover_url: myBook.coverUrl
    }).where('id', id).returning(['id', 'title', 'author', 'description', 'genre', 'books.cover_url AS coverUrl'])
    .then((result) => {
      res.status(200).send(result[0])
    }).catch(error => {
      next(error)
    })
})

router.delete('/books/:id', (req, res, next) => {
    let id = req.params.id;
    return knex('books').del().where('id', id).first('title', 'author', 'description', 'genre', 'books.cover_url AS coverUrl', 'books.created_at AS createdAt', 'books.updated_at as updatedAt')
    .then( (result) => {
      console.log(result);
      res.send(result)
    })
    .catch(error => {
      next(error)
    })
})
module.exports = router;
