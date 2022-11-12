import { useState, createContext, useContext } from "react";
import "./App.scss";

console.clear();

const popupIsOpen = createContext(null);

const Header = () => {
  const [, setOpen] = useContext(popupIsOpen);
  return (
    <div className="header">
      <div>header</div>
      <div>
        <button onClick={() => setOpen((prev) => !prev)}>open popup</button>
      </div>
    </div>
  );
};
const Body = () => {
  const [open] = useContext(popupIsOpen);
  return (
    <div className="body">
      <div>body</div>
      {!open && <div>popup is not open</div>}
      {open && <div>popup is open</div>}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <popupIsOpen.Provider value={useState(false)}>
        <Header />
        <hr style={{ width: "100%" }} />
        <Body />
      </popupIsOpen.Provider>
    </div>
  );
};

export default App;
