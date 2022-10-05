<template>
  <canvas ref="visualizerCanvas" :height=height style="border:1px solid #000000;"/>
</template>

<script>
export default {
  name: "PacketVisualizer",
  props: {
    height: String,
    minRadius: {
      type: Number,
      default: 25
    },
    maxRadius: {
      type: Number,
      default: 150
    },
    packetGenerator: Function,
    refreshRate: {
      type: Number,
      default: 10
    },
    packetRefreshRate: {
      type: Number,
      default: 250
    }
  },
  data: () => ({
    width: window.innerWidth,
    canvasCtx: null,
    packets: []
  }),
  methods: {
    animatePacket(packet, velocity) {
      packet.x -= velocity
    },
    drawPacket(ctx, packet) {
      ctx.beginPath()
      ctx.arc(packet.x, packet.y, packet.radius, 0, 2*Math.PI)
      ctx.fillStyle = packet.error ? '#444444' : packet.color
      ctx.fill()
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#000000";
      ctx.stroke()
      ctx.closePath()

      const fontSize = 0.25
      if(packet.error) {
        ctx.lineWidth = packet.radius * 0.10
        ctx.lineCap = "round";
        ctx.strokeStyle = '#ff0000';

        const xSize = 0.5
        ctx.beginPath()
        ctx.moveTo(packet.x-(packet.radius*xSize), packet.y-(packet.radius*xSize))
        ctx.lineTo(packet.x+(packet.radius*xSize), packet.y+(packet.radius*xSize))
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(packet.x+(packet.radius*xSize), packet.y-(packet.radius*xSize))
        ctx.lineTo(packet.x-(packet.radius*xSize), packet.y+(packet.radius*xSize))
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.font = packet.radius * fontSize + "px arial";
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.fillStyle = "#ff0000";
        ctx.fillText(packet.error.code.toString(), packet.x, packet.y + (packet.radius*0.5))
        ctx.closePath()
      } else {
        ctx.beginPath()
        ctx.font = packet.radius * fontSize + "px arial";
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.fillStyle = "#ffffff";
        ctx.fillText(packet.version.toString(), packet.x, packet.y)
        ctx.closePath()
      }
    },
    spawnPacket(packetData) {
      const radius = Math.floor(Math.random() * (this.maxRadius - this.minRadius)) + this.minRadius
      const x = this.canvasCtx.canvas.width+radius
      const y = Math.floor(Math.random() * (this.canvasCtx.canvas.height - (radius*2))) + radius
      this.packets.push({
        x,
        y,
        radius: radius,
        ...packetData
      })
    },
    update() {
      this.canvasCtx.reset()
      this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height)
      this.packets.forEach(packet => this.drawPacket(this.canvasCtx, packet))
      this.packets.forEach(packet => this.animatePacket(packet, 5))
      this.packets = this.packets.filter(packet => packet.x + packet.radius >= 0)
    },
    async getPackets() {
      if(this.packetGenerator) {
        this.spawnPacket(await this.packetGenerator())
      } else {
        this.spawnPacket({error: { code: 401 }})
      }
    },
  },
  mounted() {
    this.$refs.visualizerCanvas.width = window.innerWidth
    this.canvasCtx = this.$refs.visualizerCanvas.getContext('2d')
    setInterval(this.update, this.refreshRate)
    setInterval(this.getPackets, this.packetRefreshRate)
  },
}
</script>

<style scoped>

</style>