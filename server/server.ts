import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import express from 'express'
import path from 'path'
import db from './db.js'
import authRouter from './src/routes/auth.js'
import feedbackRouter from './src/routes/admin/feedback.js'
import infoRouter from './src/routes/admin/info.js'
import postRouter from './src/routes/admin/post.js'
import uploadRouter from './src/routes/upload.js'
// import featureRouter from './src/routes/feature.js'
import programRouter from './src/routes/admin/program.js'
import { fileURLToPath } from 'url'
import { authorize, redirectLogout, requireAuthorization, requireUnauthorized } from './src/middlewares.js'
import { errorHandler } from './src/utilities.js'

import { handler as SvelteKitHandler } from '../build/handler.js'

// Импортируем переменные среды окружения
dotenv.config()
const { APP_PORT, APP_IP, NODE_ENV } = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dev = NODE_ENV === 'development';

// Подключаемся к БД
(async () => {
    try {
        await db.authenticate()
        db.sync({ alter: dev })
        console.log('DB connected successfully')
    }
    catch (e) {
        console.error('DB connection failed')
        console.error(e)
        process.exit(1)
    }
})()

// Создаём приложение Express
const app = express()
app.disable('x-powered-by')

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
app.use('/api/admin/feedback', feedbackRouter)
app.use('/api/admin/info', infoRouter)
app.use('/api/admin/post', postRouter)
app.use('/api/admin/programs', programRouter)
app.use('/api/upload', uploadRouter)

// Обработчик ошибок
app.use(errorHandler)

// Обработчик SvelteKit
app.use(SvelteKitHandler)

app.listen(+APP_PORT, APP_IP, () => console.log('Server runs on ' + APP_IP + ':' + APP_PORT))
