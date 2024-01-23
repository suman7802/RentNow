import {useState, useEffect} from 'react';
import Box from './Box';
import Post from './Post';
import Login from './Login';
import Register from './Register';
import PostForm from './PostForm';
import PostDetails from './PostDetails';

export default function Main({
  privatePost,
  setPrivatePost,
  uri,
  data,
  setData,
  setNotifications,
}) {
  const [posts, setPosts] = useState(false);
  const [login, setLogin] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);

  // responsible for checking if the user is logged in or not
  useEffect(() => {
    setLogin(document.cookie.indexOf(`rentNow=`) !== -1);
  }, []);

  // responsible for setting the post to be displayed in the PostDetails component
  // its passed as a prop to the Post component and receives the post object as an argument
  function handlePostClick(post) {
    setPosts(post);
  }

  return (
    <div className="main">
      <Box>
        {data.length === 0 ? (
          <span className="empty">Empty</span>
        ) : (
          data.map((post) => (
            <Post
              privatePost={privatePost}
              setNotifications={setNotifications}
              key={post._id}
              uri={uri}
              post={post}
              setData={setData}
              handlePostClick={handlePostClick}
            />
          ))
        )}
      </Box>

      <Box>
        {posts ? (
          <PostDetails post={posts} />
        ) : !login ? (
          haveAccount ? (
            <Login
              uri={uri}
              setHaveAccount={setHaveAccount}
              setLogin={setLogin}
              setNotifications={setNotifications}
            />
          ) : (
            <Register
              uri={uri}
              setHaveAccount={setHaveAccount}
              setNotifications={setNotifications}
            />
          )
        ) : (
          <PostForm
            privatePost={privatePost}
            setPrivatePost={setPrivatePost}
            setData={setData}
            setPost={setPosts}
            uri={uri}
            setLogin={setLogin}
            setNotifications={setNotifications}
          />
        )}
      </Box>
    </div>
  );
}
