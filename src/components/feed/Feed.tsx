import { auth } from '@clerk/nextjs/server';
import Post from './Post';
import prisma from '@/lib/client';

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth();

  let posts: any[] = [];

  // 특정 사용자의 게시물 (username이 제공된 경우)
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 로그인 사용자가 팔로우하는 사람들의 게시물 (username이 제공되지 않은 경우)
  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following?.map((f) => f.followingId);

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return (
    <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
      <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12'>
        {posts.length
          ? posts.map((post) => <Post key={post.id} post={post} />)
          : 'No posts found!'}
      </div>
    </div>
  );
};

export default Feed;
