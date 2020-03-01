import React, { useEffect } from "react";
import "./app.css";
import { connect } from "react-redux";
import {
  fechingFluxResponse,
  nextOrPrevPage
} from "../Redux/action";

import OneCard from "./Organism/OneCard";
import TextButtons from "./Molecules/OtherPageButton";
import Loader from "./Loader/Loader";

function App({
  fechingFluxResponse,
  nextOrPreviousPage,
  loading,
  heroArr,
  nextPage,
  prevPage,
  hiddenButton
}) {
  function changePage(page) {
    nextOrPreviousPage(page);
  }

  useEffect(() => {
    fechingFluxResponse("https://rickandmortyapi.com/api/character/");
  }, [fechingFluxResponse]);

  return (
    <div className="cardContainer">
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {heroArr.map(item => (
            <OneCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
          <TextButtons
            nextPage={nextPage}
            prevPage={prevPage}
            changePage={changePage}
            hiddenButton={hiddenButton}
          />
        </React.Fragment>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    heroArr: state.responseArr.slice(0, 10),
    nextPage: state.next,
    prevPage: state.prev,
    hiddenButton: state.hiddenBtn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fechingFluxResponse: page => dispatch(fechingFluxResponse(page)),
    nextOrPreviousPage: page => dispatch(nextOrPrevPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);