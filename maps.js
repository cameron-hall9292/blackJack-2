//maps in Javascript!




//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;

for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < names.length; j++)
            {
                if (names[j] == "J" || names[j] == "Q" || names[j] == "K" || names[j] == "A") cardValue = 10
                else cardValue = parseInt(names[j]);
                cards.set(`${names[j]} of ${suits[i]}`, cardValue)
            }
    }
    
    console.log(cards.entries())
    //create an array of keys so we can shuffle them

const cardKeys = [...cards.keys()]
//console.log(cardKeys);
let drawRandomCard = () => Math.floor(Math.random() * cards.size);

let playerHand = 
    {
        cards: [],
        value: 0,
        count: 0
    }
    

//write a func to calculate player hand value

const calcValueOfHand = (hand) => 
    {
        for (let i = 0; i < hand.cards.length; i++)
            {
                if (!cards.has(hand.cards[i])) continue;
               
                hand.value += cards.get(hand.cards[i]);
            }
    }

const deleteCards = (hand) => 
    {
        let i = 0;
        calcValueOfHand(hand);
        while (i < hand.cards.length)
            {
               
                console.log(hand.cards[i])
                cards.delete(hand.cards[i]);
                i++;
            }
    }

const deleteHand = (hand) => 
    {
        hand.cards.splice(0, hand.cards.length);
        //reset hand value to 0;
        hand.value = 0;  
        hand.count = 0;
        hand = {};
    }

const draw = (hand,numCards) => 
    {
        let i = 0; let keys = [...cards.keys()];
        while (i < numCards)
            {
                hand.cards.push(keys[i]);
                hand.count++;
                i++;
            }
        deleteCards(hand);
    }

    console.log(`map-size: ${cards.size}`);
    draw(playerHand,2);
    console.log(`map-size: ${cards.size}`);
    
    draw(playerHand,3);
    console.log(`map-size: ${cards.size}`);
    deleteHand(playerHand);
    draw(playerHand,10);
    console.log(`map-size: ${cards.size}`);
    console.log(playerHand);
    console.log(`hand-value: ${playerHand.value}`);

