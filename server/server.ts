import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import express from 'express'
import db from './db.js'
import testRouter from './src/routes/test.js'
import featureRouter from './src/routes/feature.js'
// import { authenticate } from './src/middlewares.js'

import { handler as SvelteKitHandler } from '../build/handler.js'

// Environment variables
dotenv.config()
const { APP_PORT, APP_IP } = process.env;
// const dev = NODE_ENV === 'development'

// Database connection
(async () => {
    try {
        await db.authenticate()
        console.log('DB connected successfully')
    }
    catch (e) {
        console.error('DB connection failed')
        console.error(e)
        process.exit(1)
    }
})()

// Express application
const app = express()
app.disable('x-powered-by')

// Cookies, JSON and URLEncoded form requests support
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

// Authentication middleware should be ran before all the routes
// app.use('*', authenticate)

// Express routes
app.use('/test', testRouter)
app.use('/feature', featureRouter)

app.use(SvelteKitHandler)

app.listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
