import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  GET_CURRENT_IMAGE,
  GET_CURRENT_HERO
} from "./actionTypes";
import store from "./store";

const fechingData = () => {
  return {
    type: FETCH_DATA
  };
};

const fechingDataSuccess = response => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: response
  };
};

const fechingDataError = error => {
  return {
    type: FETCH_DATA_ERROR,
    payload: error
  };
};

const getCurrentImage = id => {
  return {
    type: GET_CURRENT_IMAGE,
    payload: id
  };
};

const openLernMorePopup = id => {
    return {
        type: GET_CURRENT_HERO,
        payload: id
      };
};


const fechingFluxResponse = page => {
  store.dispatch(fechingData());
  return dispatch => {
    fetch(page)
      .then(response => response.json())
      .then(response => {
        dispatch(fechingDataSuccess(response));
      })
      .catch(error => {
        dispatch(fechingDataError(error));
      });
  };
};

const nextOrPrevPage = page => {
  if (page === "") {
    return;
  }
  store.dispatch(fechingData());
  return dispatch =>
    fetch(page)
      .then(response => response.json())
      .then(response => {
        dispatch(fechingDataSuccess(response));
      })
      .catch(error => {
        dispatch(fechingDataError(error));
      });
};

export {
  fechingData,
  fechingDataSuccess,
  fechingDataError,
  getCurrentImage,
  fechingFluxResponse,
  nextOrPrevPage,
  openLernMorePopup
};
