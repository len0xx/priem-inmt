import mongoose from 'mongoose'

const basicInfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is not provided!']
    },
    caption: {
        type: String,
        required: [true, 'The caption is not provided!']
    }
})

export default mongoose.model('BasicInfo', basicInfoSchema)
