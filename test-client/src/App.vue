<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer/>
      <v-select
          v-model="selectedItem"
          :key="selectedItem.text"
          :items="items"
          return-object
      />
    </v-app-bar>

    <v-main>
      <PacketVisualizer
          class="visualizer"
          height="800px"
          :min-radius="50"
          :max-radius="100"
          :packet-generator="selectedItem?.value"
          :packet-refresh-rate="100"
      />
    </v-main>
  </v-app>
</template>

<script>
import PacketVisualizer from "@/components/PacketVisualizer";
import axios from "axios";

export default {
  name: 'App',

  components: {
    PacketVisualizer,
  },

  data: () => ({
    selectedItem: null,
    items: [{
      text: 'Test',
      value: undefined
    }]
  }),

  methods: {
    getBGActive() {
      return this.runRequest('http://localhost:3000/active/test')
    },
    getBGPreview() {
      return this.runRequest('http://localhost:3000/preview/test')
    },
    getBGCanary() {
      return this.runRequest('http://localhost:3000/canary/test')
    },
    async runRequest(url){
      try {
        const response = await axios.get(url)
        return {...response.data}
      } catch (e) {
        return {error: { code: e.response?.status ?? 'UKN' }}
      }
    }
  },
  mounted() {
    this.items = [{
      text: 'Test',
      value: undefined
    },{
      text: 'BG Active',
      value: this.getBGActive
    },{
      text: 'BG Preview',
      value: this.getBGPreview
    },{
      text: 'Canary',
      value: this.getBGCanary
    }]
    this.selectedItem = this.items[0]
  }
};
</script>

<style>
.visualizer {
  margin-top: 1rem;
}
</style>
