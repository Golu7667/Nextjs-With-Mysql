"use client"
import { useState } from 'react';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async() => {
    // Implement the API call to create a new post
    try {
        const response = await fetch('http://localhost:8000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });
  
        if (response.status === 200) {
          // Successful creation of the post
          // You can redirect to the post's details page or update the post list
          // Example: router.push('/posts');
        } else {
          // Handle error (e.g., show an error message)
          console.error('Error creating the post');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
  };

  return (
    <form>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </form>
  );
}

export default PostForm;
