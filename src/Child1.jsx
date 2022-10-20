import { useState } from "react";

const Child1 = () => {
  const [state, setState] = useState(0);

  const changeChild1State = (newState) => {
    setState(newState);
  };
  return `Child1 State: ${state}`;
};

export default Child1;
