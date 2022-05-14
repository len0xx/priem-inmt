import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
// import testRouter from './src/routes/test.js'
// import authRouter from './src/routes/api/auth.js'
// import signupRouter from './src/routes/api/signup.js'
// import userInfoRouter from './src/routes/api/user-info.js'

import { handler } from '../build/handler.js'

dotenv.config()

const { APP_PORT, APP_IP, DB_CONNECTION_STRING } = process.env
// const dev = NODE_ENV === 'development'

mongoose.connect(DB_CONNECTION_STRING)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('DB connected'))

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Express routes
// app.use('/test', testRouter)
// app.use('/api/auth', authRouter)
// app.use('/api/signup', signupRouter)
// app.use('/api/user-info', userInfoRouter)

// SvelteKit handler
app.use(handler)

app.listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
