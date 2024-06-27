//maps in Javascript!




//mini project: create a deck of cards and implement them into a map!

const suits = ["diamonds", "hearts", "spades", "clubs"]
const names = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const cards = new Map();

let cardValue;
let keyVals = 1;

// write func to determine how many decks will be combined

const numDecks = 2;

for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < names.length; j++)
            {
                if (names[j] == "J" || names[j] == "Q" || names[j] == "K" || names[j] == "A") cardValue = 10
                else cardValue = parseInt(names[j]);
                cards.set(keyVals, { name: `${names[j]} of ${suits[i]}`, value: cardValue, quantity: numDecks});
                keyVals++;
            }
    }
    
let drawRandomCard = (mapSize) => Math.round(Math.random() * mapSize);

let playerHand = 
    {
        cards: [],
        value: 0,
        count: 0
    }
    

//write a func to calculate player hand value

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
                randCard.quantity--;
                //delete cards from map
                
                if (randCard.quantity == 0) cards.delete(randNum);
                i++;
            }
    }
    

   //test new map structure

 

   
    
    draw(playerHand,3);
    console.log(`map-size: ${cards.size}`);
    console.log(playerHand);
    //deleteHand(playerHand);
    draw(playerHand,2);
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

