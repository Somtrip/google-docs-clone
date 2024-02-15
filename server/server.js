const { Socket } = require('socket.io')
const mongoose = require("mongoose")
const Document= require("./Document")

mongoose.connect('mongodb+srv://somnath:Tripathi420@cluster0.iuolijq.mongodb.net/?retryWrites=true&w=majority')
.then( () => console.log("mongodb connected"));

const io = require('socket.io')(3001, {
    cors: {
        origin: 'https://google-docs-clone-ten-fawn.vercel.app',
        methods: ['GET', 'POST'],
    },
})

const defaultVaule = ""

io.on("connection", socket => {
    socket.on('get-document',  async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data )
        


        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on('save-document',  async data => {
            await Document.findByIdAndUpdate(documentId, { data })

        })
    })
    
    


})


async function findOrCreateDocument(id) {
    if( id == null ) return

    const document = await Document.findById(id)
    if(document) return document
    return await Document.create({ _id: id , data: defaultVaule })
}