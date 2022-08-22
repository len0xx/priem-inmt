import fs from 'fs'
import https from 'https'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import express from 'express'
import path from 'path'
import { connectDB } from './db.js'
import { fileURLToPath } from 'url'
import authRouter from './src/routes/auth.js'
import { authorize, redirectLogout, requireAuthorization, requireUnauthorized } from './src/middlewares.js'

import { handler as SvelteKitHandler } from '../build/handler.js'

// Импортируем переменные среды окружения
dotenv.config()
const { APP_PORT, APP_IP } = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Подключаемся к БД
connectDB()

// Создаём приложение Express
const app = express()
app.disable('x-powered-by')
app.set('dir', __dirname)

// Поддержка Cookie и стандартных способов отправки форм
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Helmet middleware для заголовков безопасности
// ! Использование этого middleware до сих пор не проверено до конца и может сломать что-нибудь
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

// Middleware для авторизации пользователя
app.use('*', authorize)

// Защищаем пути к панели администрирования от неавторизованных пользователей
app.use('/admin-panel', requireAuthorization('redirect'))
app.use('/admin-panel/*', requireAuthorization('redirect'))
app.use('/admin-panel-auth/logout', redirectLogout)
app.use('/admin-panel-auth/*', requireUnauthorized)

// Даём доступ к статическим файлам
app.use('/static', express.static(path.join(__dirname, 'static')))

// Express routes
app.use('/api/auth', authRouter)

// Обработчик SvelteKit
app.use(SvelteKitHandler)

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/inmt-priem.urfu.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/inmt-priem.urfu.ru/fullchain.pem')
}

// Запускаем сервер с использование SSL сертификата
https.createServer(options, app).listen(+APP_PORT, APP_IP, () => console.log('Server is running on ' + APP_IP + ':' + APP_PORT))
