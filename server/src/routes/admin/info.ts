import { Router } from 'express'
import contactInfoService from '../../services/contactInfo.js'
import type { Request, Response } from 'express'

const router = Router() /* eslint-disable-line */

router.post('/contacts', async (req: Request, res: Response) => {
    try {
        const { tel, email, directorateAddress, admissionsAddress, vkUrl, tgUrl } = req.body

        const newData = { tel, email, directorateAddress, admissionsAddress, vkUrl, tgUrl }

        if (contactInfoService.getById()) await contactInfoService.update({ where: { id: 1 } }, newData)
        else await contactInfoService.create(newData)

        res.status(200).json({
            ok: true,
            message: 'Contact info has been updated successfully!'
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            error: e instanceof Error ? e.message : e.toString()
        })
    }
})

// router.get('/:id', async (req: Request, res: Response) => {
//     const id = +req.params.id

//     try {
//         const feature = await featureService.get(id)

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

export default router
