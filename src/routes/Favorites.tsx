import React, { JSXElementConstructor, useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import "../styles/styleFavorite.css";
import { Icharacter } from "../interfaces/characterInterface";
import { favoriteContextCharacter } from "../contexts/favoriteContextCharacter";
import { favoriteContextLocations } from "../contexts/favoriteContextLocations";
import { Ilocations } from "../interfaces/locationInterface";
export function Favorites() {
  const {
    favoriteStateCharacter,
    addFavoriteCharacter,
    removeFavoriteCharacter,
  } = useContext(favoriteContextCharacter);
  const { favoriteStateLocation, addFavoriteLocation, removeFavoriteLocation } =
    useContext(favoriteContextLocations);
    let messageEmpty:JSX.Element[]=[];
    if(favoriteStateLocation.length===0 && favoriteStateCharacter.length===0){
        messageEmpty=[
        <div className="card">
            <div className="card-body">
                <p className="text-center fs-1 fw-bolder">There's no favorites yet</p>
                <img
                    className="img-fluid mx-auto d-block empty"
                    src="./resources/img/img1.jpeg"
                />
            </div>
        </div>]
    }
  return (
    <>
      <Menu />
      <div className="row align-items-center justify-content-center row-heigt">
        <div id="scrollableDiv" className="col-10 scroll-content">
          {favoriteStateCharacter.map((c: Icharacter) => {
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
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {favoriteStateLocation.map((c: Ilocations) => {
            return (
              <div className="card my-1" key={"home-list-" + c.id}>
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
                      <button
                        key={"home-list-button-dislike-" + c.id}
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
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {messageEmpty}
        </div>
      </div>
    </>
  );
}
