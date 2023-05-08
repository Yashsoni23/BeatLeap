'use client';

import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { BiSearch } from "react-icons/bi"
import { getItem } from "localStorage"
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import { FaItunesNote } from "react-icons/fa"
import { AiFillPlayCircle } from "react-icons/ai"
import { BiPlayCircle } from "react-icons/bi"


const spotifyWebAPI = new SpotifyWebApi({
  clientId: process.env.clientId,
});

export default function Search() {
  const [accessToken, setAccessToken] = useState();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({
    uri: "",
    name: "",
    artist: "",
    album: "",
    image: "",
    id: ""
  })

  useEffect(()=>{
    setAccessToken(localStorage.getItem('accessToken'))
  },[]);
  useEffect(() => {
    console.log(accessToken);
    
    if (!accessToken) return;
    spotifyWebAPI.setAccessToken(accessToken);
    spotifyWebAPI.getMyRecentlyPlayedTracks().then((data) => {
      setRecentlyPlayed(data.body.items.map(track => {
        const smallestAlbumImage = track.track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, track.track.album.images[0])
        return {
          artist: track.track.artists[0].name,
          title: track.track.name,
          album: track.track.album.name,
          image: smallestAlbumImage.url,
          uri: track.track.uri,
          id: track.track.id
        }
      }
      ))
    })
    console.log(recentlyPlayed);
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return;
    if (!search) {
      setSearchResults([])
      return;
    };

    spotifyWebAPI.setAccessToken(accessToken);
    spotifyWebAPI.searchTracks(search).then((data) => {
      // console.log(data);
      setSearchResults(data.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, track.album.images[0])
        return {
          artist: track.artists[0].name,
          title: track.name,
          album: track.album.name,
          image: smallestAlbumImage.url,
          uri: track.uri,
          id: track.id
        }
      }
      ))

    })

  }, [search])




  return (
    <>
      <div className="flex w-screen h-screen flex-col">
        <Navbar />
        <div className="flex relative w-full lg:flex-row flex-col h-[84%] sm:h-[80%] ">

          <div className="flex max-[450px]:p-2 w-full lg:w-1/2 flex-col h-full lg:px-10 gap-4 items-center ">

            <div className="search relative w-full  rounded-full  h-max flex">
              <BiSearch className='absolute top-3 left-4 lg:top-2 lg:left-3 lg:text-2xl' />

              <input type="search" className='w-full h-10 text-l-white focus:border-2 focus:border-l-white lg:text-xl font-bold  lgp-10 p-5  outline-none rounded-full bg-slate-800 placeholder:text-l-white/20 pl-10 lg:pl-10 ' placeholder='What do you want to listen to?'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            <div className="flex flex-col rounded-3xl bg-slate-900 h-full w-full overflow-y-auto p-4">
              {
                searchResults.length === 0 ?
                  <div className="flex gap-4 w-full h-full justify-center items-center font-bold text-2xl">
                    <FaItunesNote className='text-4xl' />
                    <h1>No tracks Found</h1>
                  </div>
                  : ""
              }
              {
                searchResults && searchResults.map((result, index) => {

                  return (
                    <>

                      <div className={`flex mb-1 justify-start items-center  ${currentTrack.uri === result.uri ? "bg-gradient-to-t from-indigo-500 to-violet-500" : "bg-inherit"} cursor-pointer hover:bg-slate-700 gap-4 sm:p-2 pl-2 rounded-xl`} key={result?.id} onClick={() => setCurrentTrack({
                        uri: result.uri,
                        name: result.name,
                        artist: result.artist,
                        album: result.album,
                        image: result.image,
                      })}>
                        <img src={result.image} alt="album-image" />
                        <div className="flex flex-col p-1 sm:p-2 w-full" >
                          <h3 className='sm:text-sm text-xs font-bold'>{result.title}</h3>
                          <p className='sm:text-xs text-[.6rem]  font-light'>{result.artist}</p>
                        </div>
                        {
                          currentTrack.uri === result.uri ?
                            <div class="boxContainer">
                              <div class="box box1"></div>
                              <div class="box box2"></div>
                              <div class="box box3"></div>
                              <div class="box box4"></div>
                              <div class="box box5"></div>
                            </div>
                            :
                            <BiPlayCircle className='right-0 text-4xl' />
                        }
                      </div>

                    </>
                  )

                })
              }
            </div>

          </div>
          <div className="player fixed bottom-0 w-full z-50 ">
            <SpotifyPlayer
              play={true}
              token={accessToken}
              uris={[currentTrack.uri]}
              styles={{
                bgColor: '#0F172A',
                activeColor: '#fff',
                trackNameColor: '#fff',
                trackArtistColor: '#fff',
                trackAlbumColor: '#fff',
                trackImageColor: '#fff',
                trackDurationColor: '#fff',
                trackProgressColor: '#fff',
                trackTimeColor: '#fff',
                trackCurrentTimeColor: '#fff',
                color: '#fff',
                loaderColor: '#fff',
                sliderTrackColor: '#fff',
                loaderSize: 48,
                altColor: '#fff',
                sliderHeight: 8,
                sliderHandleColor: '#5B21B6',
                height: 80,
                sliderColor: '#64748B',

              }}
            />
          </div>
          <div className="lg:flex hidden relative overflow-hidden flex-col overflow-y-auto  rounded-3xl w-1/2  h-full bg-slate-600">
            <h1 className='sticky top-0 text-white font-bold text-lg drop-shadow-2xl bg-gradient-to-t from-indigo-500 to-violet-500 p-3 w-full shadow-2xl'>Recently Played</h1>
            {
              recentlyPlayed.length === 0 ?
                <div className="flex gap-4 w-full h-full justify-center items-center font-bold text-2xl">
                  <FaItunesNote className='text-4xl' />
                  <h1>No tracks Found</h1>
                </div>
                :
                recentlyPlayed && recentlyPlayed.map((result, index) => {

                  return (
                    <>
                      <div className={`flex mb-1 justify-start pr-8 ${currentTrack.uri === result.uri ? "bg-gradient-to-t from-indigo-500 to-violet-500" : "bg-inherit"} items-center cursor-pointer hover:bg-slate-700 gap-4 p-2 rounded-xl`} key={result.id} onClick={() => setCurrentTrack({
                        uri: result.uri,
                        name: result.name,
                        artist: result.artist,
                        album: result.album,
                        image: result.image,
                      })}>
                        <img src={result.image} alt="album-image" />
                        <div className="flex flex-col p-1 sm:p-2 w-full">
                          <h3 className='sm:text-sm text-xs font-bold'>{result.title}</h3>
                          <p className='sm:text-xs text-[.6rem]  font-light'>{result.artist}</p>
                        </div>
                        {
                          currentTrack.uri === result.uri ?
                            <div class="boxContainer">
                              <div class="box box1"></div>
                              <div class="box box2"></div>
                              <div class="box box3"></div>
                              <div class="box box4"></div>
                              <div class="box box5"></div>
                            </div>
                            :
                            <BiPlayCircle className='right-0 text-4xl' />
                        }
                      </div>

                    </>
                  )

                })

            }







          </div>
        </div>
      </div>
    </>
  )
}
