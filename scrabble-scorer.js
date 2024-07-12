// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "\n";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   //console.log("Let's play some scrabble! Enter a word:");
   let word=input.question("Let's play some scrabble! Enter a word:");
   console.log(oldScrabbleScorer(word));

};

let newPointStructure=transform(oldPointStructure);

let simpleScorer=function( word){
   word = word.toUpperCase();
   let lettrePoint=0;
   let score=0;
    for(let i =0; i<word.length; i++){
      lettrePoint=1;
      score+=lettrePoint;
    }
    return score;
};

let vowelBonusScorer=function(word){

  let vowels=["A","E","I","O","U","Y"];
  const vowelWorth=3;
  const consonantWorth=1;
   let lettrePoint=0;
   let score=0;

   word = word.toUpperCase();
    for(let i =0; i<word.length; i++){
      lettrePoint=0;
      if(vowels.includes(word[i])){lettrePoint=vowelWorth;}else{lettrePoint=consonantWorth;}
      score+=lettrePoint;
    }
    return score;

};

let scrabbleScorer=function(word){
   let wordOrigin=word; // save the initial form of the word to print it as entred
   //word = word.toUpperCase();
   word = word.toLowerCase(); // test oriented program need to have lower casesin new structure to pass
	let letterPoints = "\n";
   let cummulativePoints=0;
  for(let i=0;i< word.length;i++){
   letterPoints+= `Points for '${word[i]}': ${newPointStructure[ word[i] ]}\n`;
   cummulativePoints+=newPointStructure[ word[i] ];
  }
   //return letterPoints+"\n Comulated point for "+wordOrigin+" is "+String(cummulativePoints);
   return cummulativePoints
};

const scoringAlgorithms = [
   
   {"name":"Simple Score", "description":"Each letter is worth 1 point.1", "scorerFunction":simpleScorer},
   {"name":"Bonus Vowels", "description":"Vowels are 3 pts, consonants are 1 pt. ", "scorerFunction":vowelBonusScorer},
   //{"name":"Scrabble", "description":" The traditional scoring algorithm.", "scorerFunction":oldScrabbleScorer},
    // {"name":"new Scrabble", "description":" cumulative score for the whole word ", "scorerFunction":scrabbleScorer}   
   {"name":"Scrabble", "description":" The traditional scoring algorithm.", "scorerFunction":scrabbleScorer} // to get it passe the test, but it work with the 4 algorithms
 
   
];

function scorerPrompt() {
   let scorer;
   let selectedOption="aaaa";
   let listOfOptions=[];
   let optionsQuestion="Enter ";
    

   // select all indexes posible from scoringAlgorithms, reusable generic for any array or scoringAlgorithms list
   for (let i=0;i<scoringAlgorithms.length-1; i++){
      optionsQuestion +=" "+i+",";
      listOfOptions.push(i);
   }
   // add the last option
   optionsQuestion+=" or "+ String(scoringAlgorithms.length-1)+":";
   listOfOptions.push(scoringAlgorithms.length-1);

   console.log("Which scoring algorithm would you like to use? \n");
   for (let i=0;i<scoringAlgorithms.length; i++){ //show options from scoringAlgorithms array 
      console.log(` ${i} - ${scoringAlgorithms[i].name} : ${scoringAlgorithms[i]['description']}   `);
   }
    
   // repeat untile valid option selected
   while (! (listOfOptions.includes(selectedOption))  ) { 
      selectedOption=Number(input.question(optionsQuestion));
   }

   return scoringAlgorithms[selectedOption];
   
}

function transform(OldpoitStruc) {
   //let newForm={' ':0}; // word can be spelled blank tiles  for the bonus part  but it fails the test 3
    let   newForm={};// to make it pass the test 3
   let setOfLetters=[];
   for(const key in OldpoitStruc){
      setOfLetters=OldpoitStruc[key];
      for(let i=0; i<setOfLetters.length;i++){
         //newForm[setOfLetters[i]]=Number(key) ;  
         newForm[setOfLetters[i].toLowerCase()]=Number(key) ;// to make it pass the test
         //console.log(typeof key);
       
      }
   }

   console.log("--------------------------------------");
   console.log(newForm);
   console.log("--------------------------------------");
   return newForm;
}

function runProgram() {
   
   //initialPrompt();
   console.log("Let's play some scrabble! Enter a word:\n");
   let word=input.question("Enter a word to score: ");

   let scorer=scorerPrompt();

   console.log(`Score for '${word}': ${ scorer.scorerFunction(word)}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
