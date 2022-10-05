
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:4},

    number: {
        minlength:9,
        type: String ,

        validate: {
            validator: function(v) {
                return /\b\d{2,3}\b-\d{5,6}/.test(v);
            },message: "Then numbers form is invalid."
        },
    }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)