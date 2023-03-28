import React, { useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import "../styles/styleLocations.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Ilocations } from "../interfaces/locationInterface";
import { Iinfo } from "../interfaces/infoInterface";
import { favoriteContextLocations } from "../contexts/favoriteContextLocations";

export function Locations() {
  const { favoriteStateLocation, addFavoriteLocation, removeFavoriteLocation } =
    useContext(favoriteContextLocations);
  const [location, setlocation] = useState<Ilocations[]>([]);
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
        setlocation(location.concat(data.results));
        setInfo(data.info);
      })
      .catch((error) => {
        return error.message;
      });
  }
  function SearchlocationById(id: number): any {
    return location.find((item: any) => item.id === id);
  }
  function SearchFavoriteLocationById(id: number): any {
    return favoriteStateLocation.find((item: any) => item.id === id);
  }
  function AddToFavoritesLocations(id: number) {
    const data: Ilocations = SearchlocationById(id);
    addFavoriteLocation(data);
  }
  useEffect(() => {
    GetInfo("https://rickandmortyapi.com/api/location?page=1");
  }, []);
  return (
    <>
      <Menu />
      <div className="row align-items-center justify-content-center row-heigt">
        <div id="scrollableDiv" className="col-10 scroll-content">
          <InfiniteScroll
            dataLength={location.length}
            next={() => {
              GetInfo(info.next);
            }}
            style={{ display: "flex", flexDirection: "column" }}
            inverse={false}
            hasMore={true}
            loader={<></>}
            scrollableTarget="scrollableDiv"
          >
            {location.map((c: Ilocations) => {
              let favoriteButton:JSX.Element[] = [
                <button
                  key={"location-lis-button-like-" + c.id}
                  type="button"
                  className="btn"
                  onClick={() => {
                    AddToFavoritesLocations(c.id);
                  }}
                >
                  <i
                    className="bi bi-heart"
                    id={"favorite-" + c.id}
                    style={{ fontSize: "2rem", color: "#fff" }}
                  ></i>
                </button>,
              ];
              if (SearchFavoriteLocationById(c.id) !== undefined) {
                favoriteButton = [
                  <button
                    key={"location-list-button-dislike-" + c.id}
                    type="button"
                    className="btn"
                    onClick={() => {
                      removeFavoriteLocation(c.id);
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
                <div className="card my-1" key={"location-list-" + c.id}>
                  <div className="card-body">
                    <div className="row align-items-center justify-content-center">
                      <div className="col col-md my-3 my-lg-0 p-4">
                        <p className="text-start fw-bold fs-4">Name:</p>
                        <p className="text-center fs-4">{c.name}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        <p className="text-start fw-bold fs-4">Type:</p>
                        <p className="text-center  fs-4">{c.type}</p>
                      </div>
                      <div className="col col-md my-3 my-lg-0">
                        <p className="text-start fw-bold fs-4">Dimension:</p>
                        <p className="text-center  fs-4">{c.dimension}</p>
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
