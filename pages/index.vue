<template lang="html">
  <div class="">
    <ul>
      <li v-for="c in chat">{{c}}</li>
    </ul>
    <ul id="messages"></ul>
    <div class="f">
      <input id="m" v-model="input"/><button @click="send">Send</button>
    </div>

  </div>
</template>
<script>
/* global io */
export default {
  data () {
    return {
      input: '',
      socket: '',
      chat: []
    }
  },
  mounted () {
    var vm = this
    this.socket = io()
    this.socket.on('chat message', function (msg) {
      vm.chat.push(msg)
    })
    // console.log(socket)
  },
  methods: {
    send () {
      var vm = this
      this.socket.emit('chat message', vm.input)
      console.log(vm.input)
      this.input = ''
    }
  }
}
</script>

<style lang="css">
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font: 13px Helvetica, Arial; }
  .f { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
  .f input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
  .f button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
  #messages { list-style-type: none; margin: 0; padding: 0; }
  #messages li { padding: 5px 10px; }
  #messages li:nth-child(odd) { background: #eee; }
</style>
