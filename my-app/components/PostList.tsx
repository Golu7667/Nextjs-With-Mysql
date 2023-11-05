// components/PostList.tsx
import React from 'react';

interface PostListProps {
  posts: Post[];
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h1>Post List</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
