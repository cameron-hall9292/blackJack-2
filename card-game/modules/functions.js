
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

const deleteHand = (player, cardMap, handID) => 
    {
       //push value of hand into values array

        

        player[cardMap].valueArray.push(player[cardMap][handID]);

        player[cardMap].hand.delete(handID);

    }
    
const calcHandValue = (player, hand, cardMap, handID) => 
    {

        player[cardMap][handID] = 0;

        hand.forEach((card) => 
        {
            player[cardMap][handID] += card.value;
        });
        
       // player[cardMap].valueArray.push(player[cardMap][handID])
    }

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
            valueArray: ["test"],
            calcValue: function() 
                {
                    
                    console.log(`label: ${label}`)
                    this.hand.forEach((key) => 
                    {
                        let accumulator = 0;

                        key.forEach((value) => 
                            {
                                accumulator += value.value;
                                console.log(`value: ${value.value}`)
                                console.log(`accumulator: ${accumulator}`)
                            })
                       
                        //console.log(`valueArray: ${player[label].valueArray}`)
                    });

                       
                }

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
            createHandMap: createHandMap,
            calcHandValue: calcHandValue,
        };