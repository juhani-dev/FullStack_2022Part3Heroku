const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password, name and number as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://juhanpg:${password}@cluster0.sgjnp6g.mongodb.net/?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: Object,
    number: Object,
    
  })
  const Person = mongoose.model('Person', personSchema)
  if (name){
  
  
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')
  
      const person = new Person({
        name: `${name}`,
        number: `${number}`
        
      })
  
      return person.save()
    })
    .then(() => {
      console.log('person saved!')
      return mongoose.connection.close()
    })

    .catch((err) => console.log(err))
} else {
    mongoose
    .connect(url)
    Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })}