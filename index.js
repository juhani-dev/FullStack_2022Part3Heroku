const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body)   )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))

let persons= [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
app.get('/',(request,response) =>{
  
  response.send(`try http://localhost:3001/api/persons`)
  
  })

app.get('/api/persons',(request,response) =>{
response.json(persons)
})
app.get('/api/persons/:id',(request,response) => {

  const id =Number(request.params.id)
  
  const person = persons.find(line => line.id ===id)

  if (person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
}
)

app.get('/info',(req,res) =>{

  res.send(`phonebook has info for  ${persons.length} <p></p>
  ${new Date().toString()}

`)
})

const createNewId =()=>{
  max = Math.floor(1)
  min = Math.ceil(1000)
  const newId =Math.floor(Math.random() * (Math.floor(1) - Math.ceil(1000)) + min)
  return newId
}
app.post('/api/persons',(request,response) =>{
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number ) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  const nameCheck =persons.find(line => line.name === body.name)
  if (nameCheck) {
    return response.status(400).json({
      error: "name already taken"
    })

  }

  const newPerson={
    id: createNewId(),
    name: body.name,
    number: body.number
    }
  persons = persons.concat(newPerson)

  response.json(newPerson)
  })


  
const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})