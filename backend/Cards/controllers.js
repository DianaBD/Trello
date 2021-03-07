const express = require('express');
const CardsService = require('./services.js');
const router = express.Router();

var admin = require('firebase-admin');

var serviceAccount = require("C:\\Users\\diana\\Documents\\Trello\\backend\\test-2a9e6-firebase-adminsdk-h147e-1426d40486.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-2a9e6-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

router.post('/', async(req, res, next) => {
  const {
    title,
    description,
    listId
  } = req.body;

  try {
    await CardsService.add(title, description, listId);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async(req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    listId
  } = req.body;

  try {
    await CardsService.updateById(id, title, description, listId);
    // TO DO - update lists that contain card
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async(req,res,next) => {
  try{
    const cards = await CardsService.getAll();
    res.status(200).json(cards).end();
  } catch (err){
    next(err);
  }
})

router.delete('/', async(req,res,next) => {
  try{
    await CardsService.deleteAll();
    res.status(200).end();
  } catch (err){
    next(err);
  }
})

router.delete('/:id', async(req,res,next) => {
  try{
    const { id } = req.params;
    await CardsService.deleteById(id);
    res.status(200).end();
  } catch (err){
    next(err);
  }
})

module.exports = router;
