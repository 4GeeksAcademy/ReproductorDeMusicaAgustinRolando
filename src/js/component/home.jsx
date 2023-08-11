
import React, { useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {



	// const [position, setPosition] = useState(0)

	const [indexSong, setindexSong] = useState(0)
	const audioRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [songs, setSongs] = useState([])
	const songURL = "https://playground.4geeks.com/apis/fake/sound/"

	const getSongsData = () => {
		//HACER LA PETICION
		fetch("https://playground.4geeks.com/apis/fake/sound/songs")
			.then((response) => response.json())//CONVERTIR A .JSON
			.then((data) => setSongs(data))//GUARDAR	
			.catch((error) => console.log(error));//ATRAPAR


	}
	// console.log(songs);

	useEffect(() => {
		getSongsData();
	}, []);
	const play = () => {
		if (isPlaying) {
			audioRef.current.pause()

		} else {
			audioRef.current.play()
		}

		console.log(songURL + indexSong);
		setIsPlaying(!isPlaying)
	}
	const start2 =(id)=>{
		// 
		setIsPlaying(true)
		setindexSong(id)
		songs.filter(song=>{
			if (song.id==id) {
			audioRef.current.src = 	"https://playground.4geeks.com/apis/fake/sound/" + song.url
			audioRef.current.play()
			console.log(indexSong);
			}
			
		})
	}
//boton para atras
	const back=()=> {
	
		songs.filter(song=>{
			if (song.id==indexSong && song.id!==0) {

			audioRef.current.src = 	"https://playground.4geeks.com/apis/fake/sound/" + songs[indexSong -1].url;
			setindexSong(indexSong -1)
			audioRef.current.play()
			console.log(audioRef.current,);
			}
		})
	
		
	}
	const next=()=>{
		songs.filter(song=>
			
			{if (song.id==indexSong) {

			audioRef.current.src = 	"https://playground.4geeks.com/apis/fake/sound/" + songs[indexSong +1].url;
			setindexSong(indexSong +1)
			audioRef.current.play()
			console.log(audioRef.current,);
			}
			
		})

	}


	return (

		<div className="body">
			<div className="text-center list-group list-group-numbered ">
				{songs.map((song, index) =>
					<li className="list-group-item bg-dark nombres" key={song.id} onClick={() => {
						
						start2(song.id)

					}}>{song.name}</li>
				)}
			</div>
			<ul className="nav justify-content-center barra">
				<li className="nav-item1">
					<a className="nav-link back"><i className="fa fa-square-caret-left" onClick={back} /></a>
				</li>
				<li className="nav-item2">
					<a className="nav-link play" ><i className={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"} onClick={play} /></a>
				</li>
				<li className="nav-item3">
					<a className="nav-link next" ><i className="fa fa-square-caret-right" onClick={next}/></a>
				</li>

			</ul>
			<audio ref={audioRef} src= " " />
		</div>
	);
};

export default Home;
