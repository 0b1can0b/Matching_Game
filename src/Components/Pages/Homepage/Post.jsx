import timeSince from "../../../utilities/timeSince";

const Post = ({ data }) => {
  return (
    data && (
      <div className="post">
        <div className="top">
          <div className="subreddit">r/{data.subreddit}</div>
          <div className="author">u/{data.author}</div>
          <div className="created">{timeSince(data.created)}</div>
        </div>
        <div className="body">
          <div className="title">{data.title}</div>
          {data.post_hint === "image" && (
            <div className="image">
              <img src={data.url} alt="" />
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="upvote_ratio">{data.upvote_ratio * 100}%</div>
          <div className="num_comments">{data.num_comments} comments</div>
        </div>
      </div>
    )
  );
};

export default Post;
