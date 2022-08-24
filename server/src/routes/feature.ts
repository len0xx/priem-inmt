// import { Router } from 'express'
// import featureService from '../services/feature.js'
// import type { Request, Response } from 'express'

// const router = Router() /* eslint-disable-line */

// router.get('/', async (req: Request, res: Response) => {
//     const { title, description } = req.query

//     const newFeature = {
//         title: title ? title.toString() : 'Title of Feature',
//         description: description ? description.toString() : 'Description of Feature',
//     }

//     try {
//         await featureService.create(newFeature)

//         res.status(200).json({
//             ok: true,
//             message: 'New Feature has been created!'
//         })
//     }
//     catch (e) {
//         res.status(400).json({
//             ok: false,
//             error: e instanceof Error ? e.message : e.toString()
//         })
//     }
// })

// router.get('/:id', async (req: Request, res: Response) => {
//     const id = +req.params.id

//     try {
//         const feature = await featureService.getById(id)

//         res.status(200).json({
//             ok: true,
//             feature
//         })
//     }
//     catch (e) {
//         res.status(400).json({
//             ok: false,
//             error: e instanceof Error ? e.message : e.toString()
//         })
//     }
// })

// export default router
