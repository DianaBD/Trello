<template>
  <div id="list">
    <b-card id="list-card">
      <b-card-title>
        {{list.title}}
        <b-button id="edit-btn"><b-icon-three-dots @click="handleClickEditList" ></b-icon-three-dots></b-button>
        <b-button id="trash-btn"><b-icon-trash2-fill @click="handleDelete('lists', list._id)" id="trash-list"></b-icon-trash2-fill></b-button>
      </b-card-title>
      <b-card-sub-title>  </b-card-sub-title>

      <cardComponent v-for="card in list.cards" v-bind:key="card._id" v-bind:card="card"></cardComponent>

      <b-button id="add-card-btn" v-show="!showInputAddCard" @click="handleClickAddCard" >
        <b-icon-plus-square-fill ></b-icon-plus-square-fill>
          <strong> Add card </strong></b-button>
      <!-- add card form -->
      <b-form-input id="add-card"
          v-model="cardName"
          v-on:keyup.enter="handleAdd(cardName, 'cards', list._id)"
          required
          placeholder="Type new card name..."
          v-show="showInputAddCard"
      ></b-form-input>
      <b-icon-x-circle-fill id="close-btn" @click="handleClickAddCard" color="gray" v-show="showInputAddCard"></b-icon-x-circle-fill>
      <div id="press-enter" v-show="showInputAddCard">
        <b-icon-exclamation-circle> </b-icon-exclamation-circle>
        Press ENTER to save new card
      </div>
      <b-card-text></b-card-text>
    </b-card>

    <!-- edit list name -->
    <b-modal v-model="modalShowEditList"
      centered
      id="modal-prevent-closing"
       title="Edit list"
       ref="modal"
       @show="resetModal"
       @hidden="resetModal"
       @ok="handleUpdate(newNameList,'lists', list, list._id)"
      :header-bg-variant="'info'"
      :header-text-variant="'light'"
    >
      <p> List name: <strong> {{list.title}} </strong> </p>
      <p> Give the list a new name: <p>
      <form ref="form">
        <b-form-group
            label-for="name-input"
            invalid-feedback="Name is required"
        >
          <b-form-input id="name-input"
              v-model="newNameList"
              placeholder="Enter new board name"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import cardComponent from '../components/CardComponent.vue'
export default {
  name: 'ListComponent',
  components: {
    cardComponent
  },
  props: {
    list: Object
  },
  data: function () {
    return {
      modalShowEditList: false,
      newNameList: '',
      cardName: '',
      showInputAddCard: false
    }
  },
  methods: {
    handleDelete (type, id) {
      this.$parent.handleDelete(type, id)
    },
    handleUpdate (value, type, object, id) {
      if (value !== '') {
        this.$parent.handleUpdate(value, type, object, id)
      }
    },
    handleUpdateCard (name, description, type, object, id) {
      object.description = description
      this.$parent.handleUpdate(name, type, object, id)
    },
    handleClickEditList (value, type, object, id) {
      this.modalShowEditList = !this.modalShowEditList
    },
    resetModal: function () {
      this.newNameList = ''
    },
    handleClickAddCard () {
      this.showInputAddCard = !this.showInputAddCard
    },
    handleAdd (value, type, parentId) {
      this.$parent.handleAdd(value, type, parentId)
      if (type === 'cards') {
        this.showInputAddCard = !this.showInputAddCard
        this.cardName = ''
      }
    }

  }
}
</script>

<style>
#list-title {
  margin-top: 0;
  margin-bottom: 0rem;
}
#trash-list {
  position: absolute;
  left: 89%;
  margin-top: -0.375rem;
}
#trash-card-btn {
  display: block;
  position: absolute;
  left: 70%;
  bottom: 5%;
  color: white;
  /* background-color: transparent; */
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
#edit-btn, #edit-btn:active, #edit-btn:focus {
  background-color: transparent;
  border-color: transparent;
  display: inline;
  margin-top: 0rem;
  margin-left: -0.1rem;
  outline: none !important;
  box-shadow: none;
}
#add-card-btn, #add-card-btn:active, #add-card-btn:focus {
  background-color: transparent;
  border-color: transparent;
  display: inline;
  margin-top: 0.5rem;
  outline: none !important;
  box-shadow: none;
  color: gray;
}
#add-card {
  display: inline;
  max-width: 15rem;
  margin-top: 1rem;
}
#close-btn {
  display: inline;
  position: relative;
  left: -0.5em;
  top: -1rem
}
#press-enter{
  display: block;
  font-size: 9pt;
  color: gray;
  margin-left: 0.5rem;
}
</style>
