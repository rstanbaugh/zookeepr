const fs = require('fs');
const path = require('path');

// function to validate the animal fields
function validateAnimal(animal){
  console.log(animal);
  if(!animal.name || typeof animal.name !== 'string'){
    return false;
  }
  if(!animal.species || typeof animal.species !== 'string'){
    return false;
  }
  if(!animal.diet || typeof animal.diet !== 'string'){
    return false;
  }
  if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
    return false;
  }
  return true;
}

// function to create new animals from teh POST listener
function  createNewAnimal(body, animalsArray){
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, '../data/animals.json'),
    JSON.stringify({animals: animalsArray}, null, 2)
  );

  return body;
}

// filter reaults by query
function filterByQuery(query, animalsArray) { 
  let personalityTraitsArray = [];

  // note that we will save the animalsArray as filteredResults here
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // save personalityTraits to a dedicated array
    // if personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }

    // loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
    // check the trait against each animal in the filteredResults array
    // remember, it is initially a copy of teh animalsArray
    // but here we're updating it for each trait in teh .forEch() loop
    // For each trait being targetd by the filter, the filteredResuls
    // array will then contain only the entries that contain the traits
    // so at the end, we'll have an array of animals that have every one
    // of the traits whe the .forEach() loop is finished
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

function findById(id, animalsArray){
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}


module.exports = {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
}