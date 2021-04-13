const express = require("express");
const app = express();

const myfavoritesweets = [
  {
    id: 1,
    name: "kola",
    origin: "New Zealand",
    inventor: "Helen Leach",
  },
  {
    id: 2,
    name: "Creme brulee",
    origin: "New Zealand",
    inventor: "Helen Leach",
  },
];

app.use(express.json());

// Visar alla sweets!
app.get("/api/favoritesweets", (req, res) => {
  res.send(myfavoritesweets);
});

// Hittar sweet by ID
app.get("/api/favoritesweets/:id", (req, res) => {
  const sweet = myfavoritesweets.find((c) => c.id === parseInt(req.params.id));
  if (!sweet) res.status(404).send("This sweet does not exist!");
  res.send(sweet);
});

app.get("/api", (req, res) => {
  res.json(myfavoritesweets);
});

//Lägger till ny sweet
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
    // res.json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }
  // Delete
  const index = myfavoritesweets.indexOf(deletedProduct);
  myfavoritesweets.splice(index, 1);

  // Returns the deleted product
  res.status(200).json({"You have deleted this sweet" : deletedProduct});
});

//Uppdaterar sötsak
app.put("/api/favoritesweets/:id", (req, res) => {
  let updateSweet = myfavoritesweets.findIndex((sweet) => {
    return sweet.id == req.params.id;
  });

  updateSweet = {
    id: req.body.id,
    name: req.body.name,
    origin: req.body.origin,
    inventor: req.body.inventor,
  };

  const id = req.params.id;
  const deletedProduct = myfavoritesweets.find((sweet) => {
    return sweet.id == id;
  });
  if (!deletedProduct) {
    res.json({ error: `Det finns ingen produkt med id: ${id}` });
    return;
  }

  let index = myfavoritesweets.findIndex((sweet) => {
    return sweet.id == req.params.id;
  });

  myfavoritesweets[index] = updateSweet;
  return res.status(200).send(myfavoritesweets);
});

const port = process.env.PORT || 3000;

//lyssnar på servern
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});