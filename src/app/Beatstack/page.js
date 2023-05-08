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

export default function Beatstack() {
    const [accessToken,setAccessToken] = useState();
    const [Usersplaylists, setUsersplaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState({});
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({
        uri: "",
        name: "",
        artist: "",
        album: "",
        image: "",
        id: ""
    })
    useEffect(() => {
        console.log(accessToken);
        setAccessToken(localStorage.getItem('accessToken'));
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
        spotifyWebAPI.getUserPlaylists().then((data) => {
            setUsersplaylists(data.body.items.map((playlist) => {
                return {
                    name: playlist.name,
                    id: playlist.id,
                    image: playlist.images[0].url,
                    uri: playlist.uri
                }
            }))
            console.log(data, "playlist");
        }
        )
        console.log(recentlyPlayed);
    }, [accessToken])

    return (
        <>
            <div className="flex relative flex-col w-screen h-screen">
                <Navbar />
                <div className="flex flex-col w-full h-[90%]">
                    <div className="flex flex-col w-1/2 overflow-hidden h-full">
                        <div className="flex flex-col relative bg-slate-900 w-full h-full overflow-hidden">
                            <div className="flex sticky z-20 top-0 bg-transparent backdrop-blur-md h-2/3 shadow-2xl w-full">
                                <div className="flex rounded-full shadow-2xl absolute  top-[20%] left-[10%] bg-yellow-400 w-[250px] h-[250px]">
                                    <img src={currentPlaylist.image} alt="" />
                                </div>
                                <h1 className='absolute bottom-4 right-0 text-5xl left-[40%]'>Playlist Name</h1>
                            </div>
                            <div className="flex pt-40 pl-[10%] h-max flex-wrap pb-10 overflow-y-auto gap-20">
                                {
                                    Usersplaylists && Usersplaylists.map((playlist) => {
                                        return (
                                            <>
                                            <div className="flex flex-col items-center justify- gap-4" onClick={()=>setCurrentPlaylist({
                                                name: playlist.name,
                                                id: playlist.id,
                                                image: playlist.image,
                                                uri: playlist.uri
                                            })}>
                                                <img src={playlist.image} className="w-[200px] h-[200px] object-cover" />
                                                <h1 className="text-white text-2xl font-bold w-[200px]">{playlist.name}</h1>
                                            </div>
                                            <div className="flex flex-col items-center justify- gap-4">
                                                <img src={playlist.image} className="w-[200px] h-[200px] object-cover" />
                                                <h1 className="text-white text-2xl font-bold w-[200px]">{playlist.name}</h1>
                                            </div>
                                            <div className="flex flex-col items-center justify- gap-4">
                                                <img src={playlist.image} className="w-[200px] h-[200px] object-cover" />
                                                <h1 className="text-white text-2xl font-bold w-[200px]">{playlist.name}</h1>
                                            </div>
                                            <div className="flex flex-col items-center justify- gap-4">
                                                <img src={playlist.image} className="w-[200px] h-[200px] object-cover" />
                                                <h1 className="text-white text-2xl font-bold w-[200px]">{playlist.name}</h1>
                                            </div>
                                            <div className="flex flex-col items-center justify- gap-4">
                                                <img src={playlist.image} className="w-[200px] h-[200px] object-cover" />
                                                <h1 className="text-white text-2xl font-bold w-[200px]">{playlist.name}</h1>
                                            </div>
                                            </>
                                            
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
