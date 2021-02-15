# pokerAPI

## Intro
Rank poker hands! With this API, input some cards, and get a numeric value related to that hand's strength! 


## The Game
In a Texas Hold'Em poker game, the goal is to use the player's 2 cards, along with the 5 community table cards, to make a 5 card game with the highest value as possible.

Considering the usable cards combinations (zero from the player and 5 from the table, 1 from the player and 4 from the table, or 2 from the player and 3 from the table) and the range of hands that can be assemble (10 in total, from the lowest, a High Card, to the highest, the Royal Flush), ranking a set of cards is trully an interesting math problem!


## The Hands:
The 5 card poker hands available are:
```
1. High card        //Meaning: nothing
2. Pair             //Two cards of the same value
3. Two Pairs        //Two pairs
4. Three of a kind  //Three cards of the same value
5. Straight         //Five cards in sequencial value
6. Flush            //Five cards with the same suit
7. Full House       //A trio and a pair
8. Four of a Kind   //Four cards of the same value
9. Straight Flush   //Five cards in sequencial value, all of them the same suit
10. Royal Flush     //Ace, King, Queen, Jack, Ten, all with the same suit
```

## Breaking the Tie - The Kickers
On the showdown, it is not uncommon that two or more players manage to assemble hands that fall in the same category. Sometimes we look for the value of the cards directly responsible for the hand, while in some cases that's the job of the kickers, the "filler" cards on a 5 card hand. Let's go to some examples!

### Ex 1:
- Players:
  - P1: ![Badge](https://img.shields.io/badge/A-♠-%23000000) ![Badge](https://img.shields.io/badge/3-♣-%230000ff)
  - P2: ![Badge](https://img.shields.io/badge/A-♥-%23ff0000) ![Badge](https://img.shields.io/badge/9-♦-%23f5b423)
  - P3: ![Badge](https://img.shields.io/badge/A-♣-%230000ff) ![Badge](https://img.shields.io/badge/10-♥-%23ff0000)
- Table:
  - ![Badge](https://img.shields.io/badge/A-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/5-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/7-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/6-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/J-♥-%23ff0000)
- Showdown:
  - P1: ![Badge](https://img.shields.io/badge/A-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/A-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/J-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/7-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/6-♥-%23ff0000)   ->  Pair of Aces. First kicker: Jack; second kicker: 7
  - P2: ![Badge](https://img.shields.io/badge/A-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/A-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/J-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/9-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/7-♣-%230000ff)   ->  Pair of Aces. First kicker: Jack; second kicker: 9
  - P3: ![Badge](https://img.shields.io/badge/A-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/A-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/J-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/10-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/7-♣-%230000ff)   ->  Pair of Aces. First kicker: Jack; second kicker: 10 - Winner

### Ex 2:
- Players:
  - P1: ![Badge](https://img.shields.io/badge/5-♠-%23000000) ![Badge](https://img.shields.io/badge/3-♠-%23000000) 
  - P2: ![Badge](https://img.shields.io/badge/7-♠-%23000000) ![Badge](https://img.shields.io/badge/2-♠-%23000000)
- Table: 
  - ![Badge](https://img.shields.io/badge/K-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/7-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/8-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/J-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/6-♠-%23000000) 
- Showdown:
  - P1: ![Badge](https://img.shields.io/badge/K-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/8-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/6-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/5-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/3-♠-%23000000)   ->  Flush of spades, King-high. First kicker: 8; second kicker: 6
  - P2: ![Badge](https://img.shields.io/badge/K-♠-%23000000)
  ![Badge](https://img.shields.io/badge/8-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/7-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/6-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/2-♠-%23000000)   ->  Flush of spades, King-high. First kicker: 8; second kicker: 7   - Winner

### Ex 3:
- Players:
  - P1: ![Badge](https://img.shields.io/badge/5-♣-%230000ff) ![Badge](https://img.shields.io/badge/A-♦-%23f5b423) 
  - P2: ![Badge](https://img.shields.io/badge/8-♠-%23000000) ![Badge](https://img.shields.io/badge/K-♥-%23ff0000)
- Table:
  - ![Badge](https://img.shields.io/badge/5-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/5-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/8-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/Q-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/8-♣-%230000ff) 
- Showdown:
  - P1: ![Badge](https://img.shields.io/badge/5-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/5-♥-%23ff0000) 
  ![Badge](https://img.shields.io/badge/5-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/8-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/8-♣-%230000ff)   ->  Full house, Fives over eights
  - P2: ![Badge](https://img.shields.io/badge/8-♦-%23f5b423) 
  ![Badge](https://img.shields.io/badge/8-♣-%230000ff) 
  ![Badge](https://img.shields.io/badge/8-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/5-♠-%23000000) 
  ![Badge](https://img.shields.io/badge/5-♥-%23ff0000)   ->  Full house, Eights over fives   - Winner


## The API
Input a 7 card hand (2 player cards + 5 community cards, the order is irrelevant), and get the best 5 card game combination, along with a floating point number representing that hand's strength. The integer part of that value gives you the hand's general rank, while the decimal places represent the five cards, in the right order, used for that hand. When evaluating the winner of a hand, compare the float value of each player's hand, and the biggest value gets all the chips! The notations here are:

### Input:
Each card is represented by a 2 character string; 1 for the card's value, 1 for the card's suit:
```javascript
"As"    //Ace of spades
"Kh"    //King of hearts  
"Qc"    //Queen of clubs 
"Jd"    //Jack of diamonds
"Ts"    //Ten of spades
"9h"    //Nine of hearts
...
"3c"    //Three of clubs
"2d"    //Two of diamonds
```
A 7 card hand is made of 7 concateneted 2-characters strings. Input examples: 
```javascript
"3cAs9dTdTc5s6d", "5c3d5s2h5cKhJs", "6c8cTc5s4sJcQc"
```

### Output:
Each hand will be value like:
```
High Card       -> value: 1
Pair            -> value: 2
Two Pairs       -> value: 3
Three of a Kind -> value: 4
Straight        -> value: 5
Flush           -> value: 6
Full House      -> value: 7
Four of a Kind  -> value: 8
Straight Flush  -> value: 9
Royal Flush     -> value: 10
```

Each card will be value like:
```
Ace     -> value: 14
King    -> value: 13
Queen   -> value: 12
Jack    -> value: 11
10      -> value: 10
9       -> value: 9
...
3       -> value: 3
2       -> value: 2
```

All those values will compose the hand total value like:
```
3.1212070714  //Two pairs, Queens and Sevens, Ace as kicker
| | | | | ↳ 14: Ace
| | | | ↳ 07: Seven
| | | ↳ 07: Seven
| | ↳ 12: Queen
| ↳ 12: Queen
↳ 3: Two Pairs
```

The output is a JSON object with the 5 cards used in the hand, and the hand's value, like:
```JSON
>> "3cKs9dTdTc5s6d" //Par of Tens, King as kicker
{
  "hand": [...],
  "value": 2.1010130906 
}
```

```JSON
>> "5c3d5s2h5cThJs" //Three Fives, Jack as kicker
{
  "hand": [...],
  "value": 4.0505051110 
}
```

```JSON
>> "6c8cTc5s4sJcQc" //Flush, Queen high
{
  "hand": [...],
  "value": 6.1211100806 
}
```
### Try it now!
Test this API @ :
https://us-central1-pokerapi.cloudfunctions.net/pokerAPI/v1/holdem/eval/AsKdQcJhTs9c8d

(Replace that last param with the hand you want to eval)
