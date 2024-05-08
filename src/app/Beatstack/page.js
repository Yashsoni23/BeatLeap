"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiSearch } from "react-icons/bi";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyPlayer from "react-spotify-web-playback";
import { FaItunesNote } from "react-icons/fa";
import { AiFillPlayCircle } from "react-icons/ai";
import { BiPlayCircle } from "react-icons/bi";
import { RxLoop } from "react-icons/rx";
import { useSession } from "next-auth/react";
import Player from "../components/Player";

const spotifyWebAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export default function Beatstack() {
  const [accessToken, setAccessToken] = useState();
  const session = useSession();
  const [Usersplaylists, setUsersplaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [currentPlaylistsTrack, setCurrentPlaylistsTrack] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({
    uri: "",
    name: "",
    artist: "",
    album: "",
    image: "",
    id: "",
  });
  useEffect(() => {
    setAccessToken(session.data.accessToken);
  }, []);
  const getPlaylistsTracks = (id) => {
    if (accessToken) {
      spotifyWebAPI.setAccessToken(accessToken);
      spotifyWebAPI.getPlaylistTracks(id).then((data) => {
        setCurrentPlaylistsTrack(
          data.body.items.map((track) => {
            return {
              name: track.track.name,
              id: track.track.id,
              image: track.track.album.images[0].url,
              uri: track.track.uri,
            };
          })
        );

        // console.log(data, "playlist tracks");
      });
    } else {
      return;
    }
  };
  useEffect(() => {
    if (accessToken) {
      spotifyWebAPI.setAccessToken(accessToken);
      spotifyWebAPI.getUserPlaylists().then((data) => {
        setUsersplaylists(
          data.body.items.map((playlist) => {
            return {
              name: playlist.name,
              id: playlist.id,
              image: playlist.images[0].url,
              uri: playlist.uri,
            };
          })
        );
        // console.log(data, "playlist");
        setCurrentPlaylist({
          name: data.body.items[0].name,
          id: data.body.items[0].id,
          image: data.body.items[0].images[0].url,
          uri: data.body.items[0].uri,
        });
      });
    } else {
      return;
    }

    // console.log(recentlyPlayed);
  }, [accessToken]);

  useEffect(() => {
    getPlaylistsTracks(currentPlaylist.id);
  }, [currentPlaylist]);

  const startLoop = () => {
    //   generate tracks uri by reduce method
    const tracksUri = currentPlaylistsTrack
      .reduce((acc, track) => {
        return acc + track.uri + ",";
      }, "")
      .split(",")
      .slice(0, -1);
    console.log(tracksUri, "tracksUri");
    setCurrentTrack({
      ...currentTrack,
      uri: tracksUri,
    });
    // console.log(currentTrack);
    //   setQueue(tracksUri)
  };

  return (
    <>
      <div className="flex relative flex-col w-screen h-screen">
        <Navbar />
        <div className="flex w-full h-[90%]">
          <div className="flex flex-col w-full sm:w-1/2 overflow-hidden h-full">
            <div className="flex flex-col max-[450px]:justify-between relative bg-slate-900 w-full h-full overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:sticky z-20 top-0 bg-transparent backdrop-blur-md h-[30%] bg-gradient-to-b from-indigo-500  w-full">
                <div className="flex rounded-full shadow-2xl absolute overflow-hidden  top-[40%] left-[10%] bg-yellow-400 w-[150px] h-[150px]">
                  <img src={currentPlaylist.image} alt="" />
                </div>
                <h1 className="absolute -bottom-20 sm:bottom-0 pb-5 right-0 text-md sm:text-3xl left-[10%] sm:left-[35%]">
                  {currentPlaylist.name}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row pl-[10%] pt-10 sm:pt-32 h-[60%] sm:h-max overflow-y-auto sm:overflow-x-auto gap-10">
                {Usersplaylists &&
                  Usersplaylists.map((playlist) => {
                    return (
                      <>
                        <div
                          key={playlist.id}
                          className={`flex cursor-pointer flex-col sm:items-center justify- gap-4`}
                          onClick={() =>
                            setCurrentPlaylist({
                              name: playlist.name,
                              id: playlist.id,
                              image: playlist.image,
                              uri: playlist.uri,
                            })
                          }
                        >
                          <img
                            src={playlist.image}
                            className="sm:w-[100px] sm:h-[100px]  w-[125px] h-[125px] object-cover"
                          />
                          <h1 className="text-white text-xs sm:text-sm font-bold w-[125px] sm:w-[100px]">
                            {playlist.name}
                          </h1>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="player fixed bottom-0 w-full z-50 ">
            <div className="float-right absolute bottom-18 sm:right-44 sm:bottom-2 z-[99] right-0 font-bold text-2xl p-5 white">
              <RxLoop className="text-2xl cursor-pointer" onClick={startLoop} />
            </div>
            <Player accessToken={accessToken} currentTrack={currentTrack} />
          </div>

          <div className="flex flex-col relative  bg-slate-900 w-max  sm:w-1/2 h-full">
            <div className="flex flex-col  sm:p-4 max-[450px]:p-2 overflow-y-auto w-full h-full">
              {currentPlaylistsTrack &&
                currentPlaylistsTrack.map((track) => {
                  return (
                    <div
                      key={track.id}
                      className={`flex ${
                        currentTrack.uri === track.uri
                          ? "bg-gradient-to-t from-indigo-500 to-violet-500"
                          : "bg-inherit"
                      } p-2 cursor-pointer flex-col sm:flex-row items-center sm:justify-between  sm:gap-3`}
                      onClick={() =>
                        setCurrentTrack({
                          name: track.name,
                          id: track.id,
                          image: track.image,
                          uri: track.uri,
                        })
                      }
                    >
                      <img
                        src={track.image}
                        className=" w-[60px] h-[60px] object-cover"
                      />
                      <h1 className="text-white w-full text-[.5rem] sm:text-sm max-[450px]:w-[60px] font-bold ">
                        {track.name}
                      </h1>
                      {currentTrack.uri === track.uri ? (
                        <div className="boxContainer">
                          <div className="box box1"></div>
                          <div className="box box2"></div>
                          <div className="box box3"></div>
                          <div className="box box4"></div>
                          <div className="box box5"></div>
                        </div>
                      ) : (
                        <BiPlayCircle className="right-0 max-[450px]:hidden text-4xl" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
