import { useParams } from "react-router-dom";
import "./Subreddit.scss";

const Subreddit = () => {
  const params = useParams()
  
  return (
    <div className="Subreddit">
      {params.sub}
    </div>
  );
};

export default Subreddit;