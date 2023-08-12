import React from 'react';

export default function Page_header({ page_name }) {
  return (
    <div
      className='animate__animated animate__fadeInDown mb-14'
      id='page_header'
    >
      <h1 className='mb-2 text-text_primary'>{page_name}</h1>
    </div>
  );
}
