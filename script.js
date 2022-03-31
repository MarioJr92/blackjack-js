let chips = 100;

const blackjack = () => {
  let userPick = '';
  let userHand = [];
  let botHand = [];
  let bet = 0;
  
  let cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  let cardSuites = ['D', 'C', 'H', 'S'];

  const setBet = () => {
    bet = prompt(`Enter your bet amount, User's chips: $${chips}`, 'Enter in increments of 10');

    if (bet % 10 !== 0) {
      alert('Enter your bet in increments of 10');
      return setBet();
    } else if (bet > chips) {
      alert('You cannot bet greater than the amount of chips you have');
      return setBet();
    }
  }

  const cardDealing = arr => {
    let minVal = 0;
    let maxVal = 13;
    let minSte = 0;
    let maxSte = 4;
    let diceVal = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
    let diceSte = Math.floor(Math.random() * (maxSte - minSte)) + minSte;
    let cardRegex = new RegExp([cardValues[diceVal], cardSuites[diceSte]].join(''));

    const deal = arr => {
      if (arr.length === 0) {

        arr.push(cardValues[diceVal]);
        arr.push(cardSuites[diceSte]);
      
        return cardDealing(arr);
      }
      if (cardRegex.test(botHand.join('')) || cardRegex.test(userHand.join(''))) {
 
        return cardDealing(arr);

      } else {

        arr.push(cardValues[diceVal]);
        arr.push(cardSuites[diceSte]);

      }

      return arr;
    }

    return deal(arr);
  }

  const total = arr => {
    let sum = 0;
    let ace= [];

    for (let i = 0; i < arr.length; i += 2) {
      if (typeof(arr[i]) === 'number') {
         sum += arr[i]
      } else if (typeof(arr[i]) === 'string' && arr[i] !== 'A') {
         sum += 10
      } else {
        ace.push(arr[i]);
      }
    }

    if (ace.length > 0) {
      for (let i = 0; i < ace.length; i++) {
        sum += 11;
        if (sum > 21) {
          sum -= 10;
        }
      }
    }

    return sum;
  }

  const pair = arr => {
    let newHand = [];

    for (let i = 0; i < arr.length; i += 2) {
      newHand.push((arr.slice(i, i + 2)).join(' '));
    }

    return newHand.join(' | ');
  }


  let start = confirm("Blackjack Game Time. Want to deal in?");

  if (!start) {
    return alert('Come back again whenever you\'re ready to play!');
  }

  if (chips === 0) {
    alert("You cannot play without any chips.");
  return
  }

  setBet();
  userHand = cardDealing(userHand);
  botHand = cardDealing(botHand);

  const dealer = (userHand, botHand) => {
    let userCards = pair(userHand);
    let botCards = pair(botHand);
    let userHandVal = total(userHand);
    let botHandVal = total(botHand);

    if (userHand.length === 4 && userHandVal === 21) {
      chips += parseInt(bet);
      alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}. Blackjack! User Wins! User's Chips: $${chips}.`);
      return blackjack();
    } else if (userHandVal > 21) {
      chips -= parseInt(bet);
      alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}. User busts! House Wins! User's Chips: $${chips}.`);
      return blackjack();
    } else {
      if (userPick.toLowerCase() !== 'stay') {
        userPick = prompt(`User's cards: ${userCards}. Dealer's cards: ${botCards.slice(0, 4)} |  ?`, 'Hit or Stay');
      } if (userPick.toLowerCase() === 'hit') {
        return dealer(cardDealing(userHand), botHand);
      } else if (userPick.toLowerCase() === 'stay') {
        alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}.`);
        if (botHand.length === 4 && botHandVal === 21) {
          if (userHand.length > 4 || userHandVal !== 21) {
            chips -= parseInt(bet) 
            alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}. Blackjack! House Wins! User's Chips: $${chips}.`);
            return blackjack();
          }
        } else if (botHandVal < 16) {
          return dealer(userHand, cardDealing(botHand));
        } else {
          if (botHandVal > 21) {
            chips += parseInt(bet);
            alert(`Your cards: ${userCards}. Dealer's cards: ${botCards}. House Busts! User Wins! User Chips" $${chips}.`);
            return blackjack();
          } else if (botHandVal > userHandVal) {
            chips -= parseInt(bet);
            alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}. House Wins! User's Chips: $${chips}.`);
            return blackjack();
          } else if (botHandVal === userHandVal) {
            alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}. Push! User's Chips: $${chips}.`);
            return blackjack();
          } else if (botHandVal < userHandVal) {
            chips += parseInt(bet);
            alert(`User's cards: ${userCards}. Dealer's cards: ${botCards}. User Wins! User's Chip $${chips}`);
            return blackjack();
          }
        }
      } else if (userPick === null) {
        console.log('a');
        return
      }
    } 
  }

  return dealer(userHand, botHand);
}

blackjack();