import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
    const [movie, setMovie] = useState({});
    const [search, setSearch] = useState('');
    
    const API_KEY = "TÄSTÄ POISTIN API KEYN";
    const url = `http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`;

    const getMovie = async()=>{
      try {
        const response = await fetch(url);
         const data = await response.json()
         setMovie(data);
      } catch (error) {
          console.error(error);
      } 
    }

    const onInputChange = e =>{
      setSearch(e.target.value);
    }

    useEffect(()=> {
      getMovie();
    }, []);


  function checkResponse(data){
     if(data.Response==="True"){
       return(
         <div>
            <img src={data.Poster} alt=""/>
            <h4 style={{fontFamily: "poppins", color: "purple"}}>Title: {data.Title}</h4>
            <p style={{fontFamily: "poppins", color: "purple"}}>Year: {data.Year}</p>
            <p style={{fontFamily: "poppins", color: "purple"}}>Writer: {data.Writer}</p>
            
         </div>
       );
    }
      return (
        <p>Eipä löytynyt leffaa!</p>
      );
    }

   return(
      <div style={{margin: 50}}>
        <h1 style={{fontFamily: "poppins", color: "purple"}}>LEFFAHAKUKONE</h1>
         <input type="text" style={{marginBottom: 50, color: "purple"}} value={search} onChange={onInputChange}/>
         <button type="submit" style={{fontFamily: "poppins", color: "purple"}} onClick={getMovie}>Etsi parhaat leffat!</button>
         <br></br>   
         {checkResponse(movie)}
      </div>
   );
}

export default App;
