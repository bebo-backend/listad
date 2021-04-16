
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"
import ListUser from "./list-user"

import useSWR,{ mutate }  from 'swr'
import axios from 'axios'

import useUser from '../lib/useUser'

import {useSelector,useDispatch} from 'react-redux'

import {setScreen} from '../actions/screen_data'



const Screen = ({})=>{


const {screen,socket}  = useSelector(state=>state.screen)


const dispatch = useDispatch()
  

 const { user, mutateUser } = useUser()
 const [isSearch,setIsSearch] = useState(false)

 const username = user?.username
    const {data:account,mutate:mutateAccount} = useSWR(()=>'/api/dashboard/account/'+username,axios)

return (

<div className="mx-0 my-2">

<div class="chat-profile-header clearfix row">
<i class="icon-copy dw dw-left-arrow1 col-1 font-24 pt-3 text-muted" onClick={e=>dispatch(setScreen({screen:0}))}></i>
									<div class="left col-10">

										<div class="clearfix">

											<div class="chat-profile-photo">
													
												   {account  && account.data.user.image ?
                   <img src={CLOUDINARY_URL+"w_230,h_230,g_face,r_max,c_thumb/"+account.data.user.image}  />
                   : <img src="/vendors/images/img2.jpg" alt=""  />
                  }
                 
											</div>
											<div class="chat-profile-name">
												<h3>{username} <i class="icon-copy dw dw-pin-3 text-success"></i> </h3>
												<span>{account && account.data.user.location.city} , {account && account.data.user.location.state}</span>
											</div>
										</div>
									</div>
									<div class="right text-right pt-0 pr-2 col-1 ">


										<div class="">
											<a class="btn "  role="button" onClick={e=>setIsSearch(!isSearch)} >
												<i class="icon-copy dw dw-message-1 font-24 text-primary "></i>
											</a>
											
										</div>

										

									</div>
								</div>


		


<div className=" p-4 member-container" >

info about user
 </div>


						

                </div>

	)

}




export default Screen