
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"

import Members from "./members"
import Groups from "./groups"
import Live from "./live"

import useSWR,{ mutate }  from 'swr'
import axios from 'axios'

import useUser from '../lib/useUser'

import {useSelector,useDispatch} from 'react-redux'

import {setScreen} from '../actions/screen_data'



const Screen = ()=>{

 const { user, mutateUser } = useUser()

	 const username = user?.username

	const {screen,socket}  = useSelector(state=>state.screen)


	const dispatch = useDispatch()
  

 
 const [isSearch,setIsSearch] = useState(false)




    const {data:account,mutate:mutateAccount} = useSWR(()=>'/api/dashboard/account/'+username,axios)


const getTabData = ()=>{



}

if (!account ) {


	return <p> </p>
}

return (

<div className="mx-0 mb-2 pt-0">

<div class="chat-profile-header clearfix rounded mt-0 py-3 "  >
									<div class=" ">
										<div class="clearfix pb-1 row w-100" style={{border:'0px solid'}} >
										

											<span className=" col-sm-8 col-lg-8 ">

<div className="row">
<span className=" col-2 ">
 {account && account.data && account.data.user && account.data.user.image ?
                      <img src={CLOUDINARY_URL+"w_55,h_52,g_face,r_max,c_thumb/"+account.data.user.image.image_id} />

                   : <img src="/vendors/images/no-user-image.jpg" style={{height:'52px',width:"55px",borderRadius:'999px'}}   />
                  }
<span class="badge badge-pill badge-success p-1 px-1" style={{position:'absolute',
top:'38px',left:'56px',borderRadius:'999px',width:'20px'}}>
<i class="icon-copy fi-plus"></i>
</span>
</span>

<span className=" col-10 ">
Update your profile albums. <br />
<span className="text-muted">
Showcase your album collections.
</span>
</span>

</div>
											</span>

										<span class="dropdown btn btn-link text-dark   col-sm-4 col-lg-4 text-right ">
									
											<i class="icon-copy dw dw-edit-1 font-weight-bold font-16 mr-1 "></i> My albums
										</span>


										</div>
									</div>

	
								</div>


		
{isSearch && 

<div class="chat-search">
<input type="text" placeholder="Search Cite" />
<span class="ti-search"></span>

								</div>
							}


<p className="text-center w-100 p-2 bg-gray-500 " style={{display: 'flex',
    justifyContent: 'flex-end'
}}>
		  <ul className="nav nav-tabs customtab mx-0 mb-1 w-100 " role="tablist" >


	  <li className="nav-item text-center" style={{width:'33%'}}   >
	  <a className="nav-link   px-3 py-1 my-0 " href="#groups" data-toggle="tab" role="tab" >
	  	<i class="dw dw-group py-0 my-0 mr-2"></i>Groups
	  </a>
	  </li> 
	  	  <li className="nav-item  text-center"  style={{width:'33%'}}  >
	<a  className="nav-link active  px-3  py-1 my-0" href="#members" data-toggle="tab" role="tab" >
		<i class="dw dw-user1 mr-2"></i>  Members</a>
	  </li>

	   <li className="nav-item  text-center" style={{width:'33%'}} >
		 <a className="nav-link   px-3 py-1 my-0" href="#live" data-toggle="tab" role="tab" >
		 <i class="dw dw-video-camera1 mr-2"></i> Live (Broadcast)</a>
	  </li>


  </ul>
  </p>

  <div class="tab-content  px-2">
									<div class="tab-pane fade show active" id="members" role="tabpanel">
										<div class="pd-10">
										
										<Members  />
										</div>
									</div>


									<div class="tab-pane fade " id="groups" role="tabpanel">
										<div class="pd-10">
												<Groups  />
										</div>
									</div>
	<div class="tab-pane fade " id="live" role="tabpanel">
										<div class="p1-20">
												<Live  />
										</div>
									</div>



									</div>




						

                </div>

	)
}






export default Screen