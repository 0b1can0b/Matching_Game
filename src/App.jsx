// import "./App.scss";

// console.clear();

// const App = () => {
//   return <div className="app">App</div>;
// };

// export default App;

import { useRef, useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import "./App.scss";

console.clear();

const HoverButton = (props) => {
  const { children } = props;
  const ref = useRef(null);
  const [position, setPosition] = useState({ left: "50%", right: "50%" });
  const handelMouseMove = (e) => {
    setPosition({
      left: `${e.pageX - ref.current.offsetLeft}px`,
      right: `${e.pageY - ref.current.offsetTop}px`,
    });
  };

  return (
    <div
      className="hover_button"
      ref={ref}
      onMouseMove={handelMouseMove}
      style={{ "--left": position.left, "--right": position.right }}
    >
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <button className="text_button">
        Text Button
        <CgArrowRight />
      </button>

      <HoverButton>
        Hover Button
        <CgArrowRight />
      </HoverButton>
    </div>
  );
};

export default App;
