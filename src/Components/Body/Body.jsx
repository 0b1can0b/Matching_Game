import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage/Homepage";
import Subreddit from "../Pages/Subreddit/Subreddit";
import "./Body.scss"

const Body = () => {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="r/:sub" element={<Subreddit />} />
      </Routes>
    </div>
  );
};

export default Body;
