

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



const player = {}; 
const dealer = {};

//test new map structure

newDeck(suits,names,cards,cardValue, numDecks, keyVals);
    
 

//let's simulate splitting a hand


createHandMap(player, cardMap);

//create card map for dealer

createHandMap(dealer, cardMap);

const playerObj = player[cardMap];
const dealerObj = dealer[cardMap];

const playerCardMap = playerObj.hand;
const dealerCardMap = dealerObj.hand;

playerCardMap.set(uuidv4(), []);
dealerCardMap.set(uuidv4(), []);

const goToFirstHand = (player) => 
    {
        return player.keys().next().value;
    }



//simulate hand splitting

const splitHand = (hand) => 
    {
        //create 2 new hands
        // playerCardMap.set(uuidv4(), []);
        // playerCardMap.set(uuidv4(), []);

        const hand2 = uuidv4();
        const hand3 = uuidv4();

        //move each card from first hand into the two newly created hands

        playerCardMap.set(hand2, [playerCardMap.get(hand)[0]]);
        playerCardMap.set(hand3, [playerCardMap.get(hand)[1]]);


        //draw 2 cards into each new hand 
        draw(player, hand2, 1, cards, maxCardNum, numDecks, cardMap);
        draw(player, hand3, 1, cards, maxCardNum, numDecks, cardMap);

    }



console.log(playerObj.draw(2, goToFirstHand(playerCardMap), cards, cards.size));

//splitHand(playerCardMap.keys().next().value);
 console.log(playerObj.calcHandValue(goToFirstHand(playerCardMap)))


console.log(playerObj.checkIfSplittable(goToFirstHand(playerCardMap)));
console.log(playerObj.checkDoubleDown(goToFirstHand(playerCardMap)));
//playerObj.deleteHand(goToFirstHand(playerCardMap))
playerObj.split(goToFirstHand(playerCardMap), cards, cards.size);
console.log(player)
console.log(playerCardMap.entries())

 console.log("---------------------dealer logic is below--------------------")
// console.log(playerCardMap.keys().next().value)

console.log(dealer);
//console.log(dealerCardMap.entries())
