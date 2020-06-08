const c = console.log,
http = require('http').createServer(server),
fs = require('fs'),
io = require('socket.io')(http)

let connections = 0

function server (req, res){
    fs.readFile('index.html',(err,data)=>{
        if(err){
            res.writeHead(500,{'Content-Type':'text/html'})
            console.clear()
            return res.end('<h1> Error interno del servidor:)</h1>')

        }else{
            res.writeHead(200,{'Content-Type':'text/html'})
            return res.end(data,'UTF-8')
        }
    })
}
http.listen(3000,c('Servidor Corriendo desde el localHost:3000'))
io.on('connection', function(socket){
    socket.emit('hello',{message:'Hola Mundo con socket.io'})
    socket.on('event 2',data=>{c(data)})
    connections ++
    c(`conexiones activas: ${connections} `)
    socket.emit('connect users',{connections})
    socket.broadcast.emit('connect users',{connections})
    socket.on('disconnect',()=>{
        connections--
        socket.broadcast.emit('connect users',{connections})
        c(`conexiones Activas:${connections}`)
    })
})