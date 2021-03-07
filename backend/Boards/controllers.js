const express = require('express');
const BoardsService = require('./services.js');
const router = express.Router();

router.post('/', async(req, res, next) => {
  const {
    name
  } = req.body;

  try {
    const lists = []
    await BoardsService.add(name, lists);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async(req, res, next) => {
  const { id } = req.params;
  const {
    name,
    lists
  } = req.body;

  try {
    await BoardsService.updateById(id, name, lists);
    // TO DO - update boards that contain Board
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async(req,res,next) => {
  try{
    const boards = await BoardsService.getAll();
    res.status(200).json(boards).end();
  } catch (err){
    next(err);
  }
})

router.get('/:id', async(req,res,next) => {
  try{
    const { id } = req.params;
    const board = await BoardsService.getById(id);
    res.status(200).json(board).end();
  } catch (err){
    next(err);
  }
})

router.delete('/', async(req,res,next) => {
  try{
    await BoardsService.deleteAll();
    res.status(200).end();
  } catch (err){
    next(err);
  }
})

router.delete('/:id', async(req,res,next) => {
  try{
    const { id } = req.params;
    console.log(id)
    await BoardsService.deleteById(id);
    res.status(200).end();
  } catch (err){
    next(err);
  }
})

module.exports = router;
