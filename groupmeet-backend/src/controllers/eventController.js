const Event = require('../models/event');
const Group = require('../models/group');
const User = require('../models/user');
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
  try {
    const { cur_usr } = req.params;

    //get group events
    const groups = await Group.find({ members: cur_usr })
    const events_list = [];
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < groups[i]["events"].length; j++) {
        const ev = await Event.find({ _id: groups[i]["events"][j] })
        events_list.push(ev[0]);
      }

    }
    //get private events
    const user = await User.find({ email: cur_usr })
    let events_ids = user[0]["events"];
    for (let i = 0; i < events_ids.length; i++) {
      const ev = await Event.find({ _id: events_ids[i] })
      events_list.push(ev[0]);
    }

    res.status(200).json(events_list);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


// create new event
const createGroupEvent = async (req, res) => {

  const { title, group, start, end, duration, user_mail } = req.body;
  // var input = { title: "testetitle", group: "TestG", start: "01/30/2023", end: "02/5/2023", duration: "1", user_mail: "t1" };
  // var input = { title: title, group: group, start: start, end: end, duration: duration, user_mail: user_mail };
  var input = { "title": title, "group": group, "start": start, "end": end, "duration": duration, "user_mail": user_mail };
  // const input = { title, group, start, end, duration, user_mail };
  // var input;
  console.log("input.group: ", input.group)
  console.log("user_mail: ", user_mail)
  const description = "GroupEvent";
  // const creator = user_mail
  // console.log("input: ", input.user_mail)

  const requestgroup = await Group.find({ name: input.group, creator: input.user_mail });
  if (!requestgroup || requestgroup.length == 0) {
    return res.status(400).json({ error: 'You need admin rights to create an event' })
  }
  //initial freelist shall contain all days between start and end dates starting from 9:00 to 18:00
  const freelist = [];

  //change start and end dates to Date objects and set hours to 9:00.
  var start_date = new Date(changeDateFormat(input.start))
  start_date.setUTCHours(9, 0, 0, 0)
  // console.log("start_date: " + start_date)
  var end_date = new Date(changeDateFormat(input.end))
  end_date.setUTCHours(18, 0, 0, 0)
  // console.log("end_date: " + end_date)

  //initialize free list
  for (let i = new Date(start_date); i <= end_date; i.setDate(i.getDate() + 1)) {
    const last_appointment = new Date(i);
    last_appointment.setUTCHours(18, 0, 0, 0);
    const freelist_entry = { "start": i, "end": last_appointment };
    // console.log(freelist_entry)
    freelist.push(freelist_entry);
  }
  // console.log("freelist: " + freelist)

  // retrieve group members from database
  const members = requestgroup[0]["members"];

  //retrieve all private events of group all members
  const private_events = []
  for (let i = 0; i < members.length; i++) {
    // console.log(members[i])
    const user = await User.find({ email: members[i] })
    for (let j = 0; j < user[0]["events"].length; j++) {
      const ev = await Event.find({ _id: user[0]["events"][j] })
      const ev_start = new Date(ev[0]["start"])
      const ev_end = new Date(ev[0]["end"])

      //only add private events that are within the start and end dates of the group event
      if (ev_start >= start_date && ev_end <= end_date) {
        private_events.push({ start: ev_start, end: ev_end });
      }
    }
  }
  console.log(private_events)

  //remove all private events from free list
  for (let i = 0; i < private_events.length; i++) {
    updateFreeList(freelist, private_events[i])
  }

  console.log("freelist after removing private events: " + freelist)

  // get all groups that all members are in
  const all_groups = []
  const all_groups_events = []
  for (let i = 0; i < members.length; i++) {
    const group = await Group.find({ members: members[i] })
    all_groups.push(group)
  }
  // remove duplicates
  // all_groups = [...new Set(all_groups)]

  //retrieve all group events of all groups
  for (let i = 0; i < all_groups.length; i++) {
    if (all_groups[i].length > 0) {
      for (let j = 0; j < all_groups[i][0]["events"].length; j++) {
        const ev = await Event.find({ _id: all_groups[i]["events"][j] })
        const ev_start = new Date(ev[0]["start"])
        const ev_end = new Date(ev[0]["end"])

        //only add group events that are within the start and end dates of the group event
        if (ev_start >= start_date && ev_end <= end_date) {
          all_groups_events.push({ start: ev_start, end: ev_end });
        }
      }
    }
  }

  //remove all group events from free list
  for (let i = 0; i < all_groups_events.length; i++) {
    updateFreeList(freelist, all_groups_events[i])
  }

  // console.log("freelist after removing group events: " + freelist)

  // find matching time slot
  const candidate = findAvailableTimeSlot(freelist, input.duration)
  console.log("candidate: " + candidate);
  if (candidate == null) {
    return res.status(400).json({ error: 'No available time slot found' })
  } else {
    //add event to database and update user and group events
    try {
      const event = await Event.create({
        title: input.title,
        description: description,
        start: candidate.start,
        end: candidate.end,
        creator: input.user_mail,
        group: input.group
      })

      res.status(200).json({ date: start_date })
    }
    catch (error) {
      res.status(400).json({ error: error.message })

    }
  }
}


// create new private event
const createPrivateEvent = async (req, res) => {

  const { title, start, end, user_mail } = req.body;
  const description = "private"
  const creator = user_mail
  try {
    const event = await Event.create({ title, start, end, description, creator })
    const target_user = await User.findOneAndUpdate({ email: user_mail }, {
      $push: { events: event }
    })

    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete an event
const deleteEvent = async (req, res) => {
  const { id, cur_usr } = req.params

  const target_event = await Event.find({ title: id, creator: cur_usr })
  if (!target_event || target_event.length == 0) {
    return res.status(400).json({ error: 'You need admin rights to delete this event' })
  }
  const description = target_event[0]['description']
  if (description == "public") {
    const group = await Group.findOneAndUpdate({ events: [target_event[0]._id] },
      { $pullAll: { events: [target_event[0]._id] } })
    const events = await Event.findOneAndDelete({ title: id, creator: cur_usr })

  }
  else {
    const user = await User.findOneAndUpdate({ email: cur_usr },
      { $pullAll: { events: [target_event[0]._id] } })

    const events = await Event.findOneAndDelete({ title: id, creator: cur_usr })

  }

  res.status(200).json({ sucess: "Deleted" })
}

//private function to change format from mm/dd/yyyy to yyyy-mm-dd
function changeDateFormat(inputDate) {
  var splitDate = inputDate.split('/');
  if (splitDate[0].length == 1) {
    splitDate[0] = "0" + splitDate[0];
  }
  if (splitDate[1].length == 1) {
    splitDate[1] = "0" + splitDate[1];
  }
  // console.log(splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1]);
  return splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
}

// private function to update free list
function updateFreeList(freelist, event) {
  const event_start = new Date(event["start"])
  const event_end = new Date(event["end"])

  for (let i = 0; i < freelist.length; i++) {
    const freelist_start = new Date(freelist[i]["start"])
    const freelist_end = new Date(freelist[i]["end"])

    if (event_start >= freelist_start && event_end <= freelist_end) {
      freelist[i] = { "start": freelist_start, "end": event_start }
      const new_entry = { "start": event_end, "end": freelist_end }
      freelist.splice(i + 1, 0, new_entry)
      break;
    }
    else if (event_start <= freelist_start && event_end <= freelist_end) {
      freelist[i] = { "start": event_end, "end": freelist_end }
      break;
    }
    else if (event_start >= freelist_start && event_end >= freelist_end) {
      freelist[i] = { "start": freelist_start, "end": event_start }
      break;
    }
    else if (event_start <= freelist_start && event_end >= freelist_end) {
      freelist.splice(i, 1)
      break;
    }
    else {
      continue;
    }
  }
  return freelist
}

// private function to find first available time slot in free list given duration
function findAvailableTimeSlot(freelist, duration) {
  for (let i = 0; i < freelist.length; i++) {
    const freelist_start = new Date(freelist[i]["start"])
    const freelist_end = new Date(freelist[i]["end"])
    const diff = (freelist_end - freelist_start) / 60000
    if (diff >= duration) {
      return freelist[i]
    }
  }
  return null
}


module.exports = {
  getEvents,
  createGroupEvent,
  createPrivateEvent,
  deleteEvent
}
