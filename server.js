const express = require("express");
const app = express();

const myfavoritesweets = [
  {
    id: 1,
    name: "Gelato",
    origin: "Italy",
    inventor: "Bernando Buontalenti",
  },
  {
    id: 2,
    name: "Creme brulèe",
    origin: "France",
    inventor: "Francois Massialot",
  },
  {
    id: 3,
    name: "Pavlova",
    origin: "New Zealand",
    inventor: "Helen Leach",
  },
];

app.use(express.json());

// Shows all sweets!
app.get("/api/favoritesweets", (req, res) => {
  res.send(myfavoritesweets);
});

// Can't find sweet by ID
app.get("/api/favoritesweets/:id", (req, res) => {
  const sweet = myfavoritesweets.find((c) => c.id === parseInt(req.params.id));
  if (!sweet) res.status(404).send("This sweet does not exist!");
  res.send(sweet);
});

app.get("/api", (req, res) => {
  res.json(myfavoritesweets);
});

//Adds a new sweet
app.post("/api/favoritesweets/", (req, res) => {
  if (!req.body.name) {
    res.status(404).send("Please add a name!");
    return;
  }

  let titleToSave = req.body.name;
  let originToSave = req.body.origin;
  let inventorToSave = req.body.inventor;

  let idToSave = 0;
  myfavoritesweets.forEach((sweet) => {
    if (sweet.id > idToSave) {
      idToSave = sweet.id;
    }
  });

  idToSave++;

  myfavoritesweets.push({
    id: idToSave,
    name: titleToSave,
    origin: originToSave,
    inventor: inventorToSave,
  });

  res.status(200).send("You added a new sweet!");
});

app.delete("/api/favoritesweets/:id", (req, res) => {
  const id = req.params.id;
  const deletedProduct = myfavoritesweets.find((sweet) => {
    return sweet.id == id;
  });
  if (!deletedProduct) {
    res.status(404).json(`There's no product with id: ${id}!`);
    return;
  }
  // Delete
  const index = myfavoritesweets.indexOf(deletedProduct);
  myfavoritesweets.splice(index, 1);

  // Returns the deleted product
  res.status(200).json({ "You have deleted this sweet": deletedProduct });
});

app.put("/api/favoritesweets/:id", (req, res) => {
  const id = req.params.id;
  const foundSweet = myfavoritesweets.find((sweet) => {
    return sweet.id == id; 
  });

  if (foundSweet) {

    foundSweet.name = req.body.name;

    foundSweet.origin = req.body.origin;

    foundSweet.inventor = req.body.inventor;

    res.status(201).json(foundSweet);

  } else if (!foundSweet) {
    res.status(404).json("This id does not exist!");
  }
});

const port = process.env.PORT || 3000;

//Listens to the server
app.listen(port, () => {
console.log(`listening to port ${port}`);
});