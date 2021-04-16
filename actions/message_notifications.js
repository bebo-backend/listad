// SET MESSAGE NOTITIFCATION
  export const setMsgNotify = (message) => (dispatch) =>
  
  dispatch({
    type: 'SET_NOTIFY_MESSAGE',
    message,
  })


// INITIALIZE MESSAGES NOTIFICATION LIST


    export const setListMsg = (message) => (dispatch) =>
  
  dispatch({
    type: 'SET_LIST_NOTIFY_MSG',
    message,
  }) 

// REMOVE MESSAGE NOTIFICATIONS
  
  export const removeMsgNotify = (id) => (dispatch) =>
  
  dispatch({
    type: 'REMOVE_LIST_NOTIFY_MSG',
    message: {id},
  })
  