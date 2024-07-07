

const { v4: uuidv4 } = require('uuid');
const { create } = require("domain");
const { newDeck, drawRandomCard, deleteHand, draw, createHandMap, calcHandValue, deckLength } = require("./modules/functions.js")
const prompt = require('prompt-sync')({sigint: true});

//maps in Javascript!
//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;
let keyVals = 1;
let numDecks = 2;
const maxCardNum = 52;
const cardMap = uuidv4();



const player = {}; 
const dealer = {};

//test new map structure

newDeck(suits,names,cards,cardValue, numDecks, keyVals);
    
const shuffleSize = cards.size * numDecks * 0.5;

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


//playerObj.draw(2, goToFirstHand(playerCardMap), cards, cards.size);
//dealerObj.draw(2, goToFirstHand(dealerCardMap), cards, cards.size);

playerObj.testDraw(2, goToFirstHand(playerCardMap), cards, cards.size, 13, 13);
dealerObj.testDraw(2, goToFirstHand(dealerCardMap), cards, cards.size, 13, 13);

const reset = () => 
{
        dealerObj.deleteHand(goToFirstHand(dealerCardMap));
        dealerObj.resetHand(cards, cards.size);
        dealerObj.clearValueArr();
        playerObj.resetHand(cards, cards.size);
        playerObj.clearValueArr();
        playerObj.playerReset();
        dealerObj.playerReset();
        
};

const compareHands = (player, dealer, money, bet) => 
{
    if (player == dealer)
    {
        console.log("tie");
    }
    else if (player > 21)
    {
        console.log("dealer wins");
        money -= bet;
    }
    else if (dealer > 21)
    {
        console.log("you wins");
        money += bet;
    }
    else if (player > dealer)
    {
        console.log("you win");
        money += bet;
    }
    else if (player < dealer)
    {
        console.log("dealer wins");
        money -= bet;
    }
    //console.log(`money: ${money}`);
    return money;
};

const shuffle = () => 
{

    if (deckLength(cards) <= shuffleSize)
    {
        
        newDeck(suits,names,cards,cardValue, numDecks, keyVals);
        console.log("deck has been shuffled");
        console.log(`${deckLength(cards)} cards in the deck`)
    }
    else 
    {

        console.log(`${deckLength(cards)} cards in the deck`)
        return;
    }
}
let min = 10;
let max = 5000;
let buyIn = null;
let money = null;
while(buyIn == null)
{
        buyIn = prompt(`Enter a number between ${min} and ${max}: `);
        money = Number(buyIn);
        if (!money)
        {
            console.log("not a valid buyin amount. try again. ");
            buyIn = null;
        }
        else if (money < min || money > max)
        {
            console.log("buyin is outside of range. try again. ")
            buyIn = null;
        }
        
};

let bet = null;

const stand = (modifiedBet) =>
{
    if (playerCardMap.size > 0)
            {
                playerObj.deleteHand(goToFirstHand(playerCardMap), modifiedBet);
            }
            if (playerCardMap.size === 0)
            {
                //stop dealer from playing hand if player has already busted
            if (playerObj.valueArray.some((handValue) => handValue <= 21))
            {
                dealerObj.dealerPlays(goToFirstHand(dealerCardMap), cards, cards.size);
                console.log("---dealer has played their hand---")
            }

            dealerObj.printHand(goToFirstHand(dealerCardMap));

            playerObj.valueArray.forEach((value, index) => {
                money = compareHands(value, dealerObj.calcHandValue(goToFirstHand(dealerCardMap)), money, playerObj.betArray[index]);
            });

           

            reset();
            bet = null;
            }
}

while (gamePrompt != "quit")
    {
        if (money === 0)
        {
            console.log("you are out of cash. gameover ");
            gamePrompt = "quit";
            continue;
        }
        
        console.log(`Your cash: ${money}`);
        while (bet == null)
        {
           
            bet = prompt("place a bet: ")
            bet = Number(bet);
            if (!bet)
            {
                console.log("Not a valid bet. Try again.")
                bet = null;
            }
           else if (bet > money) 
            {
                console.log("Not enough cash. Place a smaller bet");
                bet = null;
            }
          
        }
        

        console.log("------New Hand------")
        console.log("Dealer: ");
        if (dealerCardMap.get(goToFirstHand(dealerCardMap))[1].value === 10 && dealerObj.hasInsuranceBet) dealerObj.printHand(goToFirstHand(dealerCardMap), false)
        else dealerObj.printHand(goToFirstHand(dealerCardMap), true)
        console.log("You: ")
        playerObj.printHand(goToFirstHand(playerCardMap))
        console.log("--------------------")
        shuffle();
        gamePrompt = prompt("type h to hit, s to stand, sp to split, i to place insurance bet, d to double down, or quit to end the game: ");
       
        if (gamePrompt == "h") 
            {
                playerObj.hit(goToFirstHand(playerCardMap), cards, cards.size);
                if (playerObj.calcHandValue(goToFirstHand(playerCardMap)) >= 21) 
                    {
                        console.log("You: ");
                        playerObj.printHand(goToFirstHand(playerCardMap));
                        stand(bet);
                    };
            
            };
        if (gamePrompt == "sp")
        {
            playerObj.split(goToFirstHand(playerCardMap), cards, cards.size);
        };
        
        if (gamePrompt == "s")
        {
           stand(bet); 

        }
        
        if (gamePrompt === "i")
        {
            let sideBet = null;
            while (sideBet == null)
            {

            sideBet = prompt(`Enter a side bet of up to half of ${bet}, your original bet: `);
            sideBet = Number(sideBet);
            if (!sideBet)
            {
                console.log("not a valid bet");
                sideBet = null;
            }
            else if (sideBet < 0 || sideBet > 0.5 * bet)
            {
                console.log("your bet is out of range.")
                sideBet = null;
            }
            money = dealerObj.insuranceBet(goToFirstHand(dealerCardMap), money, sideBet);
            //console.log(`your money: ${money}`)
            }

        }

        if (gamePrompt === "d")
        {
            let doubledBet = playerObj.doubleDown(goToFirstHand(playerCardMap), bet, cards, cards.size);
            if (doubledBet) stand(doubledBet);
        }
    }

