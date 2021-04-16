
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"
import {useSelector, useDispatch} from 'react-redux'
import {setScreen} from '../actions/screen_data'

import useSWR,{ mutate }  from 'swr'
import axios from 'axios'

import useUser from '../lib/useUser'



const Screen = ({data={}})=>{


  const {screen,socket} = useSelector(state=>state.screen)


  const dispatch = useDispatch()
  const [notify,setNotify] = useState({text:""})


  const {user} = useUser()
const me= user?.username




useEffect(()=>{


},[notify])



  socket.on('user.added',(data)=>{

setNotify({text: data.where+" request has been sent ",user:data.user } )

  })




    socket.on('user.alreadyAdded',(data)=>{


setNotify({text: 'You already send request as '+data.where,user:data.user  })

  })

const addUserTo = (where="friends",username) =>{

socket.emit('user.add',{where,username,me})

}


return (

<div className=" p-3 mb-2 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 " >


<div class="da-card box-shadow "  >
								<div class="da-card-photo " >
  {data.image ?
                   <img src={CLOUDINARY_URL+"w_430,h_430,g_face,c_thumb/"+data.image} />
                   : <img src="/vendors/images/p5.jpg" alt="" style={{height:'360px'}}  />
                  }
                 
									<div class="da-overlay">
										<div class="da-social">
										<h5 class="mb-10 color-white pd-20 text-center">{data.fullname} - {data.username}</h5>
	{data.location && <h5 class="mb-30 color-white text-center pd-30" style={{marginTop:'50px'}} >
<i class="icon-copy dw dw-pin mr-2"></i>
{data.location.city} , {data.location.state}
										</h5>
									}

{data.quote ? <h5 class=" text-warning text-center " style={{marginTop:'50px'}}>{data.quote}</h5>:
<h5 class=" text-warning text-center " style={{marginTop:'50px'}}>On Cite</h5> }


											<ul class="clearfix">
<li><a  data-fancybox="images" onClick={e=> dispatch(setScreen({screen:1,username:data.username}))}>
<i class="fa fa-picture-o"></i></a></li>
<li><a class="dropdown cursor-pointer">
											
<i class="icon-copy dw dw-add-user dropdown-toggle" data-toggle="dropdown"></i>

<div class="dropdown-menu dropdown-menu-right " style={{minWidth:'180px'}} >
<a class="dropdown-item text-dark pb-2 mb-3 " style={{fontSize:'15px'}}
 onClick={e=>addUserTo("friends",data.username)} >Send Friend Request</a>


											</div>
								


										</a></li>
											</ul>


										</div>
									</div>
								</div>
							</div>

							{notify.text && notify.user.username == data.username &&
							<div class="alert alert-warning alert-dismissible fade show" role="alert">
								{notify.text} 
								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>

							 }
                </div>

	)

}




export default Screen