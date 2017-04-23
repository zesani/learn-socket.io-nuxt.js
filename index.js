var app = require('express')()
var http = require('http').Server(app)
const Nuxt = require('nuxt')
var io = require('socket.io')(http)
// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)
// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}
io.on('connection', function (socket) {
  console.log('a user connected')
  // socket.on('disconnect', function () {
  //   console.log('user disconnected')
  // })
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
})
http.listen(3000, () => {
  console.log('3000')
})
