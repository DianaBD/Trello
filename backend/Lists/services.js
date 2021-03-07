const { Lists } = require('../data')
const { Cards } = require('../data')
const { Boards } = require('../data')

const add = async (title, cards, boardId) => {
  const list = new Lists({
    title,
    cards
  });
  try {
    await list.save();
    var board = await Boards.findOne({_id: boardId})
    console.log(board.lists)
    var updated_lists = [...board.lists, list._id]
    board.lists = updated_lists
    await Boards.findByIdAndUpdate(boardId, board);
  } catch (err) {
    console.log(err)
  }
}

const updateById = async (id, title, cards) => {
  try {
    await Lists.findByIdAndUpdate(id, {title, cards});
  } catch (err) {
    console.log(err)
  }
}

const getAll = async () => {
  try {
    var lists = await Lists.find();
    var result = await Cards.populate(lists, {path: 'cards', model:'Cards'})

    return result

  } catch (err) {
    console.log(err)
  }
}

const deleteAll = async () => {
  try {
    await Lists.remove();
  } catch (err) {
    console.log(err)
  }
}

const deleteById = async (id) => {
  try {
    var list = await Lists.findOne({_id : id})
    //TO DO - sterge lista din Boards
    var board = await Boards.findOne({lists: list})
    var new_lists = board.lists.filter(el => {return el._id != id})
    board.lists = new_lists
    await Boards.findByIdAndUpdate(board._id, board)

    //TO DO - sterge cards din Listsa
    var cards_to_delete = list.cards
    await Cards.deleteMany({ _id: { $in: cards_to_delete}})

    //TO DO _ stege lista
    await Lists.deleteOne({ _id : id})
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  add,
  getAll,
  updateById,
  deleteAll,
  deleteById
}
