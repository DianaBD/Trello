const { Cards } = require('../data')
const { Lists } = require('../data')

const add = async (title, description, listId) => {
  const card = new Cards({
    title,
    description
  });
  try {
    console.log(title)
    await card.save();
    var list = await Lists.findOne({_id: listId})
    console.log(list.cards)

    var updated_cards = [...list.cards, card._id]
    list.cards = updated_cards
    await Lists.findByIdAndUpdate(listId, list);
  } catch (err) {
    console.log(err)
  }
}

const updateById = async (id, title, description, listId) => {
  try {
    await Cards.findByIdAndUpdate(id, {title, description, listId});
  } catch (err) {
    console.log(err)
  }
}

const getAll = async () => {
  try {
    return await Cards.find();
  } catch (err) {
    console.log(err)
  }
}

const deleteAll = async () => {
  try {
    await Cards.deleteMany();
  } catch (err) {
    console.log(err)
  }
}

const deleteById = async (id) => {
  try {
    var list = await Lists.findOne({ cards: id })
    var new_cards = list.cards.filter( e => {return e._id != id})
    list.cards = new_cards
    await Lists.findByIdAndUpdate(list._id, list)
    await Cards.deleteOne({_id : id });
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
