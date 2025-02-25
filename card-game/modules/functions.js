
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

const deckLength = (deck) => 
{
    let accumulator = 0;

    deck.forEach((card) => 
    {
        accumulator += card.quantity;
    });

    return accumulator;
}

let drawRandomCard = (mapSize) => Math.round(Math.random() * mapSize);


const createHandMap = (player, label) => 
    {
       const handTemplate = 
        {
            hand: new Map(),
            count: 0,
            valueArray: [],
            betArray: [],
            deleteHand: function(key, bet)
                {
                    this.betArray.push(bet);
                    //console.log(`bet array: ${this.betArray}`)
                    this.valueArray.push(this.calcHandValue(key));
                    this.hand.delete(key);
                },
            
            clearValueArr: function()
                {
                    this.valueArray.splice(0, this.valueArray.length);
                    this.betArray.splice(0, this.betArray.length);
                },

            resetHand: function(deck, deckSize)
                {
                    //this.deleteHand(key);

                    if (this.hand.size == 0)
                        {
                            let newHand = uuidv4();
                            this.hand.set(newHand, []);
                            this.draw(2, newHand, deck, deckSize);
                        };
                    //console.log("You: ")
                    //this.printHand(key);
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
            
            printHand: function(key, hide)
                {
                    let printArr = [];

                    this.hand.get(key).forEach((card) => 
                    {
                        printArr.push(card.name);
                    });
                    if (hide && printArr.length === 2)
                    {
                        printArr.pop();
                        printArr.push("facedown card")
                        console.log(printArr);
                    }
                    else
                    {
                        printArr.push({value: this.calcHandValue(key)});
                        console.log(printArr);

                    }
                return printArr;
                },
            
            checkIfSplittable: function(key)
                {
                    if (this.hand.get(key)[0].id == this.hand.get(key)[1].id && this.hand.get(key).length == 2) return true
                    else return false;
                },
            
            
            draw: function(numCards, key, deck, deckSize)
                {
                    assert(numCards < deckSize, "error: number of cards requested for draw < number of cards in deck") 
                    let drawArr = [];
                    const numUniqueCards = 52;
                    let i = 0;
                    while (i < numCards)
                        {
                            
                            let randNum = Math.round(Math.random() * numUniqueCards);
                            if (!deck.has(randNum)) continue;
                            let randCard = Object.assign({}, deck.get(randNum));
                            let deckCard = deck.get(randNum);
                            drawArr.push(randCard);
                            deckCard.quantity--;
                            //delete cards from map
                            if (deckCard.quantity == 0) deck.delete(randNum);
                            //console.log(`deck.size: ${deck.size}`)
                            i++;

                        }
                    this.hand.set(key, [...this.hand.get(key), ...drawArr]);
                    this.count = this.hand.size;

                     //check for aces and modify their values if hand value exceeds 21

                    if (this.checkForAces(key) && this.calcHandValue(key) > 21)
                        {
                            this.changeAceValue(key).value = 1;
                        };


                },

                testDraw: function(numCards, key, deck, deckSize, card1, card2)
                {

                    
                    assert(numCards < deckSize, "error: number of cards requested for draw < number of cards in deck") 
                    let drawArr = [];
                    let requestedCards = [card1, card2];
                    const numUniqueCards = 52;
                    let i = 0;
                    while (i < numCards)
                        {
                            
                            let randCard = Object.assign({}, deck.get(requestedCards[i]));
                            drawArr.push(randCard);
                            i++;

                        }
                    this.hand.set(key, [...this.hand.get(key), ...drawArr]);
                    this.count = this.hand.size;

                     //check for aces and modify their values if hand value exceeds 21

                    if (this.checkForAces(key) && this.calcHandValue(key) > 21)
                        {
                            
                            this.changeAceValue(key).value = 1;
                        };
                },

                hasInsuranceBet: false,

                checkInsurance: function(key)
                {

                    if (this.hand.get(key)[0].id === "A" && !this.hasInsuranceBet) return true
                    else 
                    {
                    console.log("--- invalid insurance bet----")
                    return false;
                    }
                },

                insuranceBet: function(key, money, sideBet)
                {
                    if (this.checkInsurance(key))
                    {
                        if (this.hand.get(key)[1].value === 10) 
                            {
                                money += sideBet * 2;
                                //this.printHand(key, false);
                            }
                        else money -= sideBet;
                        
                        this.hasInsuranceBet = true;
                    }
                    return money;

                },

                hasDoubledDown: false,
                
                checkDoubleDown: function (key)
                    {
                        const doubleDownVals = [9, 10, 11]
                        if (doubleDownVals.includes(this.calcHandValue(key)) && this.hand.get(key).length == 2 && !this.hasDoubledDown) return true
                        else 
                        {
                            console.log("---invalid attempt to double down---");
                            return false;
                        };
                    },
                
                doubleDown: function (key, bet, deck, deckSize)
                    {
                        if (this.checkDoubleDown(key))
                        {
                            this.hasDoubledDown = true;
                            this.hit(key, deck, deckSize);
                            this.printHand(key, false);
                            bet *= 2;
                            return bet;
                        }
                        else return false;
                    },
                
                playerReset: function()
                {
                    this.hasDoubledDown = false;
                    this.hasInsuranceBet = false;
                },

                split: function (key, deck, deckSize)
                    {
                        if (this.checkIfSplittable(key))
                            {
                                const hand1 = uuidv4();
                                const hand2 = uuidv4();

                                const firstHand = Object.assign({}, this.hand.get(key)[0])
                                const secondHand = Object.assign({}, this.hand.get(key)[1])

                             //if splitting aces, switch values back to inital value of 11

                                if (firstHand.id === "A" && firstHand.value === 1) firstHand.value = 11;
                                if (secondHand.id === "A" && secondHand.value === 1) secondHand.value = 11;
                        

                                    this.hand.set(hand1, [firstHand]);
                                    this.hand.set(hand2, [secondHand]);

                                    this.draw(1, hand1, deck, deckSize);
                                    this.draw(1, hand2, deck, deckSize);
                          
                                    //delete initial hand
                                    this.hand.delete(key);
                                }
                        else 
                            {
                                console.log("cannot split hand");
                                return;
                            }

                    },
                
                checkForAces: function(key)
                    {
                        return this.hand.get(key).some((card) => card.id == "A" && card.value == 11);
                    },
               changeAceValue: function(key)
                    {
                        return this.hand.get(key).find((card) => card.id == "A" && card.value == 11);
                    },
                
                checkBust: function(key)
                    {
                        if (this.calcHandValue(key) > 21)
                        {
                            return true;
                        }
                    },
                
                checkBlackJack: function(key)
                    {
                        if (this.calcHandValue(key) === 21)
                        {
                            return true;
                        }
                    },
                
                hit: function (key, deck, deckSize) 
                    {
                        if (this.calcHandValue(key) < 21) 
                            {
                                this.draw(1, key, deck, deckSize);

                                //check for aces and modify their values if hand value exceeds 21

                                //if (this.checkForAces(key) && this.calcHandValue(key) > 21)
                                    //{
                                        //this.changeAceValue(key).value = 1;
                                    //};

                                //this.printHand(key);

                                //check if player has busted and print it out if they have
                                
                                if (this.checkBust(key)) 
                                {
                                   // console.log("BUST!!!");
                                   // this.resetHand(key, deck, deckSize); 
                                }
                                else if (this.checkBlackJack(key))
                                {
                                    //console.log("BLACKJACK!!!")
                                    //this.resetHand(key, deck, deckSize);
                                }
                            }
                        else 
                            {
                                console.log("------cannot hit when at or above 21 or if you have doubled down------")
                                return
                            }
                    },
                dealerPlays: function (key, deck, deckSize)
                {

                    while (this.calcHandValue(key) < 17)
                    {
                        this.hit(key, deck, deckSize);
                    };

                    return;
                
                },

                stand: function(key, deck, deckSize) 
                {
                    
                },

        };

        player[label] = handTemplate;
    }



    module.exports = 
        {
            drawRandomCard: drawRandomCard,
            newDeck: newDeck,
            createHandMap: createHandMap,
            deckLength: deckLength,
           
        };