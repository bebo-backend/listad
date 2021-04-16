
// SET SCREEN AND DATA
export const setScreen = (dataObj) => (dispatch) =>
  
  dispatch({
    type: 'SET_SCREEN',
    payload: dataObj,
  })
  