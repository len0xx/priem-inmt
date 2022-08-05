import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import express from 'express'
// import authRouter from './src/routes/auth.js'
import { authenticate } from './src/middlewares.js'

import { handler as SvelteKitHandler } from '../build/handler.js'

// Environment variables
dotenv.config()
const { APP_PORT, APP_IP } = process.env
// const dev = NODE_ENV === 'development'

// Database connection

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
app.use('*', authenticate)

// Express routes
// app.use('/api', authRouter)

app.use(SvelteKitHandler)

app.listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
