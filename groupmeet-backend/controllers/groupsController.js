const Group = require('../models/groupModel')
const mongoose = require('mongoose')

// get all groups
const getGroups = async (req, res) => {
  const groups = await Group.find({})

  res.status(200).json(groups)
}

// get a single group
const getGroup = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such group'})
  }

  const group = await Group.findById(id)

  if (!group) {
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
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such group'})
    }
  
    const group = await Group.findOneAndDelete({_id: id})
  
    if(!group) {
      return res.status(400).json({error: 'No such group'})
    }
  
    res.status(200).json(group)
  }
  
  // update a group
  const updateGroup = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such group'})
    }
  
    const group = await Group.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!group) {
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
