import { useState, useEffect, createElement } from "react";
import "./App.scss";

import * as BiIcons from "react-icons/bi";

console.clear();

const getIconsList = (rows, cols) => {
  const biIconsList = Object.keys(BiIcons).splice(0, rows * cols);
  return biIconsList
    .map((e) => {
      return { icon: e, random: Math.random() };
    })
    .sort((a, b) => a.random - b.random)
    .map((e) => e.icon)
    .map((e) => {
      return {
        icon: e,
        color: `hsl(${Math.floor(Math.random() * 36) * 10} 40% 50%)`,
      };
    });
};

const getBoard = (rows, cols) => {
  const generateNumbers = (n) => {
    return Array(n * 2)
      .fill()
      .map((e, i) => Math.floor(i / 2))
      .map((e) => {
        return { num: e, random: Math.random() };
      })
      .sort((a, b) => a.random - b.random)
      .map((e) => e.num);
  };

  const generateBoard = (x, y) => {
    const numArr = generateNumbers((x * y) / 2);

    let tempCount = -1;
    return Array(x)
      .fill()
      .map(() =>
        Array(y)
          .fill()
          .map(() => {
            tempCount++;
            return numArr[tempCount];
          })
      );
  };

  return generateBoard(rows, cols);
};

const getShadowBoard = (rows, cols) => {
  return Array(rows).fill(Array(cols).fill(false));
};

const App = () => {
  const [boardSize, setBoardSize] = useState({ x: 3, y: 4 });
  const [icons, setIcons] = useState(getIconsList(boardSize.x, boardSize.y));
  const [board, setBoard] = useState(getBoard(boardSize.x, boardSize.y));
  const [shadowBoard, setShadowBoard] = useState(
    getShadowBoard(boardSize.x, boardSize.y)
  );
  const [clickedIcon, setClickedIcon] = useState({ x: null, y: null });
  const [prevClickedIcon, setPrevClickedIcon] = useState({ x: null, y: null });

  const handelClick = (x, y) => {
    if (clickedIcon.x !== null) {
      setPrevClickedIcon(clickedIcon);
    }
    setClickedIcon({ x: x, y: y });
  };
  useEffect(() => {
    if (prevClickedIcon.x !== null) {
      setTimeout(() => {
        setClickedIcon({ x: null, y: null });
        setPrevClickedIcon({ x: null, y: null });
      }, 1000);
    }
  }, [prevClickedIcon]);

  const getIconClass = (x, y) => {
    if (clickedIcon.x === x && clickedIcon.y === y) return "icon clicked";
    if (prevClickedIcon.x === x && prevClickedIcon.y === y)
      return "icon prev_clicked";
    return "icon";
  };

  return (
    <div className="app">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => {
              const RenderComponent = BiIcons[icons[col].icon];
              return (
                <div
                  className={getIconClass(rowIndex, colIndex)}
                  onClick={() => handelClick(rowIndex, colIndex)}
                >
                  <div className="front" />
                  <div className="back">
                    <RenderComponent key={colIndex} color={icons[col].color} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
