'use client';

import { Story, User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { CldUploadWidget } from 'next-cloudinary';
import { addStory } from '@/lib/actions';

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();

  const { user, isLoaded } = useUser();

  const add = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !img?.secure_url) return;

    const newStory = {
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,

      user: {
        id: userId,
        username: 'Sending...',
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

    setStoryList((prev) => [...prev, newStory]);

    try {
      const createdStory = await addStory(img.secure_url);
      if (createdStory) {
        setStoryList((prev) =>
          prev.map((story) => (story.id === newStory.id ? createdStory : story))
        );
      }
      setImg(null);
    } catch (err) {
      console.log(err);
      setStoryList((prev) => prev.filter((story) => story.id !== newStory.id));
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset='social'
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className='flex flex-col items-center gap-2 cursor-pointer relative'>
              {/* TODO: onClick open 함수 위치 수정 */}
              <div onClick={() => open()} className='cursor-pointer'>
                <Image
                  src={img?.secure_url || user?.imageUrl || '/noAvatar.png'}
                  alt=''
                  width={80}
                  height={80}
                  className='w-20 h-20 rounded-full ring-2 object-cover'
                />
              </div>
              {img ? (
                <form onSubmit={add}>
                  <button
                    type='submit'
                    className='text-xs bg-blue-500 p-1 rounded-md text-white'
                  >
                    Send
                  </button>
                </form>
              ) : (
                <span className='font-medium'>Add a Story</span>
              )}
              <div
                className='absolute text-6xl text-gray-200 top-1 '
                onClick={() => open()}
              >
                +
              </div>
            </div>
          );
        }}
      </CldUploadWidget>

      {storyList.map((story) => (
        <div
          key={story.id}
          className='flex flex-col items-center gap-2 cursor-pointer'
        >
          <Image
            src={story.user.avatar || '/noAvatar.png'}
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />
          <span className='font-medium'>
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
