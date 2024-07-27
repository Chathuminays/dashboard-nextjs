import React, { ReactNode } from 'react';

interface ContentBoxProps {
  title: string;
  children: ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({ title, children }) => {
  return (
    <>
        <div className='bg-white border border-stroke rounded-md w-full h-auto'>

            {/* Box header */}
            <div className='h-12 w-full border-b border-stroke flex items-center pl-3'>
                <p className='font-semi-bold text-lg'>{title}</p>
            </div>

            {/* Content section */}
            <div>
                {children}
            </div>
        </div>
    </>
  )
}

export default ContentBox;