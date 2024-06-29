

const { v4: uuidv4 } = require('uuid');
const { create } = require("domain");
const { newDeck, drawRandomCard, deleteHand, draw, createNewHand, calcHandValue } = require("./modules/functions.js")

//maps in Javascript!
//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;
let keyVals = 1;
let numDecks = 1;
const maxCardNum = 52;
const cardMap = uuidv4();
const hand1 = uuidv4();
const hand2 = uuidv4();
const hand3 = uuidv4();

const player = {}; 
const dealer = {};

//test new map structure

newDeck(suits,names,cards,cardValue, numDecks, keyVals);
    
 
console.log(`map-size: ${cards.size}`);
 
//let's simulate splitting a hand


createNewHand(player, cardMap);
player[cardMap].hand.set(hand1, []);
player[cardMap].hand.set(hand2, []);


draw(player, hand1, 2, cards, maxCardNum, numDecks, cardMap);
draw(player, hand2, 1, cards, maxCardNum, numDecks, cardMap);
draw(player, hand1, 2, cards, maxCardNum, numDecks, cardMap);


calcHandValue(player,player[cardMap].hand.get(hand1), cardMap, hand1);
calcHandValue(player,player[cardMap].hand.get(hand2), cardMap, hand2);
console.log(player);
//console.log(player[cardMap].hand.entries())
//console.log(player[cardMap].hand.get(hand1))
//console.log(player[cardMap].hand.get(hand2))

