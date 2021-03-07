<template>
  <div id="home" :style="{background: '#e6e6e6'}">
      <!-- add new board btn -->
      <b-button id="addBtn" @click="handleModalShow" size="sm">
        <b-icon-plus-square-fill></b-icon-plus-square-fill>
      </b-button>

      <!-- display all boards -->
      <b-button
        v-for="board in boards"
        v-bind:key="board._id"
        :to="{name: 'Board', params: {id: board._id}}"
        id="boardButton"
        :style="{background: board.gradient}"
        >
        <div class="button-div">
          <div class="top-left">
            <h4>{{ board.name }}</h4>
          </div>
        </div>
      </b-button>

      <!-- create board form -->
      <b-modal v-model="modalShow"
        centered
        title="Create new board"
        id="modal-prevent-closing"
         ref="modal"
         @show="resetModal"
         @hidden="resetModal"
         @ok="handleOk"
        :header-bg-variant="'info'"
        :header-text-variant="'light'"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
              :state="nameState"
              label="Give the board a name:"
              label-for="name-input"
              invalid-feedback="Name is required"
          >
            <b-form-input id="name-input"
                v-model="name"
                :state="nameState"
                required
                placeholder="My cool board name"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  components: {
  },
  data: function () {
    return {
      boards: [
        { name: 'Board 1' },
        { name: 'Board 2' },
        { name: 'Board 3' }
      ],
      colors: [
        { id: 0, hex: '#17a2b8', disabled: false },
        { id: 1, hex: '#17a2b8', disabled: false },
        { id: 2, hex: '#70b7c2', disabled: false }
      ],
      modalShow: false,
      name: '',
      nameState: null,
      submittedNames: []
    }
  },
  created: function () {
    this.loadBoards()
  },
  updated: function () {
    // this.loadBoards()
  },
  methods: {
    loadBoards: function () {
      console.log('loading courses ...')
      axios.get('http://localhost:3000/api/boards').then((response) => {
        this.boards = response.data
        this.boards = this.boards.map(obj => ({ ...obj, gradient: this.gradient() }))
        console.log(this.boards)
      })
    },
    randomHex () {
      return (
        '#696' +
        Math.random()
          .toString(16)
          .slice(5, 8)
      )
    },
    gradient () {
      var baseColors = [{ hex: this.colors[0].hex }, { hex: this.colors[1].hex }, { hex: this.colors[2].hex }]
      const number = (120 + Math.random() * 100) % 215
      console.log(number)
      let colors = `linear-gradient(${number}deg`
      baseColors.forEach(function (e) {
        colors += ',' + e.hex
      })
      colors += ')'
      return colors
    },
    checkFormValidity: function () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal: function () {
      this.name = ''
      this.nameState = null
    },
    handleOk: function (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit: function () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      console.log(this.name)
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/boards/',
        data: {
          name: this.name
        }
      }).then((response) => {
        console.log(response)
        this.loadBoards()
      }, (error) => {
        console.log(error)
      })

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })

      // Redirect to home page to view all boards, including new one
      // this.$router.go('/')
    },
    handleModalShow () {
      this.modalShow = !this.modalShow
    }
  }
}
</script>

<style>
  #boardButton{
    margin-right: 1rem;
    margin-left: 1rem;
    margin-top: 1rem;
    border: transparent;
  }
  #addBtn, #addBtn:active, #addBtn:focus {
    display: block;
    position: fixed;
    left: 6.3rem;
    top: 0.9rem;
    margin-bottom:1rem;
    color: #e6e6e6;
    background-color: #326775;
    border-color: transparent !important;
  }
  #home{
    min-height: 100%;
  }
  .button-div {
    height: 8rem;
    width: 20rem;
  }
  .bg {
    height: 100%;
    color: #e6e6e6;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .bottom-right {
    position: relative;
    left: 9rem;
    top: 4rem;
  }
  .top-left {
    position: relative;
    right: 7rem;
    bottom: 0rem;
  }
</style>
