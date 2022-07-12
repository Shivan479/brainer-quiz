const defautState = {
    loading: false,
    currentLevel: 0,
  };
  
  export default (state = defautState, action) => {
    switch (action.type) {
      case 'START_LV1':
        return {
          ...state,
          currentLevel: 1,
        };
      default:
        return state;
    }
  };
  