<template>
  <div>
    <AppBar v-model="drawer"/>
    <AppMenu v-model="drawer"/>
    <v-container>
      <v-row no-gutters>
        <v-col
        cols="12"
        sm="4"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppMenu from './AppMenu.vue'
import AppBar from './AppBar.vue'
export default {
  name: 'AppLayout',
  components: {
    AppMenu,
    AppBar
  },
  data: () => ({
    drawer: false
  })
}
</script>
