const {Router} = require('express')
const Users = require('../models/users')
const router = Router()
const formidable = require('formidable')
const path = require('path')
const fs = require('fs-extra')
const auth = require('../middleware/auth.middleware')

const uploadImage = async (files, data) => {
  if (files.avatars !== null) {
    const fileExtension = files.avatars.name.split('.').pop()
    data.avatars = `${data.id}.${fileExtension}`
    const newPath =
      path.resolve(__dirname + '/../uploaded/images/' + data.id) +
      '/' +
      data.avatars

    if (await fs.exists(newPath)) {
      await fs.remove(newPath)
    }
    await fs.move(files.avatars.path, newPath)

    await Users.findOneAndUpdate({_id: data.id}, data)
  }
}

// /api/profile/id/:id
router.get('/id/:id', auth, async (request, response) => {
  try {
    let data = await Users.findOne({_id: request.params.id})
    response.json(data)
  } catch (error) {
    response.json({result: 'error', message: error.message})
  }
})

// /api/profile/
router.put('/', auth, async (request, response) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(request, async (error, fields, files) => {
      await Users.findOneAndUpdate({_id: fields.id}, fields)
      await uploadImage(files, fields)
      response.json({result: 'success', message: 'Данные обновлены'})
    })
  } catch (error) {
    response.json({result: 'error', message: error.message})
  }
})

module.exports = router
