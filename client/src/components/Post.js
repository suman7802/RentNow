import axios from 'axios';

export default function Post({
  privatePost,
  uri,
  post,
  setData,
  handlePostClick,
  setNotifications,
}) {
  function handleClick() {
    // if same post is clicked again, it will be set to false
    handlePostClick((e) => (e._id === post._id ? false : post));
  }

  async function RemovePost() {
    const data = {
      postId: post._id,
    };

    try {
      const response = await axios.delete(`${uri}/property`, data);
      if (response.status === 200) {
        setNotifications('Post deleted successfully');
        setData((prevData) => prevData.filter((e) => e._id !== post._id));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className="post" onClick={handleClick}>
      <img src={post.images[0]} className="image" alt="img" />
      <div className="postDetails">
        <p>{post.address}</p>
        <p>
          {post.bhk && post.bhk > 0 ? `${post.bhk} Bhk ` : null}
          {post.room && post.room > 0 ? `${post.room} Room` : null}
        </p>
        <p>Rs {post.rent} Per month</p>
      </div>
      <span className="button-control">
        {privatePost && (
          <button className="remove-btn" onClick={RemovePost}>
            Remove
          </button>
        )}
      </span>
    </div>
  );
}
