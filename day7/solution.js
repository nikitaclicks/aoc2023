function p1(input) {
  const strengthOrder = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  const typeRules = [
    function fiveOfKind(cards) {
      const cardsOfKind = new Map();
      let max = 0;
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count > max) max = count;
      }
      return max === 5;
    },
    function fourOfKind(cards) {
      const cardsOfKind = new Map();
      let max = 0;
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count > max) max = count;
      }
      return max === 4;
    },
    function fullHouse(cards) {
      const cardsOfKind = new Map();
      const twos = new Set();
      let threes = new Set();
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count === 3) threes.add(card);
        if (count === 2) twos.add(card);
      }
      return twos.size === 2 && threes.size === 1;
    },
    function threeOfKind(cards) {
      const cardsOfKind = new Map();
      let max = 0;
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count > max) max = count;
      }
      return max === 3;
    },
    function twoPair(cards) {
      const cardsOfKind = new Map();
      const pairs = new Set();
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count === 2) pairs.add(card);
      }
      return pairs.size === 2;
    },
    function onePair(cards) {
      const cardsOfKind = new Map();
      const pairs = new Set();
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count === 2) pairs.add(card);
      }
      return pairs.size === 1;
    },
    function highCard(cards) {
      return true;
    },
  ];

  const rows = input.split("\n");

  const hands = rows
    .map((r) => r.split(" "))
    .map((h) => ({ cards: h[0], bet: Number(h[1]) }));

  const handsByType = new Map();

  for (const hand of hands) {
    for (let type = 0; type < typeRules.length; ++type) {
      if (typeRules[type](hand.cards)) {
        hand.type = type;

        const handsWithType = handsByType.get(type) ?? [];
        handsWithType.push(hand);
        handsByType.set(type, handsWithType);

        break;
      }
    }
  }

  const handsByRank = [];

  for (let type = 0; type < typeRules.length; ++type) {
    const handsOfType = handsByType.get(type);
    if (!handsOfType) continue;

    if (handsOfType.length === 1) {
      handsByRank.push(handsOfType[0]);
    } else {
      handsByRank.push(...orderByStrongCard(handsOfType));
    }
  }

  let totalWin = 0;

  for (let i = 0; i < handsByRank.length; ++i) {
    const rank = handsByRank.length - i;
    const bet = handsByRank[i].bet;

    totalWin += rank * bet;
  }

  return totalWin;

  function orderByStrongCard(hands, card = 0) {
    const orderedHands = [];

    const handStrengths = [];

    for (const hand of hands) {
      const strength = strengthOrder.indexOf(hand.cards[card]);

      handStrengths.push(strength);
    }

    for (let strength = 0; strength < strengthOrder.length; ++strength) {
      const handsWithCard = [];
      for (let i = 0; i < hands.length; ++i) {
        if (handStrengths[i] === strength) {
          handsWithCard.push(hands[i]);
        }
      }

      if (handsWithCard.length === 1) {
        orderedHands.push(handsWithCard[0]);
      } else if (handsWithCard.length > 1) {
        orderedHands.push(...orderByStrongCard(handsWithCard, card + 1));
      }
    }

    return orderedHands;
  }
}

module.exports.p1 = p1;

function p2(input) {
  const strengthOrder = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ];

  const typeRules = [
    function fiveOfKind(cards) {
      const cardsOfKind = new Map();
      let max = 0;
      let jokers = 0;
      for (const card of cards) {
        if (card === "J") jokers++;
        else {
          const count = (cardsOfKind.get(card) ?? 0) + 1;
          cardsOfKind.set(card, count);
          if (count > max) max = count;
        }
      }
      return max + jokers >= 5;
    },
    function fourOfKind(cards) {
      const cardsOfKind = new Map();
      let max = 0;
      let jokers = 0;
      for (const card of cards) {
        if (card === "J") jokers++;
        else {
          const count = (cardsOfKind.get(card) ?? 0) + 1;
          cardsOfKind.set(card, count);
          if (count > max) max = count;
        }
      }
      return max + jokers >= 4;
    },
    function fullHouse(cards) {
      const cardsOfKind = new Map();
      const twos = new Set();
      let threes = new Set();
      let jokers = 0;
      for (const card of cards) {
        if (card === "J") jokers++;
        else {
          const count = (cardsOfKind.get(card) ?? 0) + 1;
          cardsOfKind.set(card, count);
          if (count === 3) threes.add(card);
          if (count === 2) twos.add(card);
        }
      }
      return (
        (twos.size === 2 && threes.size === 1) ||
        (twos.size === 2 && jokers === 1) ||
        (twos.size === 1 && jokers === 2)
      );
    },
    function threeOfKind(cards) {
      const cardsOfKind = new Map();
      let max = 0;
      let jokers = 0;
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count > max) max = count;
        if (card === "J") jokers++;
      }
      return max + jokers >= 3;
    },
    function twoPair(cards) {
      const cardsOfKind = new Map();
      const pairs = new Set();
      let jokers = 0;
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count === 2) pairs.add(card);
        if (card === "J") jokers++;
      }
      return pairs.size === 2 || (pairs.size === 1 && jokers >= 2);
    },
    function onePair(cards) {
      const cardsOfKind = new Map();
      const pairs = new Set();
      let jokers = 0;
      for (const card of cards) {
        const count = (cardsOfKind.get(card) ?? 0) + 1;
        cardsOfKind.set(card, count);
        if (count === 2) pairs.add(card);
        if (card === "J") jokers++;
      }
      return pairs.size === 1 || jokers === 1;
    },
    function highCard(cards) {
      return true;
    },
  ];

  const rows = input.split("\n");

  const hands = rows
    .map((r) => r.split(" "))
    .map((h) => ({ cards: h[0], bet: Number(h[1]) }));

  const handsByType = new Map();

  for (const hand of hands) {
    for (let type = 0; type < typeRules.length; ++type) {
      if (typeRules[type](hand.cards)) {
        hand.type = type;

        const handsWithType = handsByType.get(type) ?? [];
        handsWithType.push(hand);
        handsByType.set(type, handsWithType);

        break;
      }
    }
  }

  const handsByRank = [];

  for (let type = 0; type < typeRules.length; ++type) {
    const handsOfType = handsByType.get(type);
    if (!handsOfType) continue;

    if (handsOfType.length === 1) {
      handsByRank.push(handsOfType[0]);
    } else {
      handsByRank.push(...orderByStrongCard(handsOfType));
    }
  }

  let totalWin = 0;

  for (let i = 0; i < handsByRank.length; ++i) {
    const rank = handsByRank.length - i;
    const bet = handsByRank[i].bet;

    totalWin += rank * bet;
  }

  return totalWin;

  function orderByStrongCard(hands, card = 0) {
    const orderedHands = [];

    const handStrengths = [];

    for (const hand of hands) {
      const strength = strengthOrder.indexOf(hand.cards[card]);

      handStrengths.push(strength);
    }

    for (let strength = 0; strength < strengthOrder.length; ++strength) {
      const handsWithCard = [];
      for (let i = 0; i < hands.length; ++i) {
        if (handStrengths[i] === strength) {
          handsWithCard.push(hands[i]);
        }
      }

      if (handsWithCard.length === 1) {
        orderedHands.push(handsWithCard[0]);
      } else if (handsWithCard.length > 1) {
        orderedHands.push(...orderByStrongCard(handsWithCard, card + 1));
      }
    }

    return orderedHands;
  }
}

module.exports.p2 = p2;
