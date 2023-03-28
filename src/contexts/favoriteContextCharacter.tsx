import React,{ useContext } from "react";
import { Icharacter } from "../interfaces/characterInterface";
export type FavoriteCharacterProps={
    favoriteStateCharacter:Icharacter[];
    addFavoriteCharacter:(character:Icharacter) =>void;
    removeFavoriteCharacter:(id:number)=>void;
}
export const favoriteContextCharacter = React.createContext<FavoriteCharacterProps>({} as FavoriteCharacterProps);
