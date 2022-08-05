import fs from 'fs'
import https from 'https'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
// import testRouter from './src/routes/test.js'

import { handler } from '../build/handler.js'

dotenv.config()

const { APP_PORT, APP_IP } = process.env
// const dev = NODE_ENV === 'development'

// mongoose.connect(DB_CONNECTION_STRING)
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('DB connected'))

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Express routes
// app.use('/test', testRouter)

// SvelteKit handler
app.use(handler)

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/inmt-priem.urfu.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/inmt-priem.urfu.ru/fullchain.pem')
}

// Use the SSL certificate
https.createServer(options, app).listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
