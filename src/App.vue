<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="2" class="app-menu min-vh-100"><Menu /></b-col>
        <b-col cols="10" style="padding:0px">
          <b-container>
            <b-row>
              <b-col>
                <!-- <NavBar /> -->
              </b-col>
            </b-row>
            <b-row class="text-justify">
              <b-col style="padding:0px"><router-view /></b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Menu from './components/Menu.vue'
export default {
  components: {
    Menu
  }
}
</script>
<style>
</style>
