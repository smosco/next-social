'use client';

import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { useState } from 'react';
import { switchLike } from '@/lib/actions';

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  // 클라이언트 컴포넌트이므로 useAuth 훅으로 가져와야한다.
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const toggleLike = async () => {
    if (!isLoaded || !userId) return;

    // 현재 상태 백업
    const previousState = { ...likeState };

    // UI를 즉시 업데이트 (낙관적 업데이트)
    setLikeState((prevState) => ({
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
      isLiked: !prevState.isLiked,
    }));

    try {
      await switchLike(postId);
    } catch (err) {
      setLikeState(previousState);
    }
  };

  return (
    <div className='flex items-center justify-between text-sm my-4'>
      <div className='flex gap-8'>
        <div
          className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'
          onClick={toggleLike}
        >
          <Image
            src={likeState.isLiked ? '/liked.png' : '/like.png'}
            alt=''
            width={16}
            height={16}
            className='cursor-pointer'
          />
          <span className='text-gray-300'>|</span>
          <span className='text-gray-500'>
            {likeState.likeCount}
            <span className='hidden md:inline'> Likes</span>
          </span>
        </div>
        <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
          <Image
            src='/comment.png'
            alt=''
            width={16}
            height={16}
            className='cursor-pointer'
          />
          <span className='text-gray-300'>|</span>
          <span className='text-gray-500'>
            123<span className='hidden md:inline'> Comments</span>
          </span>
        </div>
      </div>
      <div className=''>
        <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
          <Image
            src='/share.png'
            alt=''
            width={16}
            height={16}
            className='cursor-pointer'
          />
          <span className='text-gray-300'>|</span>
          <span className='text-gray-500'>
            123<span className='hidden md:inline'> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
