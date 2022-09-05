import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import express from 'express'
import path from 'path'
import { connectDB } from './db.js'
import authRouter from './src/routes/auth.js'
import dormitoryRouter from './src/routes/admin/dormitory.js'
import feedbackRouter from './src/routes/admin/feedback.js'
import contactInfoRouter from './src/routes/admin/contactInfo.js'
import postRouter from './src/routes/admin/post.js'
import opportunityRouter from './src/routes/admin/opportunity.js'
import professionRouter from './src/routes/admin/profession.js'
import programRouter from './src/routes/admin/program.js'
import rentInfoRouter from './src/routes/admin/rentInfo.js'
import responsibleRouter from './src/routes/admin/responsible.js'
import settlementRouter from './src/routes/admin/settlement.js'
import graduateRouter from './src/routes/admin/graduate.js'
import partnerRouter from './src/routes/admin/partner.js'
import carouselRouter from './src/routes/admin/carousel.js'
import questionRouter from './src/routes/admin/question.js'
import featureRouter from './src/routes/admin/feature.js'
import textinfoRouter from './src/routes/admin/textinfo.js'
import documentsRouter from './src/routes/admin/documents.js'
import mediaRouter from './src/routes/admin/media.js'
import videoRouter from './src/routes/admin/video.js'
import { fileURLToPath } from 'url'
import { errorHandler } from './src/utilities.js'
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
// (Не путать со статическими файлами в приложении SvelteKit,
// здесь хостятся в основном только те файлы, которые загружаются пользователями через формы)
app.use('/static', express.static(path.join(__dirname, 'static')))

// Express routes
app.use('/api/auth', authRouter)
app.use('/api/admin/dormitory', dormitoryRouter)
app.use('/api/admin/feedback', feedbackRouter)
app.use('/api/admin/contactInfo', contactInfoRouter)
app.use('/api/admin/opportunity', opportunityRouter)
app.use('/api/admin/post', postRouter)
app.use('/api/admin/profession', professionRouter)
app.use('/api/admin/programs', programRouter)
app.use('/api/admin/rentInfo', rentInfoRouter)
app.use('/api/admin/responsible', responsibleRouter)
app.use('/api/admin/settlement', settlementRouter)
app.use('/api/admin/textinfo', textinfoRouter)
app.use('/api/admin/graduate', graduateRouter)
app.use('/api/admin/partner', partnerRouter)
app.use('/api/admin/carousel', carouselRouter)
app.use('/api/admin/question', questionRouter)
app.use('/api/admin/feature', featureRouter)
app.use('/api/admin/documents', documentsRouter)
app.use('/api/admin/media', mediaRouter)
app.use('/api/admin/video', videoRouter)

// Обработчик ошибок
app.use(errorHandler)

// Обработчик SvelteKit
app.use(SvelteKitHandler)

app.listen(+APP_PORT, APP_IP, () => console.log('Server is running on ' + APP_IP + ':' + APP_PORT))
