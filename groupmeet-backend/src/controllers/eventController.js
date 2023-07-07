const Event = require('../models/event');
const Group = require('../models/group');
const User = require('../models/user');
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
  try {
    const {cur_usr} = req.params;
    const user = await User.find({email: cur_usr})
    let events_ids = user[0]["events"];
    // const ev = await Event.find({_id: events_ids[0]})
    const events_list = [];
    for(let i=0;i<events_ids.length;i++)
    {
      const ev = await Event.find({_id: events_ids[i]})
      events_list.push(ev[0]);
    }
    res.status(200).json(events_list);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


// create new group
const createEvent = async (req, res) => {

  const {title, group, start, end, user_mail} = req.body;

  try {
    const event = await Event.create({title, start, end})
    const target_group = await Group.findOneAndUpdate({name: group}, {
      $push:{events: event}
    })
    // TODO: update all group members as well
    const target_user = await User.findOneAndUpdate({email: user_mail}, {
      $push:{events: event}
    })
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
 getEvents,
 createEvent
}