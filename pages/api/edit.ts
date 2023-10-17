import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { bio, profileImage, coverImage } = req.body;

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        bio,
        coverImage,
        profileImage,
      },
    });
    console.log(updatedUser, 'EDIT');
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
