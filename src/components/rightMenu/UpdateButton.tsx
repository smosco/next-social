'use client';

const UpdateButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      type='submit'
      disabled={loading}
      className={`mt-4 bg-blue-500 text-white p-2 rounded-md ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Updating...' : 'Update Profile'}
    </button>
  );
};

export default UpdateButton;
