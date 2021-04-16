


// INITIALIZE FRIENDS DATA

    export const setFriendsList = (friends) => (dispatch) =>
  
  dispatch({
    type: 'SET_FRIENDS_LIST',
    friends,
  })


// SET A FRIEND

  export const setFriend = (friend) => (dispatch) =>
  
  dispatch({
    type: 'SET_FRIEND',
    friend,
  })



export const removeFriend = (id) => (dispatch) =>
  
  dispatch({
    type: 'REMOVE_CHAT_MESSAGE',
    friend: {id},
  })


export const updateFriendStatus = (friend) => (dispatch) =>
  

  dispatch({
    type: 'UPDATE_FRIEND_STATUS',
   friend
  })

