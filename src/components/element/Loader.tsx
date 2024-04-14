import React from 'react';

const MausonLoader: React.FC = () => {
 

  return (
    <div className='w-full h-screen'>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center  bg-opacity-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-violet-500"></div>
        <div className="absolute top-24 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white bg-transparent shadow-xl shadow-violet-500 " >M</h2>
          <p className="text-lg mt-16 text-white" >Wait For Mauson...</p>
        </div>
      </div>
    </div>
  );
};

export default MausonLoader;
