const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
app.use(jsonParser);

//Enough setup. Let's go!

//Routes

app.get('/v1/holdem/eval/:cards', (req, res) => {
    try {

        //Get user input
        //const cards = 'AsKdQcJhTs9c8s'
        const cards = req.params.cards
        console.log("Cards:", cards)
        
        //Turns an input string into an array of Card objects
        const cardsArray = initCardsArray(cards)
        console.log("Cards Array: ", cardsArray)

        //Order cards from high (A) to low (2)
        sorted = sortCardsArray(cardsArray)
        console.log("Sorted Cards Array:", sorted)

        //Assemble all the 5 card combinations from the 7 cards array
        const hands = getHands(sorted)
        //console.log(hands)

        //Get the best 5 card combination from the 7 cards available
        var bestHand = []
        var bestValue = 0
        for (i=0; i<hands.length; i++) {
            const handValue = evalHand(hands[i])
            if (handValue > bestValue) {
                bestHand = hands[i]
                bestValue = handValue
            }
        }
        console.log("Hand: ", bestHand, "Value:", bestValue)

        res.json({"hand": bestHand, "value": bestValue})
    
    } catch (error) {
        res.status(500).send(error)
    }
})

//Helper functions

//Turns a 2 character string into a Card object
const initCard = (cardStr) => {
	const rank = cardStr.substring(0, 1)
	const suit = cardStr.substring(1, 2)
	var value = 0
	switch(rank) {
		case 'A': {value = 14; break;}
		case 'K': {value = 13; break;}
		case 'Q': {value = 12; break;}
		case 'J': {value = 11; break;}
		case 'T': {value = 10; break;}
		default: {value = Number(rank)}
	}
	const card = {
		'rank': rank,		//A
		'suit': suit,		//d[iamonds]
		'value': value,		//14
	}
	return card
}

//Turns a 14 character string into an array of 7 Card objects
const initCardsArray = (handStr) => {
    numberOfCards = handStr.length / 2
    const cards = []
    //const c1 = initCard(handStr.substring(0, 2))
	//const c2 = initCard(handStr.substring(2, 4))
    for (i = 0; i < numberOfCards; i++) {
        card = initCard(handStr.substring(cards.length * 2, cards.length * 2 + 2))
        cards.push(card)
    }
    return cards
}

//Order cards from high (A) to low (2)
const sortCardsArray = (cards) => {
    return cards.sort((a,b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0));
}

//Assemble all the 5 card combinations from the 7 cards array
const getHands = (cards) => {
	const hands = []
	for (let i=0; i<cards.length; i++) {
	    for (let j=i; j<cards.length; j++) {
			if (i != j) {
		    	const hand = cards.filter(item => item !== cards[i] && item !== cards[j])
		        hands.push(hand)
		    }
	    }
	}
	return hands
}


//Returns a floating point number, representing the hand's category and the cards used
const evalHand = (hand) => {

    const v1 = hand[0].value
    const v2 = hand[1].value
    const v3 = hand[2].value
    const v4 = hand[3].value
    const v5 = hand[4].value
    
    const s1 = hand[0].suit
    const s2 = hand[1].suit
    const s3 = hand[2].suit
    const s4 = hand[3].suit
    const s5 = hand[4].suit

    //1. High card
    var rank = 1  + kickers(v1, v2, v3, v4, v5)

    //2: One Pair
    if (v1 == v2) {rank = 2 + kickers(v1, v2, v3, v4, v5)}      //1 1 _ _ _
    if (v2 == v3) {rank = 2 + kickers(v2, v3, v1, v4, v5)}      //_ 1 1 _ _
    if (v3 == v4) {rank = 2 + kickers(v3, v4, v1, v2, v5)}      //_ _ 1 1 _
    if (v4 == v5) {rank = 2 + kickers(v4, v5, v1, v2, v3)}      //_ _ _ 1 1

    //3: Two Pairs
    if (v1 == v2 && v3 == v4 ) {rank = 3 + kickers(v1, v2, v3, v4, v5)}     //1 1 2 2 _
    if (v1 == v2 && v4 == v5 ) {rank = 3 + kickers(v1, v2, v4, v5, v3)}     //1 1 _ 2 2
    if (v2 == v3 && v4 == v5 ) {rank = 3 + kickers(v2, v3, v4, v5, v1)}     //_ 1 1 2 2
    
    //4: Three of a Kind
    if (v1 == v2 && v2 == v3) {rank = 4 + kickers(v1, v2, v3, v4, v5)}      //1 1 1 _ _
    if (v2 == v3 && v3 == v4) {rank = 4 + kickers(v2, v3, v4, v1, v5)}      //_ 1 1 1 _
    if (v3 == v4 && v4 == v5) {rank = 4 + kickers(v3, v4, v5, v1, v2)}      //_ _ 1 1 1
    
    //5: Straight
    if (v1 == 14 && v2 == 5  && v3 == 4 && v4 == 3 && v5 == 2) {rank = 5 + kickers(v2, v3, v4, v5, v1)}     //A 5 4 3 2
    if (v1 == v5+4 && v2 == v5+3  && v3 == v5+2 && v4 == v5+1) {rank = 5 + kickers(v1, v2, v3, v4, v5)}     //n+4 n+3 n+2 n+1 n
    
    //6: Flush
    if (s1 == s2 && s2 == s3 && s3 == s4 && s4 == s5) {rank = 6 + kickers(v1, v2, v3, v4, v5)}

    //7: Full House
    if (v1 == v2 && v2 == v3 && v4 == v5) {rank = 7 + kickers(v1, v2, v3, v4, v5)}      //1 1 1 2 2
    if (v1 == v2 && v3 == v4 && v4 == v5) {rank = 7 + kickers(v3, v4, v5, v1, v2)}      //1 1 2 2 2
    
    //8: Four of a Kind
    if (v1 == v2 && v2 == v3 && v3 == v4) {rank = 8 + kickers(v1, v2, v3, v4, v5)}      //1 1 1 1 _
    if (v2 == v3 && v3 == v4 && v4 == v5) {rank = 8 + kickers(v2, v3, v4, v5, v1)}      //_ 1 1 1 1
    
    //9: Straight Flush
    if (s1 == s2 && s2 == s3 && s3 == s4 && s4 == s5) {
        if (v1 == 14 && v2 == 5  && v3 == 4 && v4 == 3 && v5 == 2) {rank = 9 + kickers(v2, v3, v4, v5, v1)} //A 5 4 3 2
        if (v1 == v5+4 && v2 == v5+3  && v3 == v5+2 && v4 == v5+1) {rank = 9 + kickers(v1, v2, v3, v4, v5)} //n+4 n+3 n+2 n+1 n
    } 
        
    //10: Royal Flush
    if (s1 == s2 && s2 == s3 && s3 == s4 && s4 == s5 && 
        v1 == 14 && v2 == 13 && v3 == 12 && v4 == 11 && v5 == 10) {rank = 10}       //A K Q J T of the same suit

    return rank
}


const kickers = (v1, v2, v3, v4, v5) => {
    return 0.01 * v1 + 
           0.0001 * v2 + 
           0.000001 * v3 + 
           0.00000001 * v4 + 
           0.0000000001 * v5
}
