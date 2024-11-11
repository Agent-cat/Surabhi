import React from "react";
import intro from "../assets/intro3.mp4";
const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-screen w-screen object-cover md:object-contain lg:object-cover"
        onLoadedData={(e) => {
          // Enable both audio and video playback
          e.target.play();
          e.target.muted = false;
        }}
      >
        <source src={intro} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
