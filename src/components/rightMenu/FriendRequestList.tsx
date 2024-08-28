'use client';

import { FollowRequest, User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { acceptFollowRequest, declineFollowRequest } from '@/lib/actions';

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    // Optimistic UI 업데이트
    setRequestState((prev) => prev.filter((req) => req.id !== requestId));

    try {
      await acceptFollowRequest(userId);
    } catch (err) {
      // 요청이 실패한 경우 상태 복구
      setRequestState((prev) => [
        ...prev,
        requests.find((req) => req.id === requestId)!,
      ]);
      console.error('Failed to accept follow request', err);
    }
  };

  const decline = async (requestId: number, userId: string) => {
    // Optimistic UI 업데이트
    setRequestState((prev) => prev.filter((req) => req.id !== requestId));

    try {
      await declineFollowRequest(userId);
    } catch (err) {
      // 요청이 실패한 경우 상태 복구
      setRequestState((prev) => [
        ...prev,
        requests.find((req) => req.id === requestId)!,
      ]);
      console.error('Failed to decline follow request', err);
    }
  };
  return (
    <div className=''>
      {requestState.map((req) => (
        <div key={req.id} className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Image
              src={req.sender.avatar || '/noAvatar.png'}
              alt=''
              className='w-10 h-10 rounded-full object-cover'
              width={40}
              height={40}
            />
            <span className='font-semibold'>
              {req.sender.name && req.sender.surname
                ? `${req.sender.name} ${req.sender.surname}`
                : req.sender.username}
            </span>
          </div>
          <div className='flex gap-3 justify-end'>
            <Image
              src='/accept.png'
              alt=''
              className='cursor-pointer'
              width={20}
              height={20}
              onClick={() => accept(req.id, req.senderId)}
            />
            <Image
              src='/reject.png'
              alt=''
              className='cursor-pointer'
              width={20}
              height={20}
              onClick={() => decline(req.id, req.senderId)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
