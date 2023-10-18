import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    return res.status(400).end();
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid postId');
    }

    const post = await prismadb.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.warn(error);
    return res.status(405).end();
  }
}
