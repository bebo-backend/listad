
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"

import useSWR,{ mutate }  from 'swr'
import axios from 'axios'
import ListUser from "./list-user"
import useUser from '../lib/useUser'

import {useSelector,useDispatch} from 'react-redux'

import {setScreen} from '../actions/screen_data'
import {setFriendsList,setFriend,removeFriend,updateFriendStatus}  from '../actions/friends'
import {setMsg} from '../actions/chat_messages'


let me_id=""



export const ListFriends = ({socket,username=undefined})=>{
  

  const {screen,...rest}  = useSelector(state=>state.screen)
 	const friends  = useSelector(state=>state.friends ?state.friends:[])
 	
  const [search,setSearch] = useState(false)
  const [pendingLen,setPendLen] = useState(0)
  const [pending,setPending] = useState(false)

  
  const [online,setOnline] = useState(true)
  const [val,setVal] = useState('')
  const [searchVal,setSearchVal] = useState('')

  const [addFriend,setAddFriend] =useState({load:false,error:false})

// console.log('online',friends.filter(e=>e.status == "online").length,online )


	const dispatch = useDispatch()

   let getfriends = "false"


   // const {data:getfriends,mutate:mutateFriends} = useSWR(()=>'/api/getfriends/'+username,axios)

   
   let pendVal = 0


const setPendingLen= ()=>{

pendVal+=1

	setPendLen(pendVal)
}



useEffect(()=>{



  try {


  axios.get('/api/getfriends/'+username).then((data)=>{
 
getfriends="true"


if (data.data.friends.length > 0){

  const fr = data.data

me_id= fr.id


dispatch(setFriendsList(fr.friends))


}


   })

  } catch(err) {


    ;
  }




 socket.on('message.receive.text',message=>{

 // const msgExists= msgNotify.filter(e=>e._id == data.message._id ).length

console.log("message.receive")


dispatch(setMsg(message))


// if (data.owner ==username){

//  dispatch(setMsgNotify(message))
// }


  }) 





socket.on('user.offline',(user)=>{

// console.log('compare',id,user)

dispatch(updateFriendStatus(user))
    
  })


socket.on('user.online',(user)=>{

// console.log('compare',id,user)

dispatch(updateFriendStatus(user))
    
  })




// add new user
   socket.on('user.added',data=>{

dispatch(setFriend(data.user))


  })




},[username])





  




const onChange=e=>{

  setVal(e.target.value)
}

const onClick=e=>{

e.preventDefault()
if(val){

setAddFriend({...addFriend,load:true})


axios.get("/api/find_user/"+val).then(data=>{

if (data.data.error){

setAddFriend({load:false,error:true})


} else{

setAddFriend({ ...addFriend,load:false,error:false,success:true})

socket.emit('user.add',{where:'friends',username:data.data.username,me:username})
setVal("")


}


})


}


}


const onSearch = e=>{

  const val = e.target.value


    setSearchVal(val)
  
}

if (!friends ){


	return <div className="col-12 mb-30 p-4">
<div className=" height-100-p text-center ">

<img src="/vendors/images/new-loader.gif" alt=""  width='60' />


</div>
</div>
} else {

return (
<>
	
  <div className="modal fade" id="modal"  role="dialog" aria-labelledby="modalLabel" >
                  <div className="modal-dialog modal-dialog-top" >
                    <div className="modal-content">
                        <div className="modal-header pd-5">
<h6 className="p-3 text-uppercase">
                       <i class="icon-copy dw dw-add-user mr-2 font-weight-bold"></i>  ADD  FRIEND
                        </h6>
                   
                    </div>

                      <div className="modal-body pd-5 mt-4 px-0 pb-0">
                     


                      {addFriend.error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i class="icon-copy dw dw-information mr-2"></i>
                           User not found, Invite user to cite.</div> }


    {addFriend.success && <div className="alert alert-info alert-dismissible fade show" role="alert">
    <i class="icon-copy fa fa-info-circle mr-2" aria-hidden="true"></i> 
    Request has been sent to user (Add more). 
   </div> }


                          <div className="input-group custom" style={{border:'0px solid white'}} >
                              <div className="input-group-prepend custom">
                  <span className="input-group-text">
              <i class="icon-copy fi-plus "></i></span>
                </div>
                <input style={{border:'0px solid white',borderRadius:'0px'}}
                 type="text" name="username" className="form-control form-control-lg"
                  placeholder="Add by Username, Phone Number, User ID." onChange={onChange} />
            
              </div>

                        <p style={{borderRadius:'0px'}} onClick={onClick}  className="btn py-2 font-weight-bold text-white btn-success btn-block    ">
                        Add as friend  {addFriend.load &&  
                       <span className="spinner-grow spinner-grow-sm mx-3" role="status" >
                         </span>}</p>


                      </div>
                      <div className="modal-footer p-2 ">
                        
                        <button type="button" className="btn btn-link" data-dismiss="modal" 
                        onClick={e=>setAddFriend({})} >
                        <i className="icon-copy dw dw-exit mx-1"></i>Close</button>
                      </div>
                    </div>
                  </div>

                  
                </div>



<div class="row pr-1 pt-1" style={{    borderBottom: '1px solid #cccccc87',overflowX:'hidden',width:'100%',
}} >

<span class=" col-3 text-center btn  text-secondary text-center  pr-0"   style={{overflow:'hidden'}}
 onClick={e=>setOnline(!online)}  >
 {online ? <>
<i class="icon-copy dw  dw-diagonal-arrow1 text-light-green text-center"></i><br />
<span className="font-12 text-center w-100 " >All </span></>:

 <>
<i class="icon-copy dw dw-diagonal-arrow-18 text-light-green text-center"></i><br />
<span className="font-12 text-center w-100 text-light-green ">Online </span></>
}

</span>

<span class=" col-3 text-center btn  text-secondary text-center w-100 pr-0" 
onClick={e=>setSearch(!search)}  >
<i class="icon-copy dw dw-search2 text-dark text-center"></i><br />
<span className="font-12 text-center w-100 font-12"  >Search </span>

</span>

<a class=" col-3 text-center btn  text-secondary text-center w-100 pr-0" href="modal" data-toggle="modal" data-target="#modal"  >
<i class="icon-copy dw dw-add-user text-dark text-center"></i><br /><span className="font-12 text-center w-100 ">Add </span>

</a>

<span class=" col-3 text-center btn  text-secondary text-center w-100 pr-0" onClick={e=>setSearch(!search)}  >
<i class="icon-copy dw dw-chat-2 text-dark text-center"></i><br />
<span className="font-12 text-center w-100 ">Group_msg</span>

</span>

								
								</div>

								{search && <div class="chat-search " style={{    borderBottom: '1px solid #cccccc87',
height:'60px',padding:'2px'}} >
									<span class="ti-search font-14 text-primary " style={{    left: '20px',
    top: '18px'}} ></span>
									<input type="text" className="font-12 mx-0" onChange={onSearch} placeholder="Search by Username, User ID, Phone" />
								</div>
							}

<div style={{overflowX:'hidden',
minHeight:'600px'}}>
<div className=" p-2 row"   >
						
{ friends && friends.length > 0 ?
	friends.map((data,index)=>(<SideListUser me_id={me_id} search={searchVal} key={index} user={[data]} pending={pending} setPendingLen={setPendingLen} online={online} /> )):
	<p className="text-center"> You have no friends </p>
}

 </div>
 </div>

 </>

	)

}

}




export const ListLive = ({data={}})=>{
  
 const { user, mutateUser } = useUser()

 	const {screen}  = useSelector(state=>state.screen)


	const dispatch = useDispatch()


 const username = user?.username



return (
<>
ListLive
 </>

	)

}


export const ListHots = ({data={}})=>{
  
 const { user, mutateUser } = useUser()

 	const {screen}  = useSelector(state=>state.screen)


	const dispatch = useDispatch()


 const username = user?.username



return (
<>
hots
 </>

	)

}



export const ListGroups = ({data={}})=>{
  
 const { user, mutateUser } = useUser()

 	const {screen}  = useSelector(state=>state.screen)


	const dispatch = useDispatch()


 const username = user?.username



return (
<>
ListGroups
 </>

	)

}


export const SideListUser = ({user=[],pending=true,setPendingLen=f=>f, me_id="",online=true,search=""})=>{




return (
<div class="notification-list chat-notification-list customscroll w-100 pl-0 pr-4" >
									<ul>
									{

	user && user.map((data,index)=>( 
		data && <UserData userData={data} pending={pending} search={search} setPendingLen={setPendingLen} me_id={me_id} online={online} /> ))
}
									
									
									</ul>
								</div>
								)

}






export const UserData = ({userData={},pending=true,setPendingLen=f=>f,me_id="",online=true,search=""})=>{

  const {msgNotify,screenData} = useSelector(state=>({
    'msgNotify':state.messageNotify.filter(e=>e.from ==userData._id && e.status=="unread" ).reverse()[0]
,screenData:state.screen}))

  const {screen,socket} = screenData


  const dispatch = useDispatch()

  const [typing,setTyping] = useState({})



   // const {data:userData,mutate:mutateFriend} = useSWR(()=>'/api/getuserdata/'+id,axios) 




   useEffect(()=>{




socket.on("message.receive.typing", from_username=>{

const newData = {...typing,[from_username]:"true" }

	setTyping(newData)

	
})






socket.on("message.receive.cancel", from_username=>{

const newData = {...typing}

delete newData[from_username]

	setTyping(newData)
		
})



   },[typing,userData])

 


 const transformNewMessage=(msg)=>{

// console.log(msg)

switch (msg.type){

  case "text":{
return <span> <i class="icon-copy dw dw-email mr-1"></i> {msg.text} </span>
    break;
  }  


case "image":{

return <span> <i class="icon-copy dw dw-image-2 mr-2"></i> Photo </span>
    break;
  }


case "video":{

return <span> <i class="icon-copy dw dw-video-player mr-2"></i> Video </span>

    break;
  }


case "doc":{

return <span> <i class="icon-copy dw dw-file mr-2"></i> Documents </span>

    break;
  }

default:{

return "New Message"

}



}

}



  if (!userData){

   	return <li> {id} </li>
   }


   let data = userData ? userData:{}





   const aFriend= data.friends.filter(e=>e.user_id ==String(me_id) ).length

   

    const isSearch= data.username.indexOf(search) >=0 || data._id.indexOf(search) >=0 || data.phone.indexOf(search) >=0


if (aFriend <= 0){ setPendingLen()}

return (
isSearch && <>	{ online && data.status=="online" &&
<div className="user-data row"     >{
	data &&  <li className=" user-data col-11" style={{borderBottom:'1px dashed #c0c0c04a',overflow:'hidden'}}  >

											<a  className="" onClick={e=> dispatch(setScreen({screen:2,username:data.username}))} >
												 {data.image ?
                   <img src={CLOUDINARY_URL+"w_430,h_430,g_face,c_thumb/"+data.image} />
                   : <img src="/vendors/images/tunde.jpg" alt=""   />
                  }
											

                      	<h6 class="clearfix">{data.username}</h6>

<p>
{data.status=='online' ? <i class="fa fa-circle text-light-green mr-2"></i>:
<i class="fa fa-circle  mr-2"></i>
}

<span  style={{fontSize: '12px',
    color: '#a4a4a4'}} >{ aFriend <= 0 && !typing[data.username]    ? "Friend request pending" :data.quote && !typing[data.username]  && 
	data.quote} 


{typing[data.username]  &&  <i className=" ">
{data.username} typing... 
									</i>} 
	</span><br />

	{msgNotify &&

	<span className="text-muted"  style={{fontSize: '12px'}} >

{transformNewMessage(msgNotify)}

    </span>


}
</p>
											</a>


		
</li>

										}

		{data && aFriend > 0 &&	<span class="dropdown py-3 btn btn-link col-1 mx-0 px-0 ">

                <a class=" mx-0 px-0 cursor-pointer dropdown-toggle no-arrow" data-toggle="dropdown" >
     <i class="icon-copy dw dw-menu-1 text-primary font-weight-bold mx-0 px-0"  ></i>
 
          </a>


              <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list" style={{position:'absolute'}}>

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

        }

        </div>


      }


      {!online && <div className="user-data row" >{
  data     ?  <li className=" user-data col-10" style={{borderBottom:'1px dashed #c0c0c04a',overflow:'hidden'}}  >

                      <a  className="" onClick={e=> dispatch(setScreen({screen:2,username:data.username}))} >
                         {data.image ?
                   <img src={CLOUDINARY_URL+"w_430,h_430,g_face,c_thumb/"+data.image} />
                   : <img src="/vendors/images/tunde.jpg" alt=""   />
                  }
                        <h6 class="clearfix">{data.username}</h6>

<p>
{data.status=='online' ? <i class="fa fa-circle text-light-green mr-2"></i>:
<i class="fa fa-circle  mr-2"></i>
}

<span  style={{fontSize: '12px',
    color: '#a4a4a4'}} >{ aFriend <= 0 && !typing[data.username]    ? "Friend request pending" :data.quote && !typing[data.username]  && 
  data.quote} 


{typing[data.username]  &&  <i className=" ">
{data.username} typing... 
                  </i>} 
  </span><br />

  {msgNotify &&

  <span className="text-dark"  style={{fontSize: '12px'}} >
    <i class="dw dw-email1  cursor-pointer text-success mr-1" 
           ></i>
{transformNewMessage(msgNotify)}

    </span>


}
</p>
                      </a>


                    
</li>: pending && <li className="w-100 col-12">
                      <a className="" onClick={e=> dispatch(setScreen({screen:2,username:data.username}))}>
                         {data.image ?
                   <img src={CLOUDINARY_URL+"w_430,h_430,g_face,c_thumb/"+data.image} />
                   : <img src="/vendors/images/tunde.jpg" alt=""   />
                  }
                        <h6 class="clearfix text-muted">{data.username}</h6>
<p>{data.status=='online' ? <i class="fa fa-circle text-light-green mr-2"></i>:
<i class="fa fa-circle  mr-2"></i>
}<span  style={{fontSize: '12px',
    color: '#a4a4a4'}} >Friend request pending </span></p>
                      </a>

                    
                    </li>

                    }

    {data && aFriend > 0 && <span class="dropdown py-3 btn btn-link col-2 ">

                <a class=" px-0 cursor-pointer dropdown-toggle no-arrow" data-toggle="dropdown" >
     <i class="icon-copy dw dw-menu-1 "></i>
 
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

        }

        </div>}


</>




								)

}

