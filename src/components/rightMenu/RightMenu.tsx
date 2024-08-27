import Birthday from './Birthday';
import FriendRequests from './FriendRequests';
import Ad from '../Ad';
import UserInfoCard from './UserInfoCard';
import UserMediaCard from './UserMediaCard';
import { User } from '@prisma/client';
import { Suspense } from 'react';

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6'>
      {user ? (
        <>
          <Suspense fallback='loading...'>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback='loading...'>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthday />
      <Ad size='md' />
    </div>
  );
};

export default RightMenu;
