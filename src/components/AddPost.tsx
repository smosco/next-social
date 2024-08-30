'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import AddPostButton from './AddPostButton';
import { addPost } from '@/lib/actions';

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState<any>();
  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return 'Loading...';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 로딩 상태 시작

    try {
      await addPost(
        new FormData(e.target as HTMLFormElement),
        img?.secure_url || ''
      );

      setDesc('');
      setImg(null);
    } catch (error) {
      console.error('Failed to add post', error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className='p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm'>
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || '/noAvatar.png'}
        alt=''
        width={48}
        height={48}
        className='w-12 h-12 object-cover rounded-full'
      />
      {/* POST */}
      <div className='flex-1'>
        {/* TEXT INPUT */}
        <form onSubmit={handleSubmit} className='flex gap-4'>
          <textarea
            placeholder="What's on your mind?"
            className='flex-1 bg-slate-100 rounded-lg p-2'
            name='desc'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className=''>
            <Image
              src='/emoji.png'
              alt=''
              width={20}
              height={20}
              className='w-5 h-5 cursor-pointer self-end'
            />
            <AddPostButton loading={loading} />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className='flex items-center gap-4 mt-4 text-gray-400 flex-wrap'>
          <CldUploadWidget
            uploadPreset='social'
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => open()}
                >
                  <Image src='/addImage.png' alt='' width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/addVideo.png' alt='' width={20} height={20} />
            Video
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/poll.png' alt='' width={20} height={20} />
            Poll
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/addEvent.png' alt='' width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
