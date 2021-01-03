const {Router} = require('express')
const Contacts = require('../models/contacts')
const auth = require('../middleware/auth.middleware')
const path = require('path')
const fs = require('fs-extra')
const formidable = require('formidable')
const router = Router()

const errorMessage = 'Что-то пошло не так, попробуйте снова'

const declOfNumber = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]]
}

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

    await Contacts.findOneAndUpdate({_id: data.id}, data)
  }
}

const deleteImage = async (id) => {
  const deletePath =
    path.resolve(__dirname + '/../uploaded/images/' + id) + '/'

  if (await fs.exists(deletePath)) {
    await fs.remove(deletePath)
  }
}

router.post('/add', auth, async (request, response) => {
  try {
    const {email, firstName, lastName, phone, address, jobName, notes} = request.body
    const existing = await Contacts.findOne({email})
    if (existing) {
      return response.json({result: 'error', message: 'Контакт уже существует'})
    }
    const contact = new Contacts({
      email, firstName, lastName, phone, address, jobName, notes, owner: request.user.id
    })
    await contact.save()
    response.json({result: 'success', message: 'Контакт добавлен'})
  } catch (error) {
    response.json({result: 'error', message: error.message})
  }
})

// /api/contacts/
router.put('/', auth, async (request, response) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(request, async (error, fields, files) => {
      await Contacts.findOneAndUpdate({_id: fields.id}, fields)
      await uploadImage(files, fields)
      response.json({result: 'success', message: 'Данные обновлены'})
    })
  } catch (error) {
    response.json({result: 'error', message: error.message})
  }
})

router.get('/', auth, async (request, response) => {
  try {
    const contacts = await Contacts.find({owner: request.user.id})
    response.json(contacts)
  } catch {
    response.status(500).json({message: errorMessage})
  }
})

router.get('/:id', auth, async (request, response) => {
  try {
    const contact = await Contacts.findById(request.params.id)
    response.json(contact)
  } catch {
    response.status(500).json({message: errorMessage})
  }
})

router.delete('/:id', auth, async (request, response) => {
  const ids = request.params.id.split(',')
  try {
    await Contacts.deleteMany({
      _id: {
        $in: ids,
      }
    })
    await deleteImage(ids)
    const mess = ids.length + ' ' + declOfNumber(ids.length, ['контакт удалён !', 'контакта удалено !', 'контактов удалено'])
    response.status(200).json({result: 'success', message: mess})
  } catch {
    response.status(500).json({result: 'error', message: errorMessage})
  }
})

module.exports = router



