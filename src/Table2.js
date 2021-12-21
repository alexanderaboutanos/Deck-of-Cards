/** @format */

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DeckPile from "./DeckPile";

const URL = "http://deckofcardsapi.com/api";

let genRandDegree = () => {
  return Math.floor(Math.random() * 180) + 1;
};

const Table2 = () => {
  const [deck, setDeck] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const deckId = useRef(null);
  const timerId = useRef();

  function endApp() {
    clearInterval(timerId.current);
    alert("those are all the cards!");
  }

  useEffect(
    function drawNewCard() {
      if (deckId.current !== null && drawing === true) {
        timerId.current = setInterval(() => {
          drawCard();
        }, 1000);
      }
      async function drawCard() {
        let res = await axios.get(
          `${URL}/deck/${deckId.current}/draw/?count=1`
        );
        let newCard = res.data.cards[0];
        newCard.rotate = genRandDegree();
        console.log("drew card", newCard);
        return setDeck((deck) => [...deck, newCard]);
      }

      return function cleanUpClearTimer() {
        console.log("Unmount ID", timerId.current);
        clearInterval(timerId.current);
      };
    },
    [drawing]
  );

  useEffect(function getNewDeck() {
    async function newDeck() {
      let res = await axios.get(`${URL}/deck/new/shuffle/?deck_count=1`);
      deckId.current = res.data.deck_id;
      return deckId.current;
    }
    newDeck();
  }, []);

  return (
    <div>
      <h1>Deck of Cards!</h1>
      <p>
        {deck.length === 52 ? (
          endApp()
        ) : (
          <button
            onClick={() => {
              setDrawing(!drawing);
            }}
          >
            {!drawing ? "Start Drawing" : "Stop Drawing"}
          </button>
        )}
      </p>

      <DeckPile deck={deck} />
    </div>
  );
};

export default Table2;
