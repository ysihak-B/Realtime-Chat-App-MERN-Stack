import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: [senderId, receiverId]
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // Socket.io functionality will go here


        // await newMessage.save()
        // await conversation.save()
        await Promise.all([newMessage.save(), conversation.save()]) // this will run in parallel
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation =  await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate({
            path: 'messages',
            match: {
                $or: [
                    { senderId: senderId, receiverId: userToChatId },
                    { senderId: userToChatId, receiverId: senderId }
                ]
            }
        }) // not reference but actual message
        
        if (!conversation) {
            res.status(200).json([])
        }

        const messages = conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessage controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}