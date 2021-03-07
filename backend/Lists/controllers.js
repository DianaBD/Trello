const express = require('express');
const ListsService = require('./services.js');
const router = express.Router();

router.post('/', async(req, res, next) => {
  const {
    title,
    boardId
  } = req.body;

  try {
    const cards = []
    await ListsService.add(title, cards, boardId);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async(req, res, next) => {
  const { id } = req.params;
  const {
    title,
    cards
  } = req.body;

  try {
    await ListsService.updateById(id, title, cards);
    // TO DO - update lists that contain List
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async(req,res,next) => {
  try{
    const lists = await ListsService.getAll();
    res.status(200).json(lists).end();
  } catch (err){
    next(err);
  }
})

router.delete('/', async(req,res,next) => {
  try{
    await ListsService.deleteAll();
    res.status(200).end();
  } catch (err){
    next(err);
  }
})

router.delete('/:id', async(req,res,next) => {
  try{
    const { id } = req.params;
    // TO DO - sterge toate cards din list cu id
    await ListsService.deleteById(id);
    res.status(200).end();
  } catch (err){
    next(err);
  }
})

module.exports = router;
