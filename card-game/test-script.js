

const { v4: uuidv4 } = require('uuid');
const { create } = require("domain");
const { newDeck, drawRandomCard, deleteHand, draw, createHandMap, calcHandValue } = require("./modules/functions.js")
const prompt = require('prompt-sync')({sigint: true});

//maps in Javascript!
//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;
let keyVals = 1;
let numDecks = 2000;
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




let gamePrompt = null;


playerObj.draw(2, goToFirstHand(playerCardMap), cards, cards.size);
dealerObj.draw(2, goToFirstHand(dealerCardMap), cards, cards.size);

const reset = () => 
{
        dealerObj.deleteHand(goToFirstHand(dealerCardMap), cards, cards.size);
        dealerObj.resetHand(goToFirstHand(dealerCardMap), cards, cards.size);
        dealerObj.clearValueArr();
        playerObj.resetHand(goToFirstHand(playerCardMap), cards, cards.size);
        playerObj.clearValueArr();
        
};

const compareHands = (player, dealer) => 
{
    if (player == dealer)
    {
        console.log("tie");
    }
    else if (player > 21)
    {
        console.log("dealer wins");
    }
    else if (dealer > 21)
    {
        console.log("you wins");
    }
    else if (player > dealer)
    {
        console.log("you win");
    }
    else if (player < dealer)
    {
        console.log("dealer wins");
    }
}
while (gamePrompt != "quit")
    {
        console.log("Dealer: ");
        dealerObj.printHand(goToFirstHand(dealerCardMap), false)
        console.log("You: ")
        playerObj.printHand(goToFirstHand(playerCardMap))

        gamePrompt = prompt("press h to hit, s to stand, sp to split: ");
       
        if (gamePrompt == "h") 
            {
                playerObj.hit(goToFirstHand(playerCardMap), cards, cards.size);
            
            };
        if (gamePrompt == "sp")
        {
            playerObj.split(goToFirstHand(playerCardMap), cards, cards.size);
        };
        
        if (gamePrompt == "s")
        {
            if (playerCardMap.size > 0)
            {
                playerObj.deleteHand(goToFirstHand(playerCardMap));
            }
            if (playerCardMap.size === 0)
            {
            
            dealerObj.dealerPlays(goToFirstHand(dealerCardMap), cards, cards.size);

            dealerObj.printHand(goToFirstHand(dealerCardMap));

            playerObj.valueArray.forEach((value) => {
                compareHands(value, dealerObj.calcHandValue(goToFirstHand(dealerCardMap)));
            });

           

            reset();
            }
        }
    }

 console.log("---------------------dealer logic is below--------------------")
// console.log(playerCardMap.keys().next().value)

//console.log(dealer);
//console.log(dealerCardMap.entries())
