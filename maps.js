//maps in Javascript!




//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;


let keyVals = 1;

for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < names.length; j++)
            {
                if (names[j] == "J" || names[j] == "Q" || names[j] == "K" || names[j] == "A") cardValue = 10
                else cardValue = parseInt(names[j]);
                //cards.set(`${names[j]} of ${suits[i]}`, cardValue)
                cards.set(keyVals, { name: `${names[j]} of ${suits[i]}`, value: cardValue, quantity: 1});
                keyVals++;
            }
    }
    
    console.log(cards.entries())
    //create an array of keys so we can shuffle them

const cardKeys = [...cards.keys()]
//console.log(cardKeys);
let drawRandomCard = (mapSize) => Math.round(Math.random() * mapSize);

let playerHand = 
    {
        cards: [],
        value: 0,
        count: 0
    }
    

//write a func to calculate player hand value

const calcValueOfHand = (hand) => 
    {
        hand.value = 0;
        for (let i = 0; i < hand.cards.length; i++)
            {
               
                hand.value += hand.cards[i].value;
            }

        return 
    }

const deleteCards = (hand) => 
    {
        let i = 0;
        while (i < hand.cards.length)
            {
               
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
        let i = 0; 
        while (i < numCards)
            {
                let randNum = drawRandomCard(cards.size);
                if (!cards.has(randNum)) continue;
                let randCard = cards.get(randNum);
                hand.cards.push(randCard);
                hand.count++;
                hand.value += randCard.value;
                //delete cards from map
                cards.delete(randNum);
                i++;
            }
    }
    

   //test new map structure

 

    
    console.log(`map-size: ${cards.size}`);
    draw(playerHand,2);
    console.log(playerHand);
    console.log(`map-size: ${cards.size}`);
    
    draw(playerHand,3);
    console.log(`map-size: ${cards.size}`);
    deleteHand(playerHand);
    draw(playerHand,10);
    console.log(`map-size: ${cards.size}`);
    console.log(playerHand);
    //test random card func
    const generateRandNums = (testNum) => 
    {
    
    for (let i = 0, j = 0; i < cards.size; i++)
        {
            j = drawRandomCard(52);
            if ( j == testNum) 
                {
                    console.log("loop broken")
                    console.log(`value of j: ${j}`);
                    break;
                }
            
        console.log(`value of j: ${j}`);
           
        }
    };

    //generateRandNums(0);

