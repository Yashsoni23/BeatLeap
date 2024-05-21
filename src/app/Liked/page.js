"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SpotifyWebApi from "spotify-web-api-node";
import SpotifyPlayer from "react-spotify-web-playback";

import { BiPlayCircle } from "react-icons/bi";
import {
  BsFileArrowUp,
  BsFillPeopleFill,
  BsFillSaveFill,
} from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import { IoArrowRedo } from "react-icons/io5";

import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import Player from "../components/Player";
import { useCustomContext } from "../context/customClient";
const spotifyWebAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export default function Beatstack() {
  const session = useSession();
  const context = useCustomContext();
  const [accessToken, setAccessToken] = useState();
  const [MyTopTracks, setMyTopTracks] = useState([]);
  const [MySavedTracks, setMySavedTracks] = useState([]);
  const [MyTopArtists, setMyTopArtists] = useState([]);
  const [ArtistAlbums, setArtistAlbums] = useState([]);
  const [liabrary, setLiabrary] = useState([]);
  const [trackLiabrary, setTrackLiabrary] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setAccessToken(context?.accessToken);
  }, [context.accessToken, context, accessToken]);

  useEffect(() => {
    if (accessToken) {
      spotifyWebAPI.setAccessToken(accessToken);

      spotifyWebAPI.getMyTopTracks({ limit: 50 }).then((data) => {
        setMyTopTracks(
          data.body.items.map((track) => {
            return {
              name: track.name,
              id: track.id,
              image: track.album.images[0].url,
              uri: track.uri,
            };
          })
        );
        setTrackLiabrary(
          data.body.items.map((track) => {
            return {
              name: track.name,
              id: track.id,
              image: track.album.images[0].url,
              uri: track.uri,
            };
          })
        );
        console.log(data, "MyTopTracks");
      });
      spotifyWebAPI.getMySavedTracks({ limit: 50 }).then((data) => {
        setMySavedTracks(
          data.body.items.map((track) => {
            return {
              name: track.track.name,
              id: track.track.id,
              image: track.track.album.images[0].url,
              uri: track.track.uri,
            };
          })
        );
        console.log(data, "MySavedTracks");
      });
      spotifyWebAPI.getMyTopArtists({ limit: 50 }).then((data) => {
        setMyTopArtists(
          data.body.items.map((artist) => {
            return {
              name: artist.name,
              id: artist.id,
              image: artist.images[0].url,
              uri: artist.uri,
              followers: artist.followers.total,
              genres: artist.genres,
              popularity: artist.popularity,
              type: artist.type,
            };
          })
        );
        setLiabrary(
          data.body.items.map((album) => {
            return {
              name: album.name,
              id: album.id,
              image: album.images[0].url,
              uri: album.uri,
              followers: album.followers.total,
              genres: album.genres,
              popularity: album.popularity,
              type: album.type,
            };
          })
        );
        console.log(data, "MyTopArtists");
      });
      spotifyWebAPI
        .getArtistAlbums("377MjbmPO6WvxAs3a9ET1I", { limit: 50 })
        .then((data) => {
          setArtistAlbums(
            data.body.items.map((album) => {
              return {
                name: album.name,
                id: album.id,
                image: album.images[0].url,
                uri: album.uri,
              };
            })
          );
        });
    } else {
      return;
    }

    // console.log(recentlyPlayed);
  }, [accessToken]);
  const getAlbumsFromArtist = (id) => {
    if (id) {
      spotifyWebAPI.getArtistAlbums(id, { limit: 50 }).then((data) => {
        setTrackLiabrary(
          data.body.items.map((album) => {
            return {
              name: album.name,
              id: album.id,
              image: album.images[0].url,
              uri: album.uri,
            };
          })
        );
      });
    }
  };

  const startLoop = () => {
    //   generate tracks uri by reduce method
    const tracksUri = trackLiabrary
      .reduce((acc, track) => {
        return acc + track.uri + ",";
      }, "")
      .split(",")
      .slice(0, -1);
    console.log(tracksUri, "tracksUri");
    context.setCurrentTrack({
      ...context.currentTrack,
      uri: tracksUri,
    });
  };
  const setAlbums = () => {
    setLiabrary(ArtistAlbums);
  };

  return (
    <>
      <div className="flex relative bg-slate-900 flex-col w-screen h-screen">
        <Navbar />
        <div className="flex w-full h-[75%] sm:h-[80%] bg-slate-900">
          <div className="flex flex-col w-full sm:w-1/2 overflow-hidden h-full">
            <div className="flex sm:gap-1 flex-col flex-wrap max-[450px]:justify-between overflow-x-auto relative bg-slate-900 w-full h-full overflow-hidden">
              {liabrary &&
                liabrary.map((artist) => {
                  console.log(artist?.type);
                  return (
                    <div
                      key={artist.id}
                      className={`flex ${
                        context?.currentTrack?.uri === artist?.uri
                          ? "bg-gradient-to-t from-indigo-500 to-violet-500"
                          : "bg-inherit"
                      } flex-col items-center   sm:gap-3`}
                    >
                      {artist?.type === "artist" ? (
                        <img
                          src={artist.image}
                          className="cursor-pointer w-[100px] h-[100px] object-cover"
                          onClick={() => getAlbumsFromArtist(artist.id)}
                        />
                      ) : (
                        <img
                          src={artist.image}
                          className="cursor-pointer w-[100px] h-[100px] object-cover"
                          onClick={() =>
                            context.setCurrentTrack({
                              name: artist.name,
                              id: artist.id,
                              image: artist.image,
                              uri: artist.uri,
                            })
                          }
                        />
                      )}
                      {context?.currentTrack?.uri === artist.uri ? (
                        <div className="boxContainer">
                          <div className="box box1"></div>
                          <div className="box box2"></div>
                          <div className="box box3"></div>
                          <div className="box box4"></div>
                          <div className="box box5"></div>
                        </div>
                      ) : // <BiPlayCircle className='right-0 max-[450px]:hidden text-4xl' />
                      null}
                      <h1 className="text-white w-full text-[.5rem] sm:text-xs max-[450px]:w-[60px] font-bold sm:w-[100px]">
                        {artist.name}
                      </h1>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="player fixed bottom-0 w-full z-50 ">
            {toggle ? (
              <div className="flex w-full p-5 gap-5 justify-between px-10 font-bold items-center backdrop-blur-lg  h-10">
                <BsFileArrowUp
                  className="text-2xl cursor-pointer"
                  onClick={() => setLiabrary(MyTopTracks)}
                />
                <BsFillPeopleFill
                  className="text-2xl cursor-pointer"
                  onClick={() => setLiabrary(MyTopArtists)}
                />
                <BsFillSaveFill
                  className="text-2xl cursor-pointer"
                  onClick={() => setLiabrary(MySavedTracks)}
                />
                <IoArrowRedo
                  className="text-2xl cursor-pointer"
                  onClick={() => setTrackLiabrary(MyTopTracks)}
                />
                <RxLoop
                  className="text-2xl cursor-pointer"
                  onClick={startLoop}
                />
              </div>
            ) : null}

            <div className="float-right absolute bottom-18 sm:right-44 sm:bottom-2 z-[99] right-0 font-bold text-2xl p-5 white">
              <HiOutlineCog6Tooth
                className="cursor-pointer"
                onClick={() => setToggle(!toggle)}
              />
            </div>
          </div>

          <div className="flex flex-col relative sideShadow  bg-slate-900 w-max  sm:w-1/2 h-full">
            <div className="flex flex-col  sm:p-4 max-[450px]:p-2 overflow-y-auto w-full h-full">
              {trackLiabrary &&
                trackLiabrary.map((track) => {
                  return (
                    <div
                      key={track.id}
                      className={`flex ${
                        context?.currentTrack?.uri === track.uri
                          ? "bg-gradient-to-t from-indigo-500 to-violet-500"
                          : "bg-inherit"
                      } p-2 cursor-pointer flex-col sm:flex-row items-center sm:justify-between  sm:gap-3`}
                      onClick={() =>
                        context.setCurrentTrack({
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
                      {context?.currentTrack?.uri === track.uri ? (
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
