// const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Please Enter the username']
        },
        price: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        },
        image: {
            type: String,
            require: false,
        }
    },
    {
        timestamps: true
    }
)


const product = mongoose.model('Products', ProductSchema)

module.exports = product