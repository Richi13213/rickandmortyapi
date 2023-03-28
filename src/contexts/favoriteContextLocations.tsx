import React,{ useContext } from "react";
import { Ilocations } from "../interfaces/locationInterface";
export type FavoriteLocationProps={
    favoriteStateLocation:Ilocations[];
    addFavoriteLocation:(character:Ilocations) =>void;
    removeFavoriteLocation:(id:number)=>void;
}
export const favoriteContextLocations = React.createContext<FavoriteLocationProps>({} as FavoriteLocationProps);
