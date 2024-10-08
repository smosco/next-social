import Image from 'next/image';

const Ad = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* TOP */}
      <div className='flex items-center justify-between text-gray-500 font-medium'>
        <span>Sponsored Ads</span>
        <Image src='/more.png' alt='' width={16} height={16} />
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === 'sm' ? 'gap-2' : 'gap-4'}`}
      >
        <div
          className={`relative w-full ${
            size === 'sm' ? 'h-24' : size === 'md' ? 'h-36' : 'h-48'
          }`}
        >
          <Image
            src='https://www.tamnao.com/data/sp/thumb/SP00001976_2.jpg'
            alt=''
            fill
            className='rounded-lg object-cover'
          />
        </div>
        <div className='flex items-center gap-4'>
          <Image
            src='https://www.tamnao.com/data/sp/thumb/SP00001976_1.jpg'
            alt=''
            width={24}
            height={24}
            className='rounded-full w-6 h-6  object-cover'
          />
          <span className='text-blue-500 font-medium'>Jeju Dolphin Tour</span>
        </div>

        <p className={size === 'sm' ? 'text-xs' : 'text-sm'}>
          {size === 'sm'
            ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus.'
            : size === 'md'
            ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit tempore laboriosam mollitia possimus voluptatum ut ea voluptates excepturi odio fugiat!'
            : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quia. Porro mollitia vero molestiae temporibus soluta ipsam ab maiores perferendis sed nihil quod rem, dicta iusto expedita nam cumque dolorem?'}
        </p>

        <button className='bg-gray-200 text-gray-400 p-2 text-xs rounded-lg'>
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
