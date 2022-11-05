// import "./App.scss";

// console.clear();

// const App = () => {
//   return <div className="app">App</div>;
// };

// export default App;

//
//
//
//
//

// import { useEffect, useRef, useState } from "react";

// import { CgArrowRight } from "react-icons/cg";
// import "./App.scss";

// console.clear();

// const HoverButton = (props) => {
//   const { children } = props;
//   const ref = useRef(null);
//   const [position, setPosition] = useState({ left: "50%", right: "50%" });
//   const handelMouseMove = (e) => {
//     setPosition({
//       left: `${e.pageX - ref.current.offsetLeft}px`,
//       right: `${e.pageY - ref.current.offsetTop}px`,
//     });
//   };

//   return (
//     <div
//       className="hover_button"
//       ref={ref}
//       onMouseMove={handelMouseMove}
//       style={{ "--left": position.left, "--right": position.right }}
//     >
//       {children}
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div className="app">
//       <button className="text_button">
//         Text Button
//         <CgArrowRight />
//       </button>

//       <HoverButton>
//         Hover Button
//         <CgArrowRight />
//       </HoverButton>
//     </div>
//   );
// };

// export default App;

//
//
//
//
//

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./App.scss";

console.clear();

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const switchState = () => setIsOpen((prev) => !prev);

  return (
    <motion.div className={isOpen ? "app active" : "app"} layout>
      <motion.button onClick={switchState} layout>
        {`${isOpen}`}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            nemo iusto eveniet temporibus. Possimus quisquam nihil rerum odio
            neque consectetur?
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
