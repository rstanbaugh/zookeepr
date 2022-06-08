const express = require('express');

const PORT = 3001;
const app = express();

const {animals} = require('./data/animals');


// filter reaults by query
function filterByQuery(query, animalsArray){
  let personalityTraisArray = [];

  // note that we will save the animalsArray as filteredResults here
  let filteredResults = animalsArray;
  if(query.personalityTraits){
    // save personalityTraits to a dedicated array
    // if personalityTraits is a string, place it into a new array and save
    if(typeof query.personalityTraits === 'string'){
      personalityTraisArray = [query.personalityTraits];
    } else {
      personalityTraisArray = query.personalityTraits;
    }
  }
  // loop through each trait in the personalityTraits array:
  personalityTraisArray.forEach(trait => {
    // check the trait against each animal in the filteredResults array
    // remember, it is initially a copy of teh animalsArray
    // but here we're updating it for each trait in teh .forEch() loop
    // For each trait being targetd by the filter, the filteredResuls
    // array will then contain only the entries that contain the traits
    // so at the end, we'll have an array of animals that have every one
    // of the traits whe the .forEach() loop is finished
    filteredResults = filteredResults.filter(
      animal => animal.personalityTraits.indexOf(trait) != -1
    )
  });
  if(query.diet){
    filteredResults = filteredResults.filter(animal => animal.diet ==query.diet);
  }
  if(query.species){
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if(query.name){
    filteredResults = filteredResults.filter(animal => animal.name === query.name)
  }
  return filteredResults;
};


// route listener
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query){
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//  start the express server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`)
});