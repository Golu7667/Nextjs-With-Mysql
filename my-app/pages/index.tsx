// pages/index.tsx
import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm'
import axios from 'axios'


const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Implement API call to fetch posts and set them in state
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/posts'); // Adjust the URL as per your API route
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();

  }, []);

  const createPost = async(title: string, content: string) => {
    try {
      const response = await axios.post('/api/posts', { title, content }); // Adjust the URL as per your API route
      const newPost = { id: response.data.id, title, content };
      setPosts([...posts, newPost]); // Add the new post to the current list of posts
    } catch (error) {
      console.error('Error creating a new post:', error);
    }
  };

  return (
    <div>
      <h1>Next.js CRUD App</h1>
      <PostList posts={posts} />
      <PostForm onSubmit={createPost} />
    </div>
  );
};

export default Home;
