<template>
  <v-app-bar
  app
  fixed
  color="primary"
  dark
  >
   <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>
   <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    show: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  }

}
</script>
