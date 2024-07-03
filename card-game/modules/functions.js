
let assert = require("assert");

const { v4: uuidv4 } = require('uuid');

const newDeck = (suits, names, cards, cardValue, numDecks, keyVals) => 
    {
        cards.clear();

        for (let i = 0; i < suits.length; i++)
             {
                    for (let j = 0; j < names.length; j++)
                        {
                            if (names[j] == "J" || names[j] == "Q" || names[j] == "K") cardValue = 10
                            else if (names[j] == "A") cardValue = 11
                            else cardValue = parseInt(names[j]);
                            cards.set(keyVals, { name: `${names[j]} of ${suits[i]}`, id: names[j], suit: suits[i], value: cardValue, quantity: numDecks});
                            keyVals++;
                        }
                }
     }


let drawRandomCard = (mapSize) => Math.round(Math.random() * mapSize);



const draw = (player, hand, numCards, map, maxCardNum, numDecks,cardMap) => 
    {
        let i = 0; 
        //log error when number of cards drawn exceeds number of cards in the deck
         assert(numCards <= map.size * numDecks, `You requested ${numCards} cards to be drawn and there are only ${map.size * numDecks} cards in the deck.`);
       
        try 

        {
          let drawArr = [];
          while (i < numCards)
                {

                    let randNum = drawRandomCard(maxCardNum);
                    if (!map.has(randNum)) continue;
                    let randCard = map.get(randNum);
                   // cardMap.cards.push(randCard);
                    drawArr.push(randCard);
                    hand.value += randCard.value;
                    randCard.quantity--;
                    //delete cards from map
                    if (randCard.quantity == 0) map.delete(randNum);
                    i++;
                }
        //add drawn cards to player hand map
        //player.hand.clear();
        player[cardMap].hand.set(hand, [...player[cardMap].hand.get(hand), ...drawArr]);
        player[cardMap].count = player[cardMap].hand.size;
        }catch(error)
        {
            console.error(error);
        }
    }


const createHandMap = (player, label) => 
    {
       const handTemplate = 
        {
            hand: new Map(),
            count: 0,
            valueArray: [],
            deleteHand: function(key)
                {
                    this.hand.delete(key);
                },
         
            calcHandValue: function(key)
                {
                    let accumulator = 0;
                    this.hand.get(key).forEach((value) => 
                        {
                            accumulator += value.value;
                        });
                    
                    this.valueArray.push(accumulator);
                },
            
            checkIfSplittable: function(key)
                {
                    if (this.hand.get(key)[0].id == this.hand.get(key)[1].id && this.hand.get(key).length == 2) return true
                    else return false;
                },
            
            
            draw: function(numCards, hand, deck, deckSize)
                {
                    if (numCards > deckSize)
                        {
                            console.log("not enough cards in the deck");
                            return;
                        } 
                    let drawArr = [];
                    const numUniqueCards = 52;
                    let i = 0;
                    while (i < numCards)
                        {
                            
                            let randNum = Math.round(Math.random() * numUniqueCards);
                            if (!deck.has(randNum)) continue;
                            let randCard = deck.get(randNum);
                            drawArr.push(randCard);
                            randCard.quantity--;
                            //delete cards from map
                            if (randCard.quantity == 0) deck.delete(randNum);
                            console.log(`deck.size: ${deck.size}`)
                            i++;

                        }
                    this.hand.set(hand, [...this.hand.get(hand), ...drawArr]);
                    this.count = this.hand.size;
                },

        };

        player[label] = handTemplate;
    }

const split = () => 
    {
        //first step will be to create a new hand and move one card from previous hand into it.
    }
//console.log(uuidv4())
    module.exports = 
        {
            drawRandomCard: drawRandomCard,
            draw:draw,
            newDeck: newDeck,
            createHandMap: createHandMap,
           
        };