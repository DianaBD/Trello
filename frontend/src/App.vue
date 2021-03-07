<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="info">

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
        <b-navbar-nav>
          <!-- <b-nav-item id="boards-btn" to="/">Boards</b-nav-item> -->
          <b-button id="boards-btn-link" to="/">Boards</b-button>
        </b-navbar-nav>
        <b-navbar-brand to="/" id="trello" ><img id="trello-img" alt="Vue logo" src="./assets/trello1.png"></b-navbar-brand>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import Board from './views/Board.vue'
// import axios from 'axios'
export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
body {
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
#trello {
  position: relative;
  margin-left: 43%;
}
#nav a {
  font-weight: bold;
}
#boards-btn {
  color: #e6e6e6 !important;
}
#boards-btn:active, #boards-btn:focus {
  color: #ffffff !important;
}
#trello-img {
  max-height: 2rem;
}
#boards-btn-link {
  background-color: #326775;
  outline: none;
  border: none;
  color: #e6e6e6;
}
#boards-btn-link:active {
  color: #f2f2f2;
}
</style>
