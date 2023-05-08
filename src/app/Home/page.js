'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import { AiFillPlayCircle } from "react-icons/ai"



const spotifyWebAPI = new SpotifyWebApi({
    clientId: process.env.clientId,
});



export default function Main() {
    const [accessToken,setAccessToken] = useState()
    const [newReleases, setNewReleases] = useState([])
    const [counts, setCounts] = useState({
        newReleases: 10,
        categories: 10,
        artists: 5,
        playlist: 6
    })
    const [categories, setCategories] = useState([])
    const [artists, setArtists] = useState([])
    const [Playlists, setPlaylists] = useState([])

    const [currentTrack, setCurrentTrack] = useState({
        uri: "",
        name: "",
        artist: "",
        album: "",
        image: "",
        id: ""
    })
    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'));
    }, [])
    useEffect(() => {
        if (accessToken) {
            spotifyWebAPI.setAccessToken(accessToken);
            spotifyWebAPI.getNewReleases({ limit: 50, offset: 0, country: 'IN' }).then((data) => {
                console.log(data, "new releases");
                setNewReleases(data.body.albums.items);
            }
            )
            spotifyWebAPI.getCategories({ limit: 20, offset: 0, country: 'IN' }).then((data) => {
                console.log(data, "categories");
                setCategories(data.body.categories.items);
            }
            )
           
            spotifyWebAPI.getFollowedArtists().then((data) => {
                setArtists(data.body.artists.items);
                console.log(data, "followed artists");
            }
            );
            spotifyWebAPI.getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 }).then((data) => {
                console.log(data, "recommendations");
            })
            spotifyWebAPI.getFeaturedPlaylists({limit: 20}).then((data) => {
                setPlaylists(data.body.playlists.items);
                console.log(data, "featured playlist");
            }
            )
        }
        else {
            return;
        }
    }, [accessToken])

    return (
        <>
            <div className="flex gap-5 relative flex-col w-screen h-screen overflow-y-auto bg-gray-800">
                <Navbar />
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <h1 className='p-4 flex gap-4 justify-center items-center w-max text-xl sm:text-3xl'>New Releses <AiFillPlayCircle className='text-primary' /></h1>
                        {
                            counts.newReleases === 10 ? <button className=' text-xl sm:text-3xl text-primary  hover:text-blue-900 duration-300 transition-all pr-4' onClick={() => setCounts({ ...counts, newReleases: newReleases.length })}>See All</button> : <button className=' text-xl text-primary hover:text-blue-900 duration-300 transition-all sm:text-3xl pr-4' onClick={() => setCounts({ ...counts, newReleases: 10 })}>See Less</button>
                        }
                    </div>
                    <div className="flex w-full h-max overflow-x-auto overflow-y-hidden">

                        {
                            newReleases && newReleases.map((item) => {
                                return (

                                    <div className={`flex flex-col max-[450px]:h-[148px] backdrop-blur-2xl p-2 m-2 rounded-2xl  ${currentTrack.uri === item.uri ? "border-2 border-l-white/20 gap-4 bg-slate-900" : "hover:border-2 hover:border-l-white/20 gap-4 hover:bg-slate-900"} cursor-pointer`}
                                        key={item.id}
                                        onClick={() => setCurrentTrack({
                                            album: item.name,
                                            artist: item.artists[0].name,
                                            image: item.images[0].url,
                                            name: item.name,
                                            uri: item.uri,
                                            id: item.id
                                        })}>
                                        <img src={item.images[0].url} alt="" className='rounded-xl' width={300} height={300} />
                                        <div className="flex flex-col">
                                            <h1 className='text-white sm:w-[200px] w-[100px] text-lg'>{item.name.length <= 17 ? item.name : item.name.slice(0, 17) + "..."}</h1>
                                            <h3 className='text-white text-lg'>{item.artists[0].name.length <= 17 ? item.artists[0].name : item.artists[0].name.slice(0, 17) + "..."}</h3>
                                        </div>

                                    </div>
                                )
                            }
                            ).slice(0, counts.newReleases)
                        }
                    </div>
                </div>
{/* ---------------------------------------------Artists Here-------------------------------------------------------- */}

                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <h1 className='p-4 flex gap-4 justify-center items-center w-max text-xl sm:text-3xl'>Artists You should know about <AiFillPlayCircle className='text-primary' /></h1>
                        {
                            counts.artists === 5 ? <button className=' text-xl sm:text-3xl text-primary  hover:text-blue-900 duration-300 transition-all pr-4' onClick={() => setCounts({ ...counts, artists: artists.length })}>Show All</button> : <button className=' text-xl text-primary hover:text-blue-900 duration-300 transition-all sm:text-3xl pr-4' onClick={() => setCounts({ ...counts, artists: 5 })}>Show Less</button>
                        }
                    </div>
                    <div className="flex px-5 gap-10 w-full h-max overflow-x-auto overflow-y-hidden">

                        {
                            artists && artists.map((item) => {
                                return (

                                    <div className={`flex flex-col max-[450px]:h-[148px] backdrop-blur-2xl p-2 rounded-2xl  bg-gray-700 border-2 border-gray-600/80 cursor-pointer`}
                                        key={item.id}
                                    >
                                        <div className="img rounded-full overflow-hidden w-[300px] h-[300px] p-10">
                                            <img src={item.images[0].url} alt="" className='w-full h-full rounded-full ' />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className='text-white pl-10  font-bold text-2xl'>{item.name}</h1>
                                            <h3 className='text-white/60 pl-10 pb-5 text-xl'>{item.type}</h3>
                                        </div>

                                    </div>
                                )
                            }
                            ).slice(0, counts.artists)
                        }
                    </div>
                </div>
{/* ---------------------------------------------Playlists Here-------------------------------------------------------- */}

                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <h1 className='p-4 flex gap-4 justify-center items-center w-max text-xl sm:text-3xl'>Featured Playlists For You <AiFillPlayCircle className='text-primary' /></h1>
                        {
                            counts.playlist === 6 ? <button className=' text-xl sm:text-3xl text-primary  hover:text-blue-900 duration-300 transition-all pr-4' onClick={() => setCounts({ ...counts, playlist: Playlists.length })}>Explore All</button> : <button className=' text-xl text-primary hover:text-blue-900 duration-300 transition-all sm:text-3xl pr-4' onClick={() => setCounts({ ...counts, playlist: 6 })}>Explore Less</button>
                        }
                    </div>
                    <div className="flex px-5 gap-10 w-full h-max overflow-x-auto overflow-y-hidden">

                        {
                             Playlists&& Playlists.map((item) => {
                                return (

                                    <div className={`flex flex-col max-[450px]:h-[148px] backdrop-blur-2xl p-2 rounded-2xl  gap-4 cursor-pointer`}
                                        key={item.id}
                                    >
                                        <div className="img overflow-hidden w-[300px] h-[300px] ">
                                            <img src={item.images[0].url} alt="" className='w-full h-full ' />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className='text-white  font-bold text-2xl'>{item.name}</h1>
                                            <h3 className='text-white/60 pb-5 text-xl'>{item.type}</h3>
                                        </div>

                                    </div>
                                )
                            }
                            ).slice(0, counts.playlist)
                        }
                    </div>
                </div>
{/* ---------------------------------------------Categories Here-------------------------------------------------------- */}

                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <h1 className='p-4 flex gap-4 justify-center items-center w-max text-xl sm:text-3xl'>Categories  <AiFillPlayCircle className='text-primary' /></h1>
                        {
                            counts.categories === 10 ? <button className=' text-xl sm:text-3xl text-primary  hover:text-blue-900 duration-300 transition-all pr-4' onClick={() => setCounts({ ...counts, categories: categories.length })}>See All</button> : <button className=' text-xl text-primary hover:text-blue-900 duration-300 transition-all sm:text-3xl pr-4' onClick={() => setCounts({ ...counts, categories: 10 })}>See Less</button>
                        }
                    </div>
                    <div className="flex px-5 gap-10 w-full h-max overflow-x-auto overflow-y-hidden">

                        {
                             categories && categories.map((item) => {
                                return (

                                    <div className={`flex flex-col max-[450px]:h-[148px] backdrop-blur-2xl p-2 rounded-2xl  gap-4 cursor-pointer`}
                                        key={item.id}
                                    >
                                        <div className="img overflow-hidden w-[180px] h-[180px] ">
                                            <img src={item.icons[0].url} alt="" className='w-full h-full ' />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className='text-white  font-bold text-2xl'>{item.name}</h1>
                                            <h3 className='text-white/60 pb-5 text-xl'>{item.type}</h3>
                                        </div>

                                    </div>
                                )
                            }
                            ).slice(0, counts.categories)
                        }
                    </div>
                </div>
{/* ---------------------------------------------Footer Here-------------------------------------------------------- */}

                <div className="flex  gap-8 flex-col justify-center items-center w-full h-max  pb-32 p-10">
                    <div className="flex justify-center items-center gap-20">
                        <div className="flex justify-center items-center gap-4">
                            <div onClick={()=>window.open("https://www.linkedin.com/in/yash-simejiya-8288a6225/","_blank")} className="bg-developer bg-cover cursor-pointer w-[100px] h-[100px] rounded-full "></div>
                            <div className="flex flex-col">
                                <h3 className='text-2xl'>Made By Yash Simejiya</h3>
                                <a href='https://bmc.link/yashsoni' className='text-blue-500 text-xl font-bold'>buy me a coffe !!</a>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <div onClick={()=>window.open("https://www.linkedin.com/in/vishwas-bhambhani-91697b263/","_black")} className="bg-designer bg-cover cursor-pointer w-[100px] h-[100px] rounded-full "></div>
                            <div className="flex flex-col">
                                <h3 className='text-2xl'>Designed By Vishwas Bhambhani</h3>
                                <a href='https://bmc.link/yashsoni' className='text-blue-500 text-xl font-bold'>buy me a coffe !!</a>
                            </div>
                        </div>
                    </div>
                    <h1 className='font-bold text-xl'>Feedback, bugs, suggestions all <a className='text-blue-500' href="mailto:yashsoni48678@gmail.com">welcome</a>.</h1>
                    <h1 className='text-2xl'>&copy; 2023  BeatLeap</h1>
                </div>

{/* ---------------------------------------------Player Here-------------------------------------------------------- */}

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
                            height: 100,
                            sliderColor: '#64748B',

                        }}
                    />
                </div>
            </div>



        </>
    )
}
