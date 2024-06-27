
const newDeck = (suits, names, cards, cardValue, numDecks, keyVals) => 
    {
        
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

const deleteHand = (hand) => 
    {
        hand.cards.splice(0, hand.cards.length);
        //reset hand value to 0;
        hand.value = 0;  
        hand.count = 0;
        hand = {};
    }

const draw = (hand,numCards,map) => 
    {
        let i = 0; 
        while (i < numCards)
            {

                let randNum = drawRandomCard(map.size);
                if (!map.has(randNum)) continue;
                let randCard = map.get(randNum);
                hand.cards.push(randCard);
                hand.count++;
                hand.value += randCard.value;
                randCard.quantity--;
                //delete cards from map
                
                if (randCard.quantity == 0) map.delete(randNum);
                i++;
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

    module.exports = 
        {
            drawRandomCard: drawRandomCard,
            deleteHand: deleteHand,
            draw:draw,
            newDeck: newDeck,
            createNewHand: createNewHand,
        };