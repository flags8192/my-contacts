const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  avatars: { type: String, default: '' },
  email: { type: String, index: { unique: true, dropDups: true } },
  firstName: { type: String, required: true, default: '' },
  lastName: { type: String, required: true, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  jobName: { type: String, default: '' },
  notes: { type: String, default: '' },
  password: { type: String, required: true },
  contacts: [{type: Types.ObjectId, ref: 'Contacts'}],
  created: { type: Date, default: Date.now },
})

module.exports = model('Users', schema)
