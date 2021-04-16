
import React, {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {CLOUDINARY_URL} from "../components/contrib/config"
import DataView from "./data-view"
import MemberScreen from "./member-screen"
import ProfileScreen from "./profile-screen"
import ChatScreen from "./chat-screen"
import useSWR,{ mutate }  from 'swr'
import axios from 'axios'
import {setScreen} from '../actions/screen_data'
import useUser from '../lib/useUser'

const More = ({socket={}})=>{
 
 const { user, mutateUser } = useUser()
const dispatch = useDispatch()
const screen = useSelector(state=>state.screen)



  useEffect(() => {
    dispatch(setScreen({socket:socket}))

  }, [dispatch])



// const [screen,setScreen] = useState(0)



 
 // console.log('screens --- ',screen)
const getScreen =()=>{


  switch (screen.screen){

    case 0:{

      return <MemberScreen  />
      break;
    }

     case 1:{

      return <ProfileScreen   />
      break;
    }

     case 2:{

      return <ChatScreen  />
      break;
    }

    default:{

      return <MemberScreen  />
      break;
    }
  }
}

return (

<div className="row my-0 " style={{paddingTop:'80px'}} >
       

<div className="col-sm-12 col-md-4 col-lg-3  pb-2 px-0 " style={{borderRadius:'0px',background:'white'}}>

<div className="pr-0">
<DataView socket={socket}  />


</div>
</div>

<div className="col-sm-12 col-md-8 col-lg-9 card-box shadow-none pb-0 " style={{borderRadius:'0px'}}>

{getScreen()}


</div>
                </div>

	)

}




export default More