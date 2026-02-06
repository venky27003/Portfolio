import React from 'react';

const PageBorders = () => {
  return (
    <>
      {/* Left border */}
      <div className="fixed inset-y-0 left-0 w-4 md:w-8 bg-black z-50 border-r border-white"></div>
      {/* Right border */}
      <div className="fixed inset-y-0 right-0 w-4 md:w-8 bg-black z-50 border-l border-white"></div>
    </>
  );
};

export default PageBorders; 