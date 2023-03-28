import React, { useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import "../styles/styleHome.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Icharacter } from "../interfaces/characterInterface";
import { Iinfo } from "../interfaces/infoInterface";
import { favoriteContextCharacter } from "../contexts/favoriteContextCharacter";

export function Home() {
  const {
    favoriteStateCharacter,
    addFavoriteCharacter,
    removeFavoriteCharacter,
  } = useContext(favoriteContextCharacter);
  const [character, setCharacter] = useState<Icharacter[]>([]);
  const [info, setInfo] = useState<Iinfo>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });

  function GetInfo(url: string) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(character.concat(data.results));
        setInfo(data.info);
      })
      .catch((error) => {
        return error.message;
      });
  }
  function SearchCharacterById(id: number): any {
    return character.find((item: any) => item.id === id);
  }
  function SearchFavoriteById(id: number): any {
    return favoriteStateCharacter.find((item: any) => item.id === id);
  }
  function AddToFavorites(id: number) {
    const data: Icharacter = SearchCharacterById(id);
    addFavoriteCharacter(data);
  }
  useEffect(() => {
    GetInfo("https://rickandmortyapi.com/api/character?page=1");
  }, []);
  return (
    <>
      <Menu />
      <div className="row align-items-center justify-content-center row-heigt">
        <div id="scrollableDiv" className="col-10 scroll-content">
          <InfiniteScroll
            dataLength={character.length}
            next={() => {
              GetInfo(info.next);
            }}
            style={{ display: "flex", flexDirection: "column" }}
            inverse={false}
            hasMore={true}
            loader={<></>}
            scrollableTarget="scrollableDiv"
          >
            {character.map((c: Icharacter) => {
              let favoriteButton:JSX.Element[] = [
                <button
                  key={"home-lis-button-like-" + c.id}
                  type="button"
                  className="btn"
                  onClick={() => {
                    AddToFavorites(c.id);
                  }}
                >
                  <i
                    className="bi bi-heart"
                    id={"favorite-" + c.id}
                    style={{ fontSize: "2rem", color: "#fff" }}
                  ></i>
                </button>,
              ];
              if (SearchFavoriteById(c.id) !== undefined) {
                favoriteButton = [
                  <button
                    key={"home-list-button-dislike-" + c.id}
                    type="button"
                    className="btn"
                    onClick={() => {
                      removeFavoriteCharacter(c.id);
                    }}
                  >
                    <i
                      className="bi bi-heart-fill"
                      id={"favorite-" + c.id}
                      style={{ fontSize: "2rem", color: "#fff" }}
                    ></i>
                  </button>,
                ];
              }
              return (
                <div className="card my-1" key={"home-list-" + c.id}>
                  <div className="card-body">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-lg-2">
                        <img
                          className="img-fluid mx-auto d-block"
                          src={c.image}
                        />
                      </div>
                      <div className="col col-md my-3 my-lg-0 p-4">
                        <p className="text-start fw-bold fs-4">Name:</p>
                        <p className="text-center fs-4">{c.name}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        <p className="text-start fw-bold fs-4">Species:</p>
                        <p className="text-center  fs-4">{c.species}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        <p className="text-start fw-bold fs-4">Gender:</p>
                        <p className="text-center  fs-4">{c.gender}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        <p className="text-start fw-bold fs-4">Origin:</p>
                        <p className="text-center  fs-4">{c.origin.name}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        <p className="text-start fw-bold fs-4">Location:</p>
                        <p className="text-center  fs-4">{c.location.name}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        {favoriteButton}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
