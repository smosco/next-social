'use client';

const AddPostButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      type='submit'
      disabled={loading}
      className={` bg-blue-500 text-white p-2 mt-2 rounded-md ${
        loading ? 'bg-blue-300 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <div className='flex items-center gap-2'>
          <div className='inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]' />
          Sending
        </div>
      ) : (
        'Send'
      )}
    </button>
  );
};

export default AddPostButton;
