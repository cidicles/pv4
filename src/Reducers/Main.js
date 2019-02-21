const initialState = {
  bg: null,
};

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BG':
      return Object.assign({}, state, {
        bg: action.bg
      });
    default:
      return initialState;
  }
};

export default mainReducer;
