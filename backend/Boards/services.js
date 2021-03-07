const { Boards } = require('../data')
const { Lists } = require('../data')
const { Cards } = require('../data')

const add = async (name, lists) => {
  const board = new Boards({
    name,
    lists
  });
  try {
    await board.save();
  } catch (err) {
    console.log(err)
  }
}

const updateById = async (id, name, lists) => {
  try {
    await Boards.findByIdAndUpdate(id, {name, lists});
  } catch (err) {
    console.log(err)
  }
}

const getAll = async () => {
  try {
    var boards = await Boards.find();
    var result = await Lists.populate(boards, {path: 'lists', model:'Lists'})
    return result
  } catch (err) {
    console.log(err)
  }
}

const getById = async (id) => {
  try {
    var board = await Boards.findOne({ _id : id });
    var board_populated = await Lists.populate(board, {path: 'lists', populate : {path: 'cards', model: 'Cards'}})
    return board_populated
  } catch (err) {
    console.log(err)
  }
}

const deleteAll = async () => {
  try {
    await Boards.deleteMany()
  } catch (err) {
    console.log(err)
  }
}

const deleteById = async (id) => {
  try {
    //TO DO - sterge listele din Board_to_delete
    var board = await Boards.findOne({_id : id})
    var lists_to_delete = board.lists
      console.log(lists_to_delete)
    console.log(lists_to_delete[0])
    await lists_to_delete.forEach(async (list_id, i) => {
      console.log(list_id)
      var list = await Lists.findOne({_id : list_id})
      var cards_to_delete = list.cards
      await Cards.deleteMany({ _id: { $in: cards_to_delete}})
    });

    await Lists.deleteMany({ _id : lists_to_delete})
    //TO DO _ stege Board_to_delete
    await Boards.deleteOne({ _id : id})
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteAll,
  deleteById
}
