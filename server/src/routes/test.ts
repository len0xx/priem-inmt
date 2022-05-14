import express from 'express'
// import needle from 'needle'
// import type { NeedleHttpVerbs, NeedleResponse } from 'needle'

// type RESTMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// // Обёртка для отправки XMLHttpRequest запросов
// export async function HTTPRequest(
//     url: string,
//     method: RESTMethod,
//     data?: Record<string, any>,
//     headers?: Record<string, string>
// ): Promise<Record<string, any>> {
//     let response: NeedleResponse
//     if (!headers) headers = {}

//     response = await needle(
//         method.toLowerCase() as NeedleHttpVerbs,
//         url,
//         data,
//         { headers: headers }
//     )

//     return response.body
// }

const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.headers)

    res.json({
        ok: true,
        data: {
            message: 'Hello world!'
        }
    })
})

// router.get('/needle', async (req, res) => {
//     const response = await HTTPRequest('http://localhost:3000/test', 'GET', { test: 1 }, {'X-API-Key': 'Hello!'})
//     const json = response
//     console.log(json)
//     res.json({done: true})
// })

export default router
