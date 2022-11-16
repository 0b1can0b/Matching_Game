import { useState, useEffect } from "react";
import "./App.scss";

console.clear();

const emojiList = [
  "🐌",
  "👣",
  "🦴",
  "⚽",
  "🧠",
  "🧪",
  "🎄",
  "⛑",
  "🎨",
  "🕶",
  "👟",
  "🏓",
  "🍿",
  "🍙",
  "🍧",
  "🍯",
  "☕",
  "🍉",
  "🌰",
  "🍁",
  "🛹",
  "🪂",
  "🌌",
  "🏢",
  "💈",
]
  .map((e) => {
    return {
      item: e,
      random: Math.random(),
    };
  })
  .sort((a, b) => b.random - a.random)
  .map((e) => e.item);

const generateBoard = (rows, cols) => {
  const numbersArray = Array(rows * cols)
    .fill()
    .map((e, i) => Math.floor(i / 2))
    .map((e) => {
      return {
        item: e,
        random: Math.random(),
      };
    })
    .sort((a, b) => b.random - a.random)
    .map((e) => e.item);

  let count = -1;
  const boardArray = Array(cols)
    .fill(0)
    .map(() =>
      Array(rows)
        .fill(0)
        .map(() => {
          count++;
          return numbersArray[count];
        })
    );

  return boardArray;
};

const App = () => {
  const [board, setBoard] = useState(generateBoard(4, 4));
  const [canClick, setCanClick] = useState(true);
  const [prevClickedItem, setPrevClickedItem] = useState([]);
  const [clickedItem, setClickedItem] = useState([]);
  const [shadowBoard, setShadowBoard] = useState(
    Array(board.length)
      .fill([])
      .map((e, i) => Array(board[i].length).fill(false))
  );
  const [win, setWin] = useState(false);

  const handelItemClick = (rowIndex, colIndex) => {
    if (canClick) {
      setPrevClickedItem(clickedItem);
      setClickedItem([rowIndex, colIndex]);
    }
  };

  useEffect(() => {
    if (clickedItem.length !== 0 && prevClickedItem.length !== 0) {
      if (
        board[clickedItem[0]][clickedItem[1]] ===
        board[prevClickedItem[0]][prevClickedItem[1]]
      ) {
        const tempBoard = shadowBoard;
        tempBoard[clickedItem[0]][clickedItem[1]] = true;
        tempBoard[prevClickedItem[0]][prevClickedItem[1]] = true;
        setShadowBoard([...tempBoard]);

        setPrevClickedItem([]);
        setClickedItem([]);

        if (shadowBoard.flat().every((item) => item === true)) setWin(true);
      } else {
        setCanClick(false);
        setTimeout(() => {
          setPrevClickedItem([]);
          setClickedItem([]);
          setCanClick(true);
        }, 1000);
      }
    }
  }, [clickedItem, prevClickedItem]);

  const getClass = (rowNumber, colNumber) => {
    if (clickedItem[0] === rowNumber && clickedItem[1] === colNumber) {
      return "card clicked";
    }
    if (prevClickedItem[0] === rowNumber && prevClickedItem[1] === colNumber) {
      return "card prev_clicked";
    }
    if (shadowBoard[rowNumber][colNumber]) {
      return "card solved";
    }
    return "card";
  };

  return (
    <div className="app">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((item, colIndex) => (
              <div
                key={colIndex}
                className={getClass(rowIndex, colIndex)}
                onClick={() => handelItemClick(rowIndex, colIndex)}
              >
                <div className="card_front"></div>
                <div className="card_back">
                  <div className="card_inner">{emojiList[item]}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {win && "WON"}
      </div>
    </div>
  );
};

export default App;
