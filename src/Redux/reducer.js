import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  GET_CURRENT_IMAGE,
  GET_CURRENT_HERO
} from "./actionTypes";

const initialState = {
  responseArr: [],
  loading: false,
  errorName: "",
  next: "",
  prev: "",
  image: "",
  heroId: {}
};

const requestReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        responseArr: action.payload.results,
        loading: false,
        next: action.payload.info.next,
        prev: action.payload.info.prev
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        responseArr: [],
        loading: false,
        errorName: action.payload
      };
    case GET_CURRENT_IMAGE:
      const heroId = action.payload;
      const currentHero = state.responseArr.find(({ id }) => id === heroId);
      return {
        ...state,
        image: currentHero.image,
        heroId: {}
      };
    case GET_CURRENT_HERO:
      console.log(action.payload);
      
      const heroId1 = action.payload;
      const currentHero1 = state.responseArr.find(({ id }) => id === heroId1);
      return {
        ...state,
        heroId: currentHero1,
        image: ''
      };
    default:
      return state;
  }
};

export default requestReduser;
