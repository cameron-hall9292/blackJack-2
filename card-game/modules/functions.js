
let assert = require("assert");

const { v4: uuidv4 } = require('uuid');

const newDeck = (suits, names, cards, cardValue, numDecks, keyVals) => 
    {
        cards.clear();

        for (let i = 0; i < suits.length; i++)
             {
                    for (let j = 0; j < names.length; j++)
                        {
                            if (names[j] == "J" || names[j] == "Q" || names[j] == "K" || names[j] == "A") cardValue = 10
                            else cardValue = parseInt(names[j]);
                            cards.set(keyVals, { name: `${names[j]} of ${suits[i]}`, id: names[j], suit: suits[i], value: cardValue, quantity: numDecks});
                            keyVals++;
                        }
                }
     }


let drawRandomCard = (mapSize) => Math.round(Math.random() * mapSize);

const deleteHand = (player, label) => 
    {
       player[label] = null;
       }

const draw = (player, hand, numCards, map, maxCardNum, numDecks) => 
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
                    hand.cards.push(randCard);
                    drawArr.push(randCard);
                    hand.count++;
                    hand.value += randCard.value;
                    randCard.quantity--;
                    //delete cards from map
                    if (randCard.quantity == 0) map.delete(randNum);
                    i++;
                }
        //add drawn cards to player hand map
       // player.hand.clear();
        player.hand.set(uuidv4(), drawArr);
        }catch(error)
        {
            console.error(error);
        }
    }


const createNewHand = (player, label) => 
    {
       const handTemplate = 
        {
            cards: [],
            value: 0,
            count: 0,
            hasAce: false,
            pair: false,
            bust: false,
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
            deleteHand: deleteHand,
            draw:draw,
            newDeck: newDeck,
            createNewHand: createNewHand,
        };