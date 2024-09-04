'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from './client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// 팔로우 상태 변경 함수
// 팔로우 중이면 팔로우 취소
// 팔로우 요청 중이면 팔로우 요청 취소
// 팔로우 중도 아니고 팔로우 요청 중도 아니면 팔로우 요청
export const switchFollow = async (userId: string) => {
  // currentUserId 로그인한 사용자
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error('User is not authenticated!');
  }

  try {
    // 현재 로그인한 유저가 변수로 받은 유저를 팔로우하고 있는지 확인
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    // 팔로우 중이면 팔로우 취소
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      // 팔로우 중이 아니면 팔로우 요청 중인지 확인
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      // 팔로우 요청 중이면 팔로우 요청 취소
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        // 팔로우 요청 기록 없으면 팔로우 요청
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error('User is not Authenticated!!');
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
};

// 팔로우 요청 수락
// 로그인한 유저가 변수로 받은 유저가 보낸 팔로우 요청을 수락
export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error('User is not authenticated!');
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (err) {
    console.error('Failed to accept follow request', err);
    throw new Error('Something went wrong!');
  }
};

// 팔로우 요청 거절
// 로그인한 사용자가 변수로 들어온 유저가 보낸 팔로우 요청을 거절
export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error('User is not authenticated!');
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    // 팔로우 요청 기록 삭제
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
};

export const updateProfile = async (formData: FormData, cover: string) => {
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== '')
  );

  // cover가 빈 문자열이 아니면 filteredFields에 추가
  if (cover && cover.trim() !== '') {
    filteredFields.cover = cover;
  }

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse(filteredFields);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error('User is not authenticated!');

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId } = auth();

  if (!userId) throw new Error('User is not authenticated!');

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get('desc') as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    console.log('description is not valid');
    return;
  }

  const { userId } = auth();

  if (!userId) throw new Error('User is not authenticated!');

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
};

export const addStory = async (img: string) => {
  const { userId } = auth();

  if (!userId) throw new Error('User is not authenticated!');

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    // story는 계정당 하나만 가능
    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 100),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error('User is not authenticated!');
  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });

    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
};
