import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if( user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(410)
        throw new Error('Invalid Email or password')
    }
   
})

const registerUser = asyncHandler(async (req, res) => {
    const {name,email, password} = req.body;

    const userExixt = await User.findOne({ email })

    if(userExixt) {
        res.status(400)
        throw new Error('User already Exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not Found')
    }
   
})

const getUserProfile = asyncHandler(async (req, res) => {
    // res.send('Success')
    const user = await User.findById(req.user._id) 

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
   
})
const updateUserProfile = asyncHandler(async (req, res) => {
    // res.send('Success')
    const user = await User.findById(req.user._id) 

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
   
})

const getUsers = asyncHandler(async (req, res) => {
    // res.send('Success')
    const user = await User.find({}) 
    res.json(user)
   
})
const deleteUser = asyncHandler(async (req, res) => {
    // res.send('Success')
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({message: 'user has been deleted'})

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
   
})
const getUserById = asyncHandler(async (req, res) => {
    // res.send('Success')
    const user = await User.findById(req.params.id).select('-password') 
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
   
})
const updateUser = asyncHandler(async (req, res) => {

    // res.send('Success')
    const user = await User.findById(req.params.id) 

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
   
})
export { authUser, getUserProfile, registerUser, updateUserProfile, 
    getUsers, deleteUser ,updateUser,getUserById }