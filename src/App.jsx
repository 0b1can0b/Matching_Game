import { useState, useEffect, createElement } from "react";
import "./App.scss";

import * as BiIcons from "react-icons/bi";

console.clear();

const getIconsList = (rows, cols) => {
  const biIconsList = Object.keys(BiIcons)
    .map((e) => {
      return { icon: e, random: Math.random() };
    })
    .sort((a, b) => a.random - b.random)
    .map((e) => e.icon)
    .splice(0, rows * cols);
  return biIconsList.map((e) => {
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
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));
};

const App = () => {
  const [boardSize, setBoardSize] = useState({ x: 4, y: 4 });
  const [icons, setIcons] = useState(getIconsList(boardSize.x, boardSize.y));
  const [board, setBoard] = useState(getBoard(boardSize.x, boardSize.y));
  const [shadowBoard, setShadowBoard] = useState(
    getShadowBoard(boardSize.x, boardSize.y)
  );
  const [canClick, setCanClick] = useState(true);
  const [clickedIcon, setClickedIcon] = useState({ x: null, y: null });
  const [prevClickedIcon, setPrevClickedIcon] = useState({ x: null, y: null });

  const [win, setWin] = useState(false);
  const [moves, setMoves] = useState(0);
  const [replay, setReplay] = useState(false);

  const [open, setOpen] = useState(false);

  const handelClick = (x, y) => {
    if (canClick) {
      setMoves((prev) => prev + 1);
      if (clickedIcon.x !== null) {
        setPrevClickedIcon(clickedIcon);
      }
      setClickedIcon({ x: x, y: y });
    }
  };
  useEffect(() => {
    if (prevClickedIcon.x !== null) {
      if (
        board[clickedIcon.x][clickedIcon.y] !==
        board[prevClickedIcon.x][prevClickedIcon.y]
      ) {
        setCanClick(false);
        setTimeout(() => {
          setClickedIcon({ x: null, y: null });
          setPrevClickedIcon({ x: null, y: null });
          setCanClick(true);
        }, 1000);
      } else if (
        board[clickedIcon.x][clickedIcon.y] ===
        board[prevClickedIcon.x][prevClickedIcon.y]
      ) {
        let tempArr = shadowBoard;
        tempArr[clickedIcon.x][clickedIcon.y] = true;
        tempArr[prevClickedIcon.x][prevClickedIcon.y] = true;

        setShadowBoard([...tempArr]);
        setClickedIcon({ x: null, y: null });
        setPrevClickedIcon({ x: null, y: null });

        if (shadowBoard.flat().every((e) => e === true)) {
          setWin(true);
        }
      }
    }
  }, [prevClickedIcon]);

  useEffect(() => {
    if (replay) {
      setCanClick(false);
      setShadowBoard(getShadowBoard(boardSize.x, boardSize.y));

      setWin(false);
      setMoves(0);

      setTimeout(() => {
        setIcons(getIconsList(boardSize.x, boardSize.y));
        setBoard(getBoard(boardSize.x, boardSize.y));
        setReplay(false);
        setCanClick(true);
      }, 500);
    }
  }, [replay]);

  const handelPopupOutsideClick = (e) => {
    if (e.target.className === "popup") setOpen(false);
  };

  const handelPopupClose = (i1, i2) => {
    if ((i1 * i2) % 2 === 0) {
      setBoardSize({ x: i1 + 2, y: i2 + 2 });
      setOpen(false);
    }
  };

  useEffect(() => {
    setIcons(getIconsList(boardSize.x, boardSize.y));
    setBoard(getBoard(boardSize.x, boardSize.y));
    setShadowBoard(getShadowBoard(boardSize.x, boardSize.y));
  }, [boardSize]);

  const getIconClass = (x, y) => {
    if (clickedIcon.x === x && clickedIcon.y === y) {
      return "icon clicked";
    }
    if (prevClickedIcon.x === x && prevClickedIcon.y === y) {
      return "icon prev_clicked";
    }
    if (shadowBoard[x][y]) {
      return "icon solved";
    }
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
                  key={colIndex}
                  className={getIconClass(rowIndex, colIndex)}
                  onClick={() => handelClick(rowIndex, colIndex)}
                >
                  <div className="front" />
                  <div className="back">
                    <RenderComponent color={icons[col].color} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {win && (
        <div className="win">
          <div>Won in {moves} Moves</div>
          <button onClick={() => setReplay(true)}>Play Again?</button>
        </div>
      )}

      <div className="settings" onClick={() => setOpen(true)}>
        <BiIcons.BiCog size="1.25rem" />
      </div>

      {open && (
        <div className="popup" onClick={handelPopupOutsideClick}>
          <div className="popup_inner">
            <div className="popup_head">
              <div className="popup_title">Setting(s)</div>
              <div className="close" onClick={() => setOpen(false)}>
                <BiIcons.BiPlus size="2.5rem" />
              </div>
            </div>
            <div className="divider"></div>
            <div className="popup_content">
              <div className="grid_size">
                <div className="text">Choose Grid Size</div>
                <div className="grid_size_options">
                  {Array(5)
                    .fill()
                    .map((e1, i1) => {
                      return Array(5)
                        .fill()
                        .map((e2, i2) => {
                          if ((i1 * i2) % 2 === 0)
                            return (
                              <div
                                key={i2}
                                className="grid_size_option"
                                onClick={() => handelPopupClose(i1, i2)}
                              >
                                {i1 + 2}x{i2 + 2}
                              </div>
                            );
                        });
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
