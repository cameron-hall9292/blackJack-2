

const { newDeck, drawRandomCard, deleteHand, draw } = require("./modules/functions.js")

//maps in Javascript!
//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;
let keyVals = 1;
let numDecks = 1;

// write func to determine how many decks will be combined

let playerHand = 
    {
        cards: [],
        value: 0,
        count: 0
    }

let dealerHand = 
    {
        cards: [],
        value: 0,
        count: 0,
    }

   //test new map structure

 
    newDeck(suits,names,cards,cardValue, numDecks, keyVals);
    
    draw(playerHand, 3, cards);
    deleteHand(playerHand)
    draw(playerHand, 3, cards);
    console.log(`map-size: ${cards.size}`);
    console.log(playerHand);
    draw(dealerHand, 4, cards);
    console.log(dealerHand);
    console.log(cards.size);
    
 
 