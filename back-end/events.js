const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  category: String,
  dateTime: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
});

const Event = mongoose.model('Event', eventSchema);

// add event
router.post("/", validUser, async (req, res) => {
  const event = new Event({
    user: req.user,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    dateTime: req.body.dateTime,
  });
  try {
    await event.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my events
router.get("/", validUser, async (req, res) => {
  try {
    let events = await Event.find({
      user: req.user
    }).sort({
      dateTime: 1
    }).populate('user');
    return res.send(events);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all events
router.get("/all", async (req, res) => {
  try {
    let events = await Event.find().sort({
      dateTime: 1
    }).populate('user');
    return res.send(events);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get one event
router.get("/:id", async (req, res) => {
  try {
    let photo = await Event.find({
      _id: req.params.id
    }).populate('user');
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Event,
  routes: router,
}