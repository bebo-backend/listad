import { combineReducers } from 'redux'
import * as types from './types'

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1
    case types.DECREMENT:
      return state - 1
    case types.RESET:
      return 0
    default:
      return state
  }
}

// INITIAL TIMER STATE
const initialScreenState = {
  screen:0
}

// TIMER REDUCER
const ScreenReducer = (state = initialScreenState, { type, payload }) => {
  

  switch (type) {
    case 'SET_SCREEN':
      return {
       ...state,...payload
      }
      
    default:
      return state
  }
}


const messageNotify = (state = [], { type, message }) => {
 console.log(type)

  switch (type) {
    case 'SET_NOTIFY_MESSAGE':
      
      const messages = state.filter(e=>e._id==message._id)

      if (messages.length <=0){
return [
       ...state,message
      ]

      } else {

        return state
      }
      

      break;

    case 'SET_LIST_NOTIFY_MSG':
      return message

      break;

    case 'REMOVE_LIST_NOTIFY_MSG':
      // console.log(e._id,message.id)
      return state.filter(e=>e._id !==message.id)
      break;
      
    default:
      return state
      break;
  }
}

const chatMessage = (state = [], { type, message }) => {
 console.log(type)

  switch (type) {


    case 'SET_CHAT_LIST_MESSAGE':
      return message

      break;

    case 'SET_CHAT_MESSAGE':    
      

      if (message){
return [
       ...state,message
      ]

      } else {

        return state
      }
      

      break;



    case 'REMOVE_CHAT_MESSAGE':
      return state.filter(e=>e._id !==message._id)
      break;

    case 'UPDATE_CHAT_STATUS':
      const {id,status} = message
      const updateMsg = state.filter(message=>message._id ==id && message.status=="unread")
      
      if (updateMsg.length > 0){

const newData = updateMsg[0]
newData.status="read"


return [
       ...state.filter(message=>message._id !==newData._id ),newData
      ]

      } else {


        return state
      }

      break;
      
    default:
      return state
      break;
  }
}





const FriendsReducer = (state = [], { type, friends=[],friend={} }) => {
 console.log(type)

  switch (type) {
    case 'SET_FRIEND':
      
      const data = state.filter(e=>e._id==friend._id)

      if (data.length <=0){
return [
       ...state,friend
      ]

      } else {

        return state
      }
      

      break;

    case 'SET_FRIENDS_LIST':
      return friends

      break;



    case 'REMOVE_FRIEND':
      return state.filter(e=>e._id !==friend.id)
      break;

    case 'UPDATE_FRIEND_STATUS':

      const {id,status} = friend
      console.log('id',id)

      const updateUser = state.filter(e=>e._id == String(id))
      
      if (updateUser.length > 0){

const newData = updateUser[0]
newData.status = status

      console.log('change User',newData.username,newData.status)



return [
       ...state.filter(e=>e._id !==newData._id ),newData
      ]

      } else {


        return state
      }
      // return state
      

      break;
      
    default:
      return state
      break;
  }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  screen: ScreenReducer,
  messageNotify: messageNotify,
  message: chatMessage,
  friends:FriendsReducer
}

export default combineReducers(reducers)
