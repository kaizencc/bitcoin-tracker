import React, { useState } from 'react';
import axios from 'axios';

export interface IPost {
  id: number;
  data: string;
}

export const defaultPosts: IPost[] = [];
var num = 0;


export const Axios: React.FC = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(
    defaultPosts
  );

  const [refresh, setRefresh]: [
    boolean,
    (refresh: boolean) => void
  ] = React.useState<boolean>(false);

  const callAPIClick = () => {
    setRefresh(false);
    axios({
      method: 'get',
      url: `https://ln7kvmlhug.execute-api.us-east-1.amazonaws.com/prod/${num}`,
      params: {
        email: "kaizen@gmail.com",
        threshold: 40000
      }
    })
    .then((response) => {
      console.log(response);
      defaultPosts.push({id: num++, data: response.data});
      setPosts(defaultPosts);
      setRefresh(true);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="App">
      {<button onClick={callAPIClick}>Run</button>}
      <ul className="posts">
        {refresh && posts.map((post) => (
          <li key={post.id}>
            <p>{post.data}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

