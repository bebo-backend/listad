
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"
import useSWR,{ mutate }  from 'swr'
import axios from 'axios'
import io from 'socket.io-client';

import {useSelector,useDispatch} from 'react-redux'

import {setMsg,updateMsgStatus} from '../actions/chat_messages'
import {setMsgNotify,removeMsgNotify} from '../actions/message_notifications'



import useUser from '../lib/useUser'

let socket = {on:f=>f,emit:f=>f}

let newData = []

const More = ()=>{
  
  const {msgNotify,screenData} = useSelector(state=>({'msgNotify':state.messageNotify,
screenData:state.screen}))

  const dispatch = useDispatch()

  const {screen} = screenData

  socket = screenData.socket ? screenData.socket :socket
  
  const {user} = useUser()

const username = user?.username

// let {data,mutate:mutateMessages} = useSWR(()=>'/api/getmessages/'+username,axios)

// if (data){

// 	dispatch(setMsgNotify(data.data))
// }

useEffect(()=>{







socket.on("message.reply.done",id=>{

	console.log('message.reply.done')

dispatch(removeMsgNotify(id))
dispatch(updateMsgStatus({id,status:"read"}))

})





},[])



   





if (!msgNotify){

	return (


   <div class="dropdown btn btn-link m-0 p-0" style={{position:'absolute'}} >
           
           <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown" >
         <i class="dw dw-email1 cursor-pointer text-white " 
           ></i>      <span class="badge badge-pill badge-light text-info  p-1" style={{position:'absolute',top:'-12px'}}>0</span>
         <br />
          <a className="text-center mx-0 text-white font-14 "> Message  </a>
          </a>

    	<div class="dropdown-menu dropdown-menu-right">
						<div class="notification-list mx-h-350 customscroll w-100">
							<ul className="p-2" style={{minWidth: '400px'}} >
								
								<p className="font-weight-bold mx-2 mt-2 mb-0">Unread Messages </p>
								<hr/>
							
								<li>
									<p className="text-muted text-center"> No messages</p>
								</li>
							
							</ul>
						</div>
					</div>
                      

        </div>

     


	)

}

newData =  msgNotify ? msgNotify:[]


return (


        <div class="dropdown btn btn-link m-0 p-0">
           
           <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown" >
         <i class="dw dw-email1  cursor-pointer text-white" 
           ></i>
           <span class="badge badge-pill badge-light text-info  p-1"
            style={{position:'absolute',top:'-10px'}}>{newData && newData.length} {newData && newData.length >= 12 && "+"}</span>
         <br />
          <a className="text-center mx-0 text-white font-14  "> Message  </a>
          </a>

    	<div class="dropdown-menu dropdown-menu-right">
						<div class="notification-list  w-100 pt-2"   >
							<p className="font-weight-bold m-2 mt-2 mb-0">Unread Messages - {newData && newData.length} </p>
								<hr/>
							<ul className="p-2 mx-h-450 " style={{minWidth: '410px',overflowY:'scroll',overflowX:'hidden'}} >
								
							
							
							
							{newData && newData.map((data,index)=> <Message notify={data} /> )}	
					
							</ul>

							<a className="text-center btn btn-link w-100 text-primary py-2">
Sell all
							</a>
						</div>
					</div>
                      

        </div>

	)

}




export default More



const Message = ({notify={}}) =>{


const {user} =  useUser()
const username = user?.username


  const dispatch = useDispatch()


const from= notify.from

const {data:userData,mutate:mutateUser} = useSWR(()=>'/api/getuserdata/'+from,axios) 




if (!userData){

   	return <li> {notify.from} </li>
   }

    const data = userData.data

   const getDate =(date)=>{

let dt = String(date).split("T")[0]
let tm = String(date).split("T")[1].replace("Z","")

return dt + " @ "+tm

   }

//    const accept= (e)=>{
//    	e.preventDefault()

// socket.emit('user.add',{username:data.username,where:'friends',notification_id:notify._id,me:username})
   	
//    }

// const decline= (e)=>{
//    	e.preventDefault()


// socket.emit('friend.decline',{from,
// 	to:notify.to,
// 	notification_id:notify._id})


//    }


  const read= (e)=>{
   	e.preventDefault()


// socket.emit('message.read',{message_id:notify._id})

dispatch(setScreen({screen:2,username:data.username}))


   }


   
 
 const  getText = ()=>{


switch(notify.type){

case "text":{

return <div className="p-0 row" style={{borderBottom:'1px solid #c0c0c073'}} >  
<p className="text-info col-10 "  > 
	
<span className="text-muted font-12 pb-0">{getDate(notify.date)}</span><br />
You received new message from <span className="font-weight-bold font-14" style={{color:'black'}} > {data.username}. </span>
<br />

 <i class="icon-copy dw dw-message-1 text-dark"></i> <span className="text-dark font-14 pb-0"> {notify.text} </span>

</p>

<p className="btn btn-link col-2 font-14"  onClick={read}  > 
Reply
</p>

  </div>
	break;
}


case "files":{

return <div className="row p-0">  
<p className="text-info col-10"  > 
	
<span className="text-muted font-12 pb-0"> {getDate(notify.date)}</span><br />
Friend request send to <span className="font-weight-bold" style={{color:'black'}} > {data.username} </span>
was accepted.
</p>

<p className="btn btn-link col-2"  onClick={read}  > 
Read
</p>

  </div>
	break;
}

case "friend.decline":{

return <div className="row p-0">  
<p className="text-info col-10"  > 
	
<span className="text-muted font-12 pb-0">On {getDate(notify.date)}</span><br />
Friend request send to <span className="font-weight-bold" style={{color:'black'}} > {data.username} </span>
was decline.
</p>
<p className="btn btn-link col-2"  onClick={read}  > 
Read
</p>
  </div>
	break;
}

default:{

return "You have an unindentified notification"
	break;
}


}


 }


return (

	data    &&  <li className="m-2 p-0">
									<span >
									{getText()}


									</span>
								</li>

								)



}