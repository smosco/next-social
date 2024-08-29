'use client';

import { updateProfile } from '@/lib/actions';
import { User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className=''>
      <span
        className='text-blue-500 text-xs cursor-pointer'
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className='absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 '>
          <form
            action={(formData) => updateProfile(formData, cover?.secure_url)}
            className='p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative'
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <div className='mt-4 text-xs text-gray-500'>
              Use the navbar profile to change the avatar or username.
            </div>
            {/* COVER PICTURE UPLOAD */}

            <CldUploadWidget
              uploadPreset='social'
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className='flex flex-col gap-4 my-4'
                    onClick={() => open()}
                  >
                    <label htmlFor=''>Cover Prcture</label>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      <Image
                        src={user.cover || '/noCover.png'}
                        alt=''
                        width={48}
                        height={32}
                        className='w-12 h-8 rounded-md object-cover'
                      />
                      <span className='text-xs underline text-gray-600'>
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* WRAPPER */}
            <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
              {/* INPUT */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  First Name
                </label>
                <input
                  type='text'
                  placeholder={user.name || 'Gussie'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='name'
                />
              </div>

              {/* INPUT */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  Surname
                </label>
                <input
                  type='text'
                  placeholder={user.surname || 'Salazar'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='surname'
                />
              </div>

              {/* INPUT */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  Description
                </label>
                <input
                  type='text'
                  placeholder={user.description || 'Such a beautiful night...'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='description'
                />
              </div>
              {/* INPUT */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  City
                </label>
                <input
                  type='text'
                  placeholder={user.city || 'Paris'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='city'
                />
              </div>
              {/* INPUT */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  School
                </label>
                <input
                  type='text'
                  placeholder={user.city || 'Paris University'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='school'
                />
              </div>
              {/* INPUT */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  Work
                </label>
                <input
                  type='text'
                  placeholder={user.work || 'Channel'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='work'
                />
              </div>
              {/* INPUT */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  Website
                </label>
                <input
                  type='text'
                  placeholder={user.website || 'rosa.vlog'}
                  className='ring-1 ring-gray-300 p-[13px] text-sm rounded-md'
                  name='website'
                />
              </div>
            </div>
            <button className='bg-blue-500 p-2 mt-2 rou8nded-md text-white'>
              Update
            </button>
            <div
              className='absolute text-xl right-2 top-3 cursor-pointer'
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
