import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, currentTrack }) {
  return (
    <div className="player fixed bottom-0 w-full z-50 ">
      <SpotifyWebPlayer
        play={true}
        token={accessToken}
        uris={[currentTrack.uri]}
        styles={{
          bgColor: "#0F172A",
          activeColor: "#fff",
          trackNameColor: "#fff",
          trackArtistColor: "#fff",
          trackAlbumColor: "#fff",
          trackImageColor: "#fff",
          trackDurationColor: "#fff",
          trackProgressColor: "#fff",
          trackTimeColor: "#fff",
          trackCurrentTimeColor: "#fff",
          color: "#fff",
          loaderColor: "#fff",
          sliderTrackColor: "#fff",
          loaderSize: 48,
          altColor: "#fff",
          sliderHeight: 8,
          sliderHandleColor: "#5B21B6",
          height: 80,
          sliderColor: "#64748B",
        }}
      />
    </div>
  );
}
