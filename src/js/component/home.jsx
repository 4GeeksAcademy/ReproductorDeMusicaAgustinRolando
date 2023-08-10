
import React, { useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	


	const [indexSong, setindexSong] = useState(null)
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
	console.log(songs);

	useEffect(() => {
		getSongsData();
	}, []);
	const play=() =>{
		if (isPlaying) {
			audioRef.current.pause()
			
		}else{
			audioRef.current.play()
		}

console.log(songURL + indexSong);
		setIsPlaying(!isPlaying)
	}

	return (

		<div className="body">
			<div className="text-center list-group list-group-numbered ">
				{songs.map((song, index) =>
					<li className="list-group-item bg-dark nombres" key={song.id} onClick={() => {
						setindexSong(song.url)
						// play()

					}}>{song.name}</li>
				)}
			</div>
			<ul className="nav justify-content-center barra">
				<li className="nav-item1">
					<a className="nav-link back"><i className="fa fa-square-caret-left"/></a>
				</li>
				<li className="nav-item2">
					<a className="nav-link play" ><i className={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}onClick={play}/></a>
				</li>
				<li className="nav-item3">
					<a className="nav-link next" ><i className="fa fa-square-caret-right"/></a>
				</li> 

			</ul>
			<audio ref={audioRef} src={songURL + indexSong} />
		</div>
	);
};

export default Home;
