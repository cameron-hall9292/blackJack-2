

const { v4: uuidv4 } = require('uuid');
const { create } = require("domain");
const { newDeck, drawRandomCard, deleteHand, draw, createHandMap, calcHandValue } = require("./modules/functions.js")

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


createHandMap(player, cardMap);

const playerCardMap = player[cardMap].hand;

playerCardMap.set(hand1, []);



draw(player, hand1, 2, cards, maxCardNum, numDecks, cardMap);



calcHandValue(player,playerCardMap.get(hand1), cardMap, hand1);

//simulate hand splitting

const splitHand = () => 
    {
        //create 2 new hands
        playerCardMap.set(hand2, []);
        playerCardMap.set(hand3, []);

        //move each card from first hand into the two newly created hands

        playerCardMap.set(hand2, [playerCardMap.get(hand1)[0]]);
        playerCardMap.set(hand3, [playerCardMap.get(hand1)[1]]);


        //draw 2 cards into the 
        draw(player, hand2, 1, cards, maxCardNum, numDecks, cardMap);
        draw(player, hand3, 1, cards, maxCardNum, numDecks, cardMap);

    }

splitHand();



console.log(player);

console.log(playerCardMap.entries());