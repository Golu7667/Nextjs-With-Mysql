// pages/api/posts/create.js
// pages/api/posts/create.js
import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../db"

interface CreatePostRequest {
  title: string;
  content: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, content }: CreatePostRequest = req.body;

      const [result] = await db.execute(
        'INSERT INTO posts (title, content) VALUES (?, ?)',
        [title, content]
      );

      res.status(201).json({ message: 'Post created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  } else {
    res.status(405).end();
  }
}
