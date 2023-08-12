import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Page_notFound() {
  return (
    <>
      <Player
        id='notFound'
        autoplay
        loop
        src='/lottie/page_notFound.json'
      ></Player>
    </>
  );
}
