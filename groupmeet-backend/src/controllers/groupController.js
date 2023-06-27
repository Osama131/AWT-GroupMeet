const Group = require('../models/group')
const mongoose = require('mongoose')

// get all groups
const getGroups = async (req, res) => {
  const groups = await Group.find({})

  res.status(200).json(groups)
}

// get a single group
const getGroup = async (req, res) => {
  const { id } = req.params

  const group = await Group.find({name:id})
  
  if (!group || group.length == 0) {
    return res.status(404).json({error: 'No such group'})
  }

  res.status(200).json(group)
}

// create new group
const createGroup = async (req, res) => {
    const {name, members} = req.body
    
    try {
      const group = await Group.create({name, members})
      res.status(200).json(group)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

// delete a group
const deleteGroup = async (req, res) => {
    const { id } = req.params
  
    const group = await Group.findOneAndDelete({name: id})
  
    if(!group || group.length == 0) {
      return res.status(400).json({error: 'No such group'})
    }
  
    res.status(200).json(group)
  }
  
  // update a group
  const updateGroup = async (req, res) => {
    const { id } = req.params
  
    const group = await Group.findOneAndUpdate({name: id}, {
      $push:{members: req.body.members}
    })
  
    if (!group || group.length == 0) {
      return res.status(400).json({error: 'No such group'})
    }
  
    res.status(200).json(group)
  }

module.exports = {
  getGroups,
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup
}
