






// INITIALIZE MESSAGES DATA


    export const setChatMsgs = (message) => (dispatch) =>
  
  dispatch({
    type: 'SET_CHAT_LIST_MESSAGE',
    message,
  }) 





    // SET NEW MESSAGE


  export const setMsg = (message) => (dispatch) =>
  
  dispatch({
    type: 'SET_CHAT_MESSAGE',
    message,
  })
    

// UPDATE A  MESSAGE DATA


export const updateMsgStatus = (data) => (dispatch) =>
  

  dispatch({
    type: 'UPDATE_CHAT_STATUS',
    message: data
  })


    
    // REMOVE A MESSAGE
export const removeMsg = (id) => (dispatch) =>
  
  dispatch({
    type: 'REMOVE_CHAT_MESSAGE',
    message_id: id,
  })







