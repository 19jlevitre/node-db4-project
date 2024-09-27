const express = require('express')

const Chef = require('./model.js')

const router = express.Router()


router.get('/:id', (req, res, next) => {
    const { id } = req.params
  
    Chef.findById(id)
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          next({ message: 'Could not find user with given id.', status: 404 })
        }
      })
      .catch(err => {
        next(err)
      })
  })

  module.exports = router