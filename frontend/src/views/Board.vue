<template>
  <div id="board" :style="{background: '#70b7c2'}">
    <boardHeader
      v-bind:board="board"
    ></boardHeader>

    <listComponent
       v-for="list in boardLists"
       v-bind:list="list"
       v-bind:boardId="boardId"
       v-bind:key="list._id"
       >
    </listComponent>

    <!-- add list form -->
    <b-form-input id="add-list"
        v-model="listName"
        v-on:keyup.enter="handleAdd(listName, 'lists', boardId)"
        required
        placeholder="Add a list..."
    ></b-form-input>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import boardHeader from '../components/BoardHeader.vue'
import listComponent from '../components/ListComponent.vue'

export default {
  name: 'Board',
  components: {
    boardHeader,
    listComponent
  },
  data: function () {
    return {
      needUpdate: false,
      boardId: this.$route.params.id,
      board: {},
      boardName: '',
      boardLists: [],
      listName: '',
      newNameList: '',
      newNameCard: ''
    }
  },
  created: function () {
    this.loadBoard()
  },
  methods: {
    loadBoard: function () {
      console.log(`loading board with id = ${this.boardId}`)
      axios.get(`http://localhost:3000/api/boards/${this.boardId}`).then((response) => {
        this.board = response.data
        this.boardName = response.data.name
        this.boardLists = response.data.lists
        // console.log(this.board)
        console.log(this.board.lists)
      }, (error) => {
        console.log(error)
      })
    },

    handleAdd: function (value, type, parentId) {
      console.log(`Add new ${type} to parent with id ${parentId}`)
      var data = {}
      if (type === 'lists') {
        data = {
          title: value,
          boardId: parentId
        }
      }
      if (type === 'cards') {
        data = {
          title: value,
          description: '',
          listId: parentId
        }
        console.log(data)
      }
      if (this.listName !== '' || type !== 'lists') {
        axios({
          method: 'post',
          url: `http://localhost:3000/api/${type}/`,
          data: data
        }).then((response) => {
          console.log(response)
          this.loadBoard()
          this.listName = ''
        }, (error) => {
          console.log(error)
        })
      }
    },

    handleDelete: function (type, id) {
      console.log(`deleting ${type} with id = ${this.boardId}`)
      if (type === 'boards') {
        console.log('da')
        this.boardName = ''
        this.boardLists = []
      }
      axios({ method: 'delete', url: `http://localhost:3000/api/${type}/${id}` })
        .then((response) => {
          console.log(response)
          if (type === 'boards') {
            // this.$router.go('/')
            window.location.href = ''
          } else {
            console.log('NOT OK')
            this.loadBoard()
          }
        }, (error) => {
          console.log(error)
        })
      if (type === 'boards') {
        this.$router.push('/')
      }
    },

    handleUpdate: function (value, type, object, id) {
      console.log(`editing ${type} with id = ${id}`)
      if (type === 'boards' && this.isEmptyOrSpaces(value) == false) {
        object.name = value
      } else if (this.isEmptyOrSpaces(value) == false) {
        object.title = value
      }
      axios({ method: 'put', url: `http://localhost:3000/api/${type}/${id}`, data: object })
        .then((response) => {
          console.log(response)
          this.loadBoard()
        }, (error) => {
          console.log(error)
        })
    },

    resetModal: function () {
      this.name = ''
    },

    isEmptyOrSpaces(str) {
      const a = str == null || str.trim() === ''
      console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ${a}`)
      return str == null || str.trim() === '';
    }
  },
  computed: {
  }
}
</script>

<style>
#board {
  min-height: 100%;
  transition: background-color 5s;
  text-align: left;
}
#list {
    display: inline-block;
    margin-left: 2rem;
    margin-top: 2rem;
    min-width: 25rem;
}
#list-card {
  background-color: #e6e6e6;
}
#card-button {
  background-color: #ffffff;
  color: #6c757d;
  display: flex;
  min-width: 22rem;
  margin-top: 0.5rem;
  border-color: #ffffff;
}
#add-list {
    display: inline-block;
    margin-left: 2rem;
    margin-top: 2rem;
    max-width: 12rem;
    background-color: #16a0b6;
    border: none;
    color: white;
    --placeholder-color: #white;
}
#add-list::placeholder {
  color: var(--placeholder-color);
}
</style>
