const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

const router = require('express').Router();

// animal api routes
router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query){
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if(result){
    res.json(result);
  } else {
    req.setEncoding(404);
  }
});

router.post('/animals', (req, res) => {
  // set an id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // validate animal
  if(!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted');
  } else {
    // add animal to json file and animals array
    const animal = createNewAnimal(req.body, animals);
    res.json(req.body);
  }

});

module.exports = router;