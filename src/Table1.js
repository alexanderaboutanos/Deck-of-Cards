/** @format */

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DeckPile from "./DeckPile";

const URL = "http://deckofcardsapi.com/api";

let genRandDegree = () => {
  return Math.floor(Math.random() * 180) + 1;
};

const Table1 = () => {
  const [deck, setDeck] = useState([]);
  const [numCards, setNumCards] = useState(0);
  const deckId = useRef(null);

  useEffect(
    function drawNewCard() {
      if (deckId.current !== null) {
        drawCard();
      }
      async function drawCard() {
        let res = await axios.get(
          `${URL}/deck/${deckId.current}/draw/?count=1`
        );
        let newCard = res.data.cards[0];
        newCard.rotate = genRandDegree();
        setDeck((deck) => [...deck, newCard]);
      }
    },
    [numCards]
  );

  useEffect(function atStart() {
    async function getNewDeck() {
      let res = await axios.get(`${URL}/deck/new/shuffle/?deck_count=1`);
      deckId.current = res.data.deck_id;
    }
    getNewDeck();
  }, []);

  return (
    <div>
      <h1>Deck of Cards!</h1>
      <p>
        {deck.length < 52 ? (
          <button
            onClick={() => {
              setNumCards(numCards + 1);
            }}
          >
            Draw a card
          </button>
        ) : (
          alert("That's all of them!")
        )}
      </p>
      <DeckPile deck={deck} />
    </div>
  );
};

export default Table1;
