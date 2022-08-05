import fs from 'fs'
import https from 'https'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import express from 'express'
// import testRouter from './src/routes/test.js'

import { handler as SvelteKitHandler } from '../build/handler.js'

dotenv.config()

const { APP_PORT, APP_IP } = process.env
// const dev = NODE_ENV === 'development'

// mongoose.connect(DB_CONNECTION_STRING)
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('DB connected'))

const app = express()
app.disable('x-powered-by')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Helmet middleware for protection headers
// ! It's not fully tested yet and might break something
app.use(helmet.crossOriginEmbedderPolicy())
app.use(helmet.crossOriginOpenerPolicy())
app.use(helmet.crossOriginResourcePolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())

// Express routes
// app.use('/test', testRouter)

// SvelteKit handler
app.use(SvelteKitHandler)

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/inmt-priem.urfu.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/inmt-priem.urfu.ru/fullchain.pem')
}

// Use the SSL certificate
https.createServer(options, app).listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
