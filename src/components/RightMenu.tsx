import Birthday from './Birthday';
import FriendRequests from './FriendRequests';
import Ad from './Ad';

const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className='flex flex-col gap-6'>
      <FriendRequests />
      <Birthday />
      <Ad size='md' />
    </div>
  );
};

export default RightMenu;
