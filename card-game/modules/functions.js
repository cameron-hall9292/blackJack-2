
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


const createHandMap = (player, label) => 
    {
       const handTemplate = 
        {
            hand: new Map(),
            count: 0,
            valueArray: [],
            deleteHand: function(key)
                {

                    this.valueArray.push(this.calcHandValue(key));
                    this.hand.delete(key);
                },
         
            calcHandValue: function(key)
                {
                    let accumulator = 0;
                    this.hand.get(key).forEach((value) => 
                        {
                            accumulator += value.value;
                        });
                    return accumulator;
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
                
                checkDoubleDown: function (key)
                    {
                        const doubleDownVals = [9, 10, 11]
                        if (doubleDownVals.includes(this.calcHandValue(key)) && this.hand.get(key).length == 2) return true
                        else return false;
                    },

                split: function (key, deck, deckSize)
                    {
                        if (this.checkIfSplittable(key))
                            {
                                const hand1 = uuidv4();
                                const hand2 = uuidv4();

                                this.hand.set(hand1, [this.hand.get(key)[0]]);
                                this.hand.set(hand2, [this.hand.get(key)[1]]);

                                this.draw(1, hand1, deck, deckSize);
                                this.draw(1, hand2, deck, deckSize);
                            }
                        else 
                            {
                                console.log("cannot split hand");
                                return;
                            }

                    }

        };

        player[label] = handTemplate;
    }



    module.exports = 
        {
            drawRandomCard: drawRandomCard,
            newDeck: newDeck,
            createHandMap: createHandMap,
           
        };