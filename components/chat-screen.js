
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"
import ListUser from "./list-user"

import useSWR,{ mutate }  from 'swr'
import axios from 'axios'

import useUser from '../lib/useUser'

import {useSelector,useDispatch} from 'react-redux'

import {setScreen} from '../actions/screen_data'

import io from 'socket.io-client';

import {setMsg,setChatMsgs} from '../actions/chat_messages'
import {removeMsgNotify} from '../actions/message_notifications'


// const socket = io('/group-home')

let socket = {on:f=>f,emit:f=>f}

const Screen = ({})=>{

const {user} = useUser()

  const {latestmessage,screenData} = useSelector(state=>({screenData:state.screen,latestmessage:state.message}))

  const {screen,username} = screenData

  socket = screenData.socket ? screenData.socket :socket


const dispatch = useDispatch()
  

const [message,setMessage] = useState("")
const [typing,setTyping] = useState("false")
const [attach,setAttachVal] = useState(false)


const from_username = user?.username, to_username = username

const {data:account,mutate:mutateAccount} = useSWR(()=>'/api/dashboard/account/'+username,axios)
// const {data:messages,mutate:mutateMessages} = useSWR(()=>'/api/getchatmessages/'+from_username+'/'+to_username,axios)


useEffect(()=>{


	  try {


  axios.get('/api/getchatmessages/'+from_username+'/'+to_username).then((data)=>{
 



if (data.data.docs.length > 0){

  const fr = data.data.docs

dispatch(setChatMsgs(fr))


}


   })

  } catch(err) {


    ;
  }








socket.on("message.receive.typing", data=>{

	setTyping("true")

	
})




socket.on("message.receive.cancel", data=>{

	setTyping("false")
	// console.log('cancel')

	
})







},[typing])



const setAttach=e=>{

e.preventDefault()
	setAttachVal(!attach)
}



   const messageSend= (e)=>{
   	e.preventDefault()


if (message){
	socket.emit('message.typing.stop',{to:username,from:user?.username})

socket.emit('message.new.text',{to:username,from:user?.username,text:message})

setMessage("")


}

   	
   }

  const messageChange= (e)=>{
   	e.preventDefault()
   	setMessage(e.target.value)

   	// console.log('target',e.target.value=="")

   	   	if (e.target.value == ""){

socket.emit('message.typing.stop',{to:username,from:user?.username})

   		
   	} else {

socket.emit('message.typing.start',{to:username,from:user?.username})

   	}

   	
   }


const backScreen= e=>{

socket.emit('message.typing.stop',{to:username,from:user?.username});

dispatch(setScreen({screen:0}));


}


return (


<div className="mx-0 my-2 pr-2">


<div class="chat-profile-header clearfix row">
<i class="icon-copy dw dw-return-1 col-1 font-24 pt-3 text-muted" 
onClick={backScreen}></i>
									<div class="left col-10">

										<div class="clearfix">

											<div class="chat-profile-photo">
													
												   {account  && account.data.user.image ?
                   <img src={CLOUDINARY_URL+"w_230,h_230,g_face,r_max,c_thumb/"+account.data.user.image}  />
                   : <img src="/vendors/images/img2.jpg" alt=""  />
                  }
                 
											</div>
											<div class="chat-profile-name">
												<h3 style={{color:'black'}} >{username}
												{account && account.data && account.data.user && account.data.user.status == "online" ?
												<i class="fa fa-circle text-light-green mx-2 font-12"></i>:
<i class="fa fa-circle  mx-2 font-12 text-muted"></i>

												 } </h3>
												{account && account.data && account.data.user &&  account.data.user.location &&	<span>{account && account.data && account.data.user && account.data.user.location.city} , {account && account.data.user.location.state}</span>}
											</div>
										</div>
									</div>
									<div class="right text-left pt-0 pr-3 col-1 ">


										<div class="mr-2">
											<span class="dropdown py-3 btn btn-link c">

                <a class=" px-0 cursor-pointer dropdown-toggle no-arrow" data-toggle="dropdown" >
     <i class="icon-copy dw dw-menu-2  font-24"></i>
 
          </a>


              <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">

            <a class="dropdown-item" onClick={e=> {
                e.preventDefault()
               
              
              }}><i class="dw dw-user1"></i> View Profile</a>

                <a class="dropdown-item" onClick={e=> {
                e.preventDefault()
             
              }}><i class="dw dw-group"></i> Group Invite</a>

                <a class="dropdown-item" onClick={e=> {
                e.preventDefault()
             
              }}><i class="dw dw-add"></i> Introduce User</a> 

                <a class="dropdown-item" onClick={e=> {
                e.preventDefault()
             
              }}><i class="dw dw-smartphone"></i> Call </a>
           
              
              </div>
            </span>

											
										</div>

										

									</div>
								</div>


		


<div className=" p-0 member-container w-100" >


								<div class="chat-box w-100">

					
								<Message  message={latestmessage && latestmessage} user_id={account && account.data && account.data.user && account.data.user._id} />

	<div className="chat-footer-el mx-0  ">
								{typing =="true"  &&	<p className="p-0 px-4 text-muted text-right w-100 font-italic ">
{account.data.user.username} typing... 
									</p>}
											
									< hr className="m-1 p-0" />
								
									<div class="chat-footer"  style={{border:'0px solid', height:'76px'}}>
										<div class="file-upload"><a href="#">
										<i class="icon-copy dw dw-text mr-1 text-light-green "></i>
										<i class="icon-copy dw dw-happy mx-2 font-20 text-yellow "></i>
<i class="icon-copy dw dw-attachment mx-2  font-20 text-secondary " onClick={setAttach}  ></i></a>
										</div>
										<div class="chat_text_area pl-4 pt-1 " >
											<textarea className="m-0 form-control " value={message}  placeholder="Type your message…" onChange={messageChange} ></textarea>
{ attach && <div className="mt-0 pt-1 "   >
<i class="icon-copy dw dw-image-1 mr-4  font-20"></i>
<i class="icon-copy dw dw-video-file mr-4 font-20"></i>
<i class="icon-copy dw dw-audio-file mr-4 font-20"></i>
<i class="icon-copy dw dw-file mr-4 font-20 "></i>
<i class="icon-copy dw dw-share-2 mr-4 font-20"></i>


									</div>
								}
										</div>
										<div class="chat_send">
											<button class="btn btn-link"  type="submit" onClick={messageSend} ><i class="icon-copy ion-paper-airplane" style={{color:'green'}}></i></button>
										</div>

								
									
									</div>

									
								</div>
								</div>
 </div>


						

                </div>

	)

}




export default Screen









const Message = ({message=[],user_id=""}) =>{


const {user} =  useUser()
const username = user?.username
// const from= notify.from

  const newMessages = useSelector(state=>state.message)


// const {data:userData,mutate:mutateUser} = useSWR(()=>'/api/getuserdata/'+from,axios) 

useEffect(()=>{


},[])

    // const data = userData.data

   const getDate =(date)=>{

let dt = String(date).split("T")[0]
let tm = String(date).split("T")[1].replace("Z","")

return dt + " @ "+tm

   }



   
 
 const  getText = (data,index)=>{

if (data.status=="unread"){

socket.emit('message.read',data)

// console.log('message.read',data.text)

 // && data.from == user_id
}

switch(data.type){

case "text":{

return<li class={data.from ==user_id ? "clearfix ":"clearfix admin_chat"} key={index} >
												<span class="chat-img">
													{data.from_image ?
                   <img src={CLOUDINARY_URL+"w_230,h_230,g_face,r_max,c_thumb/"+data.from_image}  />
                   : <img src="/vendors/images/img2.jpg" alt=""  />
                  }
                 

												</span>
												<div class="chat-body clearfix">
													<p>{data.text}</p>
													<div class="chat_time">{getDate(data.date)}

{data.from !== user_id &&  <i class="icon-copy dw dw-check mx-1"></i>}
{data.status=="read" && data.from !== user_id && 
<i class="icon-copy dw dw-check " style={{color:'#2e2f50'}}> </i>}

													</div>
												</div>
											</li>
	break;
}




default:{

return "You have an unindentified notification"
	break;
}


}


 }


return (

<div class="chat-desc ">
<ul className=" m-0 mx-h-400 w-100 " style={{overflowY:'scroll',
overflowX:'hidden',minHeight:'400px'}} >
										

{message.length > 0 || newMessages.length > 0 ? <>


{message.map((data,index)=>( data.type && getText(data,index)))}
{newMessages.map((data,index)=>( data.type && getText(data,index)))}

											
								</>:<p className="w-100 text-center m-4 text-muted font-italic  ">
<i class="icon-copy dw dw-box-1 mx-2"></i> No messages... Chat now.
</p>}
										</ul>
									</div>


								)



}