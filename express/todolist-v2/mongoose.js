const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: [true, "please enter a todo task"],
  },
  path: {
    type: String,
  },
  checked: Boolean,
});

let Todo = mongoose.model("Todo", todoSchema);

async function addToList(newTodo, path) {
  let todo = new Todo({ todo: newTodo, checked: false, path: path });
  await todo.save().then(() => console.log("new todo entry added"));
}

async function getAllTodoFromList(path) {
  return await Todo.find({ path: path }).then((d) => {
    return d;
  });
}

async function deleteTodoFromList(id) {
  return await Todo.findByIdAndDelete(id).then((d) => {
    console.log(id + " object deleted");
  });
}
async function changeCheckState(id) {
  await Todo.findById(id).then(async (todo) => {
    await Todo.findByIdAndUpdate(id, { checked: !todo.checked });
  });
}

function print() {
  console.log("hello");
}

module.exports = {
  print,
  addToList,
  getAllTodoFromList,
  deleteTodoFromList,
  changeCheckState,
};
