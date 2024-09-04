'use client';

import Image from 'next/image';
import { Comment, User } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { addComment } from '@/lib/actions';

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  // 클라이언트 컴포넌트에서 user 정보를 모두 가져오는 훅
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState('');

  // 낙관적 UI 업데이트 적용
  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !desc.trim()) return;

    // 임시 코멘트
    const newComment = {
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: 'Sending Please Wait...',
        avatar: user.imageUrl || '/noAvatar.png',
        cover: '',
        description: '',
        name: '',
        surname: '',
        city: '',
        work: '',
        school: '',
        website: '',
        createdAt: new Date(Date.now()),
      },
    };

    // 낙관적 업데이트 - 코멘트를 즉시 UI에 추가
    setCommentState((prevState) => [newComment, ...prevState]);
    setDesc(''); // 입력 필드 초기화

    try {
      const createdComment = await addComment(postId, desc);

      setCommentState((prev) =>
        prev.map((comment) =>
          comment.id === newComment.id ? createdComment : comment
        )
      );
    } catch (err) {
      console.log(err);
      // 오류가 발생하면 낙관적으로 추가된 코멘트를 롤백
      setCommentState((prevState) =>
        prevState.filter((comment) => comment.id !== newComment.id)
      );
    }
  };

  return (
    <>
      {/* NEW COMMENT */}
      {user && (
        <form onSubmit={add} className='flex items-center gap-4'>
          <Image
            src={user.imageUrl || '/noAvatar.png'}
            alt=''
            width={32}
            height={32}
            className='w-8 h-8 rounded-full'
          />
          <div className='flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 p'>
            <input
              type='text'
              placeholder='Write a comment...'
              className='bg-transparent outline-none flex-1'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src='/emoji.png'
              alt=''
              width={16}
              height={316}
              className='cursor-pointer'
            />
          </div>
          <input type='submit' style={{ display: 'none' }} />
        </form>
      )}
      {/*COMMENTS */}
      <div className=''>
        {/* COMMENT */}
        {commentState.map((comment: any) => (
          <div key={comment.id} className='flex gap-4 justify-between mt-6'>
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || '/noAvatar.png'}
              alt=''
              width={40}
              height={40}
              className='w-10 h-10 rounded-full'
            />
            {/* DESC */}
            <div className='flex flex-col gap-2 flex-1'>
              <span>
                {comment.user.name && comment.user.surname
                  ? `${comment.user.name} ${comment.user.surname}`
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className='flex items-center gap-2 text-xs text-gray-500 mt-2'>
                <div className='flex items-center gap-4'>
                  <Image
                    src='/like.png'
                    alt=''
                    width={12}
                    height={12}
                    className='cursor-pointer w-3 h-3'
                  />
                  <span className='text-gray-300'>|</span>
                  <span className='text-gray-500'>123 Likes</span>
                </div>
                <div className=''>Reply</div>
              </div>
            </div>
            {/* ICON */}
            <Image
              src='/more.png'
              alt=''
              width={16}
              height={16}
              className='cursor-pointer w-4 h-4'
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
