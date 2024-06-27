

const { create } = require("domain");
const { newDeck, drawRandomCard, deleteHand, draw, createNewHand } = require("./modules/functions.js")

//maps in Javascript!
//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;
let keyVals = 1;
let numDecks = 1;

const player = 
    {
        1: 
            {
                cards: [],
                value: 0,
                count: 0,
                hasAce: false,
                pair: false,
                bust: false,
            },
        split: false,
        insurance: false,
        doubledown: false,

    }


const dealer =  
    {
        1: 
            {
                cards: [],
                value: 0,
                count: 0,
                hasAce: false,
                pair: false,
                bust: false,
            },
        split: false,
        insurance: false,
        doubledown: false,
    }



   //test new map structure

 
    newDeck(suits,names,cards,cardValue, numDecks, keyVals);
    
    draw(player[1], 2, cards);
    console.log(`map-size: ${cards.size}`);
    createNewHand(player, 2);
    createNewHand(player, 3);

    console.log(player);
  
    
 
 