// src/components/ViewPost.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = React.useContext(AuthContext);
  // const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Fetch post error', error);
      }
    };
    fetchPost();
  }, [id]);

  const deletePost = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
      // history.push('/');
    } catch (error) {
      console.error('Delete post error', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.thumbnail && <img src={`http://127.0.0.1:8000/storage/${post.thumbnail}`} alt="Thumbnail" />}
      {post.main_image && <img src={`http://127.0.0.1:8000/storage/${post.main_image}`} alt="Main" />}
      {post.images && post.images.map((image, index) => (
        <img key={index} src={`http://127.0.0.1:8000/storage/${image}`} alt={`Image ${index}`} />
      ))}
      {user && (
        <div>
          <Link to={`/posts/edit/${post.id}`}>Edit</Link>
          <button onClick={deletePost}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
