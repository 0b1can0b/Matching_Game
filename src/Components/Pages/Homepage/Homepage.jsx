import { useEffect, useState } from "react";
import "./Homepage.scss";
import postsObject from "./postsObject.js";
import Post from "./Post";

console.clear();

const Homepage = () => {
  const [homepagePosts, setHomepagePosts] = useState([]);
  useEffect(() => {
    fetch(`https://www.reddit.com/.json?raw_json=1`)
      .then((res) => res.json())
      .then((json) => {
        json.data.children.forEach((obj) => {
          setHomepagePosts((prev) => [...prev, postsObject(obj.data)]);
        });
      });

    return () => setHomepagePosts([]);
  }, []);

  // useEffect(() => {
  //   homepagePosts.length > 0 && console.log(homepagePosts);
  // }, [homepagePosts]);

  return (
    <div className="homepage">
      <div className="posts">
        {homepagePosts.length > 0 &&
          homepagePosts.map((e, i) => {
            return <Post key={i} data={e} />;
          })}
      </div>
    </div>
  );
};

export default Homepage;
