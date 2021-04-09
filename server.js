const express = require('express');
const app = express();

app.use(express.json());

const myfavoritesweets = [
   {
       id: 1,
       name: "Pavlova", 
       origin: "New Zealand",
       inventor: "Helen Leach"

   },
   {
       id: 2,
       name: "Crème Brûlée",
       origin: "France",
       inventor: "François Massialot"
   },
   {
       id: 3,
       name: "Gelato",
       origin: "Italy",
       inventor: "Bernando Buontalenti "
   }
]

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/favoritesweets', (req, res) => {
    res.send(myfavoritesweets);
});

app.get('/api/favoritesweets/:id', (req, res) => {
    const sweet = myfavoritesweets.find(c => c.id === parseInt(req.params.id));
    if(!sweet) res.status(404).send('The sweet does not exist!');
    res.send(sweet);
});

app.post('/api/favoritesweets', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is req and should be min 3 characters');
        return;
    }

    const sweet = {
        id: myfavoritesweets.lenght + 1,
        name: req.body.name
    };
    myfavoritesweets.push(sweet);
    res.send(sweet);
});

//Lägga till ny sweet
// app.put('api/courses/:id', (req, res) => {
//     const sweet = myfavoritesweets.find(c => c.id === parseInt(req.params.id));
//     if(!sweet) res.status(404).send('The sweet does not exist!');

//     if (!req.body.name || req.body.name.length < 3) {
//         res.status(400).send('Name is req and should be min 3 characters');
//         return;
//     }

//     sweet.name = req.body.name;
//     res.send(sweet);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
