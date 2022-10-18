import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";

import Header from "../Header/Header";
import Body from "../Body/Body";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

export default App;
