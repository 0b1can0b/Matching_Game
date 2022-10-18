import { useRef } from "react";
import { useHref, Link, useNavigate } from "react-router-dom";
import "./Header.scss";

const Search = () => {
  const inputRef = useRef(null);
  const nav = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    const inpVal = inputRef.current.value;
    if (inpVal) {
      nav(`r/${inpVal}`);
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <input ref={inputRef} placeholder="Enter subreddit..." />
    </form>
  );
};

const Header = () => {
  const path = useHref();
  const pathArr = path.split("/");

  return (
    <div className="header">
      <div className="logo">
        <div className="domain">
          <Link to="/">Reddit</Link>
        </div>
        {pathArr[2] && (
          <div className="sub">
            {pathArr.length !== 3 && (
              <Link to={`/r/${pathArr[2]}`}>r/{pathArr[2]}</Link>
            )}
            {pathArr.length === 3 && `r/${pathArr[2]}`}
          </div>
        )}
        {pathArr[4] && <div className="post">{pathArr[4]}</div>}
      </div>
      <div className="search">
        <Search />
      </div>
    </div>
  );
};

export default Header;
