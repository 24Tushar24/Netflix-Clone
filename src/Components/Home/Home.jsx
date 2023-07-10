import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from "axios";
// import {GenIcon} from 'react-icons';
// import {IconsManifest} from 'react-icons';


const apiKey="b7fd6262b5fbded69526491f164e5144"
const url="https://api.themoviedb.org/3"
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming";
const nowPlaying="now_playing";
const topRated="top_rated";
const popular="popular";



const Card =({img})=>(
  
  <img className='card' src={img} alt='cover' />

)


const Row = ({title, arr=[{
  
}]})=>(
    <div className='row'>

    <h2>{title}</h2>
    <div>
  {
    arr.map((item,index)=>(
      <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
    ))
  }
   
  
    </div>
   
    </div>

  )



const Home = () => {

  const [upcomingMovies,setupcomingMovies] = useState([]);
  const [nowPlayingMovies,setnowPlayingMovies] = useState([]);
  const [topRatedMovies,settopRatedMovies] = useState([]);
  const [popularMovies,setpopularMovies] = useState([]);

  useEffect(()=>{
      const fetchUpcoming=async()=>{
          const {data : {results} }= await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=8`);
          setupcomingMovies(results)
      };
      const fetchtopRated=async()=>{
          const {data : {results} }= await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&page=2`);
          settopRatedMovies(results)
      };
      const fetchnowPlaying=async()=>{
        const {data : {results} }= await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=4`);
        setnowPlayingMovies(results)
    };
      const fetchpopular=async()=>{
          const {data : {results} }= await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&page=4`);
          setpopularMovies(results)
      };
     

      fetchUpcoming();
      fetchnowPlaying();
      fetchtopRated();
      fetchpopular();
  }, [])

  return (


   <section className='home'>
    <div className="banner">
       
        {upcomingMovies[0] &&  <h1>{upcomingMovies[0].original_title}</h1>}
        {upcomingMovies[0] &&  <p>{upcomingMovies[0].overview}</p>} 
        <div>
        <button> ▶ Play</button>
        <button>MY LIST +</button>
        </div>
       

     </div>
    <Row title={"Upcoming Movies"} arr= {upcomingMovies}/>
    <Row title={"Top Rated"} arr= {topRatedMovies}/>
    <Row title={"Now Playing"} arr= {nowPlayingMovies}/>
    <Row title={"Popular"} arr= {popularMovies}/>
    
    
    
   </section>
  )
}

export default Home