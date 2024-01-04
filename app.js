const express = require('express')
const app =express()
const PORT =process.env.PORT||5000

const bodyParser =require('body-parser')
var tokens = require('./token.js')

//const connectDb = require('./mongodb.js')

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))

const database = require('./dbconnection.js')
app.use(express.json())

const drugsRouter = require('./routes/drug');
const adminRouter =require('./routes/administrator')

app.use('/administrator', adminRouter)
app.use('/drug',tokens.ensureToken, drugsRouter)

var tokens = require('./token.js')

const loginRouter =require('./signin')
app.use('/signin', loginRouter)



const registerRouter =require('./signup.js')
app.use('/signup', registerRouter)

const processRouter =require('./addUser.js')
app.use('/processes',tokens.ensureToken, processRouter)

