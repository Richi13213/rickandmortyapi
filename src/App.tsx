import React,{useContext, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './routes/Home';
import { Locations } from './routes/Locations';
import { Favorites } from './routes/Favorites';
import {ErrorPage} from './routes/ErrorPage';
import { Icharacter } from './interfaces/characterInterface';
import { Ilocations} from './interfaces/locationInterface';
// import { FavoriteProvider } from './contexts/favoriteProvider';
import { favoriteContextCharacter } from './contexts/favoriteContextCharacter';
import { favoriteContextLocations } from './contexts/favoriteContextLocations';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);
function App() {
  const [favoriteStateCharacter,setFavoriteStateCharacter]=useState<Icharacter[]>([]);
  const [favoriteStateLocation,setFavoriteStateLocation]=useState<Ilocations[]>([]);
    const addFavoriteCharacter =( character:Icharacter)=>{
      const list = favoriteStateCharacter.concat(character)
      setFavoriteStateCharacter(list);
    }
    const removeFavoriteCharacter=(id:number)=>{
      const list= favoriteStateCharacter.filter((item:Icharacter) => item.id !== id);
      setFavoriteStateCharacter(list);
    }
    const addFavoriteLocation =(location:Ilocations)=>{
      const list = favoriteStateLocation.concat(location)
        setFavoriteStateLocation(list);
    }
    const removeFavoriteLocation=(id:number)=>{
      const list= favoriteStateLocation.filter((item:Ilocations) => item.id !== id);
      setFavoriteStateLocation(list);
    }
  return (
    <favoriteContextCharacter.Provider value={{
      favoriteStateCharacter,
      addFavoriteCharacter,
      removeFavoriteCharacter
    }}>
      <favoriteContextLocations.Provider value={{
        favoriteStateLocation,
        addFavoriteLocation,
        removeFavoriteLocation
      }}>
        <RouterProvider router={router}></RouterProvider>
      </favoriteContextLocations.Provider>
    </favoriteContextCharacter.Provider>
  );
}

export default App;
