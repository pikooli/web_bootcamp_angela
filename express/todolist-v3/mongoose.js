const mongoose = require("mongoose");
let url =
  "mongodb+srv://admin-pikl:Test123@todolist.q30kh.mongodb.net/todolistDB";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: [true, "please enter a todo task"],
  },
  checked: Boolean,
});

let listSchema = mongoose.Schema({
  list: {
    type: String,
  },
  todo: [todoSchema],
});

let Todo = mongoose.model("Todo", todoSchema);
let List = mongoose.model("List", listSchema);

async function addToList(newTodo, path) {
  let todo = new Todo({ todo: newTodo, checked: false });
  await todo.save().then(async () => {
    await List.findOne({ list: path }).then((data) => {
      data.todo.push(todo);
      data.save();
    });
  });
}

async function getAllTodoFromList(path) {
  return await List.findOne({ list: path }).then(async (d) => {
    if (d) return d.todo;
    let list = new List({ list: path, todo: [] });
    await list.save();
    return null;
  });
}

async function deleteTodoFromList(id, path) {
  await List.findOneAndUpdate({ list: path }, { $pull: { todo: { _id: id } } });
  return await Todo.findByIdAndDelete(id).then((d) => {});
}

async function changeCheckState(id, path) {
  await Todo.findById(id).then(async (todo) => {
    await Todo.findByIdAndUpdate(id, { checked: !todo.checked });
    await List.findOneAndUpdate(
      { list: path, "todo._id": id },
      { $set: { "todo.$.checked": !todo.checked } }
    );
  });
}

module.exports = {
  addToList,
  getAllTodoFromList,
  deleteTodoFromList,
  changeCheckState,
};
