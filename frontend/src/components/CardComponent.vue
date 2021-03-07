<template>
  <div id="card">
    <b-button id="card-button" @click="handleShowCard(card)" >
      <p id="list-title"> {{card.title}} </p>
    </b-button>

    <!-- edit card  -->
    <b-modal v-model="showCard"
      centered
      id="modal-prevent-closing"
       ref="modal"
       @show="resetModal"
       @hidden="resetModal"
       @ok="handleUpdateCard(newNameCard, newDescriptionCard, 'cards', card, selectedCard._id)"
       @keyup.enter="handleEnter($event)"
      :header-bg-variant="'info'"
      :header-text-variant="'light'"
      header-class="modal-header"
    >
      <form ref="form">
        <b-form-group
            label-for="name-input"
            invalid-feedback="Name is required"
        >
          <!-- <p id="title-p"> Card title </p> -->
          <!-- <b-button id="edit-btn-card" @click="editTitle=!editTitle"> Edit </b-button> -->
          <div id="title">
            <div id="title-div" v-show="!editTitle">
              <b-button id="title-btn" v-on:click="editTitle=!editTitle">
                <strong> {{ newNameCard.trim() !== '' ? newNameCard : card.title }} </strong>
              </b-button>
              <div id="click-title" v-show="!editTitle">
                <b-icon-exclamation-circle> </b-icon-exclamation-circle>
                Click on card title to edit...
              </div>
            </div>
            <b-form-textarea id="card-input-name"
                v-model="newNameCard"
                placeholder="Enter card name"
                v-show="editTitle"
                v-on:keyup.enter="handleEnterTitle($event)"
                wrap="hard"
            ></b-form-textarea>
            <div id="press-enter" v-show="editTitle">
              <b-icon-exclamation-circle> </b-icon-exclamation-circle>
              Press ENTER to save name
            </div>
          </div>

          <div id="description">
            <div id="description-p"> Description </div>
            <b-button id="edit-btn-card" @click="editDescription=!editDescription"> Edit </b-button>
            <div id="description-div" v-show="!editDescription"> {{ newDescriptionCard? newDescriptionCard : card.description }} </div>
            <b-form-textarea v-show="editDescription" id="card-input-description"
                v-model="newDescriptionCard"
                placeholder="Enter card description"
                v-on:keyup.enter="handleEnterDescription($event)"
                wrap="hard"
                rows='5'
            ></b-form-textarea>
            <div id="press-enter" v-show="editDescription">
              <b-icon-exclamation-circle> </b-icon-exclamation-circle>
              Press ENTER to save name
            </div>
          </div>
          <b-button id="delete-card-btn"  @click="handleDelete('cards', selectedCard._id)"><b-icon-trash2-fill></b-icon-trash2-fill> Delete card</b-button>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    card: Object
  },
  data: function (){
    return {
      newNameCard: '',
      newDescriptionCard: '',
      showCard: false,
      selectedCard: { title: '', description: ''},
      editDescription: false,
      editTitle: false
    }
  },
  created() {
    this.newNameCard = this.selectedCard.title
    this.newDescriptionCard = this.selectedCard.description
  },
  methods: {
    handleShowCard(card) {
      this.editDescription = false
      this.editTitle = false
      this.selectedCard = card
      this.newNameCard = this.selectedCard.title
      this.newDescriptionCard = this.selectedCard.description;
      this.showCard = !this.showCard
    },
    handleUpdateCard(name, description, type, object, id) {
      console.log(`handleUpdateCard ${this.editDescription}`)
      console.log(`title is ${this.newNameCard}`)
      console.log(`title is ${this.newDescriptionCard}`)
      this.$parent.handleUpdateCard(name, description, type, object, id)
    },
    handleDelete(type, id) {
      this.showCard = !this.showCard
      this.$parent.handleDelete(type, id)
    },
    resetModal (){
      console.log(`resetModal ${this.editDescription}`)
      this.editDescription=false
      this.editTitle=false
    },
    handleEnterTitle () {
      event.preventDefault()
      event.stopPropagation()
      this.editTitle = false
    },
    handleEnterDescription(event) {
      event.preventDefault()
      event.stopPropagation()
      this.editDescription = false
    },
    handleEnter () {
      event.preventDefault()
      event.stopPropagation()
    },
  }
}
</script>

<style>
#card-input-name, #card-input-name:active {
  margin-top: -0.5rem;
  /* margin-bottom: 2rem; */
  max-width: 10rem;
  word-wrap: break-word;
  display: inline;
}
#press-enter{
  display: inline;
  font-size: 9pt;
  color: gray;
  margin-left: 0.5rem;
}
#description{
    margin-bottom: 2rem;
}
#card-input-description, #card-input-description:active{
  margin-top: -0.5rem;
  display: inline;
  word-wrap: break-word;
}
#delete-card-btn {
  display: block;
  position: relative;
  left: 70%;
  bottom: 5%;
  top: 1rem;
  color: white;
  border-color: transparent;
}
#trash-btn, #trash-btn:active, #trash-btn:focus {
  background-color: transparent;
  border-color: transparent;
  position: absolute;
  left: 85%;
  display: inline;
  margin-top: -0.375rem;
  outline: none !important;
  box-shadow: none;
}
#edit-btn-card {
  background-color: transparent;
  border-color: transparent;
  /* position: absolute;
  left: 85%; */
  display: inline;
  margin-top: -0.375rem;
  outline: none !important;
  box-shadow: none;
  color: #bfbfbf;
}
#description-p {
  color: #bfbfbf;
  display: inline-block;
  margin-left: 1rem;
}
#title-p {
  color: gray;
  display: inline-block;
  margin-bottom: 0rem;
}
#description-div {
    word-wrap: break-word;
    display: block;
    margin-left: 1rem;
}
#title-div {
    word-wrap: break-word;
    display: block;
}
#title {
    margin-bottom: 2rem;
}
#title-btn {
  background-color: transparent;
  border-color: transparent;
  /* position: absolute;
  left: 85%; */
  display: inline;
  outline: none !important;
  box-shadow: none;
  font-size: 15pt;
  color: #3a7078;
}
.modal-header {
  outline: none !important;
  border-color: transparent;
  box-shadow: none;
}
.modal-content {
    border: none !important;
}
#click-title{
  display: inline;
  font-size: 9pt;
  color: #bfbfbf;
  margin-left: 0.5rem;
}

</style>
