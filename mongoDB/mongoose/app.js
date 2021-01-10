const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/*
	first example to make a entry with mongoose
*/
async function runFruits() {
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "say my name, say my name"],
    },
    // validation input
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    review: String,
  });
  const Fruit = mongoose.model("Fruit", fruitSchema);
  const fruit = new Fruit({
    name: "anana",
    rating: 1,
    review: "anana or not anana, that is the question",
  });
  // Save
  await fruit
    .save()
    .then(() => console.log("apple added"))
    .catch((err) => console.log(err));
  await Fruit.find({ name: "anana" }).then((d) => console.log(d));
  // Update
  await Fruit.updateOne({ name: "anana" }, { name: "banana" }).then(() =>
    console.log("updated")
  );
  await Fruit.find().then((d) => console.log(d));
  // Delete
  await Fruit.deleteMany({ name: "banana" }).then(() => console.log("deleted"));
  await Fruit.find().then((d) => console.log(d));
}

/*
 	second example to make a entry with mongoose
*/

async function runCat() {
  const Cat = mongoose.model("Cat", { name: String });
  const kitty = new Cat({ name: "autre", toto: "toto" });
  await kitty.save().then(() => console.log("meow"));
  await Cat.find().then((data) => console.log(data));
}

/*
	example of relationship entry
*/

async function runGame() {
  const gameSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "please enter a name"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  });
  const personSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "enter a name"],
    },
    age: {
      type: Number,
      required: [true, "please give a age"],
    },
    // this is how you specify a relationship with another table
    game: gameSchema,
  });

  const Game = mongoose.model("Game", gameSchema);
  const game = new Game({ name: "Doom", rating: 5 });
  await game.save().then(() => console.log("game is saved"));
  await Game.find().then((d) => console.log(d));

  const Person = mongoose.model("Person", personSchema);
  // here the game make reference to the entry above in the database game.
  const person = new Person({ name: "tom", age: 20, game: game });
  await person.save().then(() => console.log("person have been saved"));
  await Person.find().then((d) => console.log(d));
}

async function run() {
  await runCat();
  await runFruits();
  await runGame();
  mongoose.connection.close();
}

run();
