require('dotenv').config()
const mongoose = require('mongoose')

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect(process.env.MONGODB_URI, mongooseOptions, (error) => {
  if (error) throw error
  console.log('DB Connected Successfully')
})

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open')
})

mongoose.connection.on('error', function (error) {
  console.log('Mongoose default connection error: ' + error)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})
