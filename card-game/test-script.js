

const { v4: uuidv4 } = require('uuid');
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
const maxCardNum = 52;

const hand1 = uuidv4();
const hand2 = uuidv4();
const hand3 = uuidv4();

const player = 
    {
      
        hand: new Map(),
        split: false,
        insurance: false,
        doubledown: false,
        numHands: 1,

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
        numHands: 1,
    }



   //test new map structure

 
    newDeck(suits,names,cards,cardValue, numDecks, keyVals);
    
  
 
    console.log(`map-size: ${cards.size}`);
 
    //let's simulate splitting a hand

    createNewHand(player, hand1);
    draw(player, player[hand1], 2, cards, maxCardNum, numDecks);
    draw(player, player[hand1], 1, cards, maxCardNum, numDecks);
  //  createNewHand(player, hand2);
    //createNewHand(player, 3);
    //player[hand2].cards.push(player[1].cards[0]);
    //player[3].cards.push(player[1].cards[1]);
    //draw(player, player[2], 1, cards, maxCardNum, numDecks);
    //draw(player, player[3], 1, cards, maxCardNum, numDecks);
    //player.numHands++;
    console.log(player);
    //console.log(cards.keys().next().value)
    //player.hand.set("2222", {test: "some value"})
   // console.log(player.hand.entries())