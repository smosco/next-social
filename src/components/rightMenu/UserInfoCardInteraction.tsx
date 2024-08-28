'use client';

import { switchFollow, switchBlock } from '@/lib/actions';
import { useState } from 'react';

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async (event: React.FormEvent) => {
    event.preventDefault();

    // Optimistic UI 업데이트
    setUserState((prev) => {
      // 현재 팔로우 상태에 따라 Optimistic하게 상태를 미리 업데이트
      if (prev.following) {
        return {
          ...prev,
          following: false,
        };
      } else if (!prev.following && !prev.followingRequestSent) {
        return {
          ...prev,
          followingRequestSent: true,
        };
      } else {
        return prev; // 기본적으로 이전 상태 유지
      }
    });

    try {
      // 서버에 팔로우/언팔로우 요청 보내기
      await switchFollow(userId);
    } catch (err) {
      // 서버 요청이 실패하면 원래 상태로 복구
      setUserState((prev) => {
        if (prev.followingRequestSent) {
          return {
            ...prev,
            followingRequestSent: false,
          };
        } else {
          return {
            ...prev,
            following: true,
          };
        }
      });
    }
  };

  const block = async (event: React.MouseEvent) => {
    event.preventDefault();

    // Optimistic UI 업데이트
    setUserState((prev) => ({
      ...prev,
      blocked: !prev.blocked, // 낙관적 UI: 차단 상태를 반전
    }));

    try {
      await switchBlock(userId);
    } catch (err) {
      // 요청 실패 시 상태를 복구
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked, // 원래 상태로 복구
      }));
    }
  };

  return (
    <>
      <form onSubmit={follow}>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white text-sm rounded-md p-2'
        >
          {userState.following
            ? 'Following'
            : userState.followingRequestSent
            ? 'Friend Request Sent'
            : 'Follow'}
        </button>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className='self-end'>
        <span onClick={block} className='text-red-400 text-xs cursor-pointer'>
          {userState.blocked ? 'Unblock User' : 'Block User'}
        </span>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
