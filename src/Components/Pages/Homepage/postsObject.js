const postsObject = (e) => {
  return {
    author: e.author,
    created: e.created,
    id: e.id,
    num_comments: e.num_comments,
    permalink: e.permalink,
    post_hint: e.post_hint,
    subreddit: e.subreddit,
    title: e.title,
    upvote_ratio: e.upvote_ratio,
    url: e.url
  };
};

export default postsObject