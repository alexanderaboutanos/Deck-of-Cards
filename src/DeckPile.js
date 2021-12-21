/** @format */

import "./DeckPile.css";

const DeckPile = ({ deck }) => {
  return (
    <div className="DeckPile">
      {deck.map((c) => {
        return (
          <div
            className="img-div"
            style={{ transform: `rotate(${c.rotate}deg)` }}
          >
            <img src={c.image}></img>
          </div>
        );
      })}
    </div>
  );
};

export default DeckPile;
