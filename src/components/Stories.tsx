import Image from 'next/image';

const storiesData = [
  {
    id: 1,
    name: 'Jacob',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    name: 'Emily',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 3,
    name: 'Sophia',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 4,
    name: 'Michael',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 5,
    name: 'James',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 6,
    name: 'Liam',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 7,
    name: 'Olivia',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 8,
    name: 'Mason',
    imageUrl:
      'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const Stories = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide'>
      <div className='flex gap-8 w-max'>
        {/* Stories */}
        {storiesData.map((story) => {
          return (
            <div
              key={story.id}
              className='flex flex-col items-center gap-2 cursor-pointer'
            >
              <Image
                src={story.imageUrl}
                alt=''
                width={80}
                height={80}
                className='w-20 h-20 rounded-full ring-2'
              />
              <span className='font-medium'>{story.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
