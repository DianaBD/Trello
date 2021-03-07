<template>
  <div id="board-header">
    <h5 id="board-title"><b> Board {{board.name}} </b></h5>
    <b-dropdown show="boardName != ''" id="board-settings" text="" class="m-md-2">
    <template #button-content>
      <em><b-icon-gear-fill></b-icon-gear-fill></em><strong> Board Settings</strong>
    </template>
      <b-dropdown-item @click="handleShowModal('edit')">Edit board</b-dropdown-item>
      <b-dropdown-item @click="handleShowModal('delete')">Delete board</b-dropdown-item>
    </b-dropdown>

    <!-- delete board form -->
    <b-modal v-model="modalShowDeleteBoard"
      centered
      id="modal-prevent-closing"
       ref="modal"
       @show="resetModal"
       @hidden="resetModal"
       @ok="handleDelete('boards',board._id)"
      :header-bg-variant="'info'"
      :header-text-variant="'light'"
    >
       <p> Delete board {{board.name}} ? </p>
    </b-modal>

    <!-- edit board name -->
    <b-modal v-model="modalShowEditBoard"
      centered
      id="modal-prevent-closing"
       title="Edit board"
       ref="modal"
       @show="resetModal"
       @hidden="resetModal"
       @ok="handleUpdate(newNameBoard,'boards', board, board._id)"
      :header-bg-variant="'info'"
      :header-text-variant="'light'"
    >
      <p> Give the board a new name: <p>
      <form ref="form">
        <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
        >
          <b-form-input id="name-input"
              v-model="newNameBoard"
              placeholder="Enter new board name"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'BoardHeader',
  props: {
    board: Object
  },
  data: function () {
    return {
      modalShowDeleteBoard: false,
      modalShowEditBoard: false,
      newNameBoard: ''
    }
  },
  methods: {
    handleShowModal (type) {
      if (type === 'edit') {
        this.modalShowEditBoard = !this.modalShowEditBoard
      }
      if (type === 'delete') {
        this.modalShowDeleteBoard = !this.modalShowDeleteBoard
      }
    },
    handleUpdate (value, type, object, id) {
      this.$parent.handleUpdate(value, type, object, id)
    },
    handleDelete (type, id) {
      this.$parent.handleDelete(type, id)
    },
    resetModal: function () {
      this.newNameBoard = ''
    }
  }
}
</script>

<style>
#board-header {
  padding-left: 0.5rem;
  color: #fff;
  display: block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}
#board-settings {
  display: inline;
  position: absolute;
  left: 86%;
  top: 3.8rem;
}
#board-title {
  display: inline;
}
#button-content, #button-content:active, #button-content:focus {
  background-color: transparent;
  border-color: transparent;
  /* position: absolute;
  left: 15%; */
  display: inline;
  margin-top: -0.375rem;
  outline: none !important;
  box-shadow: none;
}
</style>
