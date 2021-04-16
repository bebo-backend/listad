
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"
import {useSelector} from 'react-redux'
import useSWR,{ mutate }  from 'swr'
import axios from 'axios'
import {ListFriends,ListLive,ListHots,ListGroups} from "./list-component"

import useUser from '../lib/useUser'

const More = ({socket})=>{
  
  const {screen} = useSelector(state=>state.screen)

  const { user} = useUser()
  const username = user?.username

const friendsLen  = useSelector(state=>state.friends ?state.friends.length:0)



const getTabData = ()=>{



}







return (

<div className="mx-0 mb-2 ">



		  <ul className="nav nav-tabs customtab mx-0 bg-white mt-0  " role="tablist">
	  <li className="nav-item text-center pt-1" style={{width:'26%',overflow:'hidden'}} >
		  <span class="badge badge-pill badge-light text-success    " style={{fontSize:'10px',padding:'3px'}}
          >{friendsLen <= 99 ? friendsLen:friendsLen+"+" }</span>
           <a className="nav-link active pb-1 pt-0 px-3 font-weight-bold font-14" href="#list-friends" data-toggle="tab" role="tab">Friends</a>
	  </li>


	    <li className="nav-item text-center pt-1" style={{width:'24%',overflow:'hidden'}} >
		  <span class="badge badge-pill badge-light text-primary    " style={{fontSize:'10px',padding:'3px'}}
          >10</span>
           <a className="nav-link pb-1 pt-0 px-3 font-weight-bold font-14"  href="#list-hots" data-toggle="tab" role="tab" >Hots</a>
	  </li>


	   <li className="nav-item text-center pt-1" style={{width:'25%',overflow:'hidden'}} >
		  <span class="badge badge-pill badge-light text-danger    " style={{fontSize:'10px',padding:'3px'}}
          >1</span>
           <a className="nav-link pb-1 pt-0 px-3 font-weight-bold font-14"  href="#list-groups" data-toggle="tab" role="tab" >Groups</a>
	  </li>


  <li className="nav-item text-center pt-1" style={{width:'25%',overflow:'hidden'}} >
		  <span class="badge badge-pill badge-light text-secondary    " style={{fontSize:'10px',padding:'3px'}}
          >4</span>
           <a className="nav-link pb-1 pt-0 px-3 font-weight-bold font-14"  href="#list-dates" data-toggle="tab" role="tab">Live</a>
	  </li>




  </ul>






								
  <div class="tab-content"  >
									<div class="tab-pane fade show active" id="list-friends" role="tabpanel">
										<div class="pl-10">
										
										<ListFriends socket={socket} username={username}   />
										</div>
									</div>

								

									<div class="tab-pane fade " id="list-hots" role="tabpanel">
										<div class="pd-10">
										
										<ListHots   />
										</div>
									</div>


									<div class="tab-pane fade " id="list-groups" role="tabpanel">
										<div class="pd-10">
												<ListGroups   />
										</div>
									</div>


	<div class="tab-pane fade " id="list-dates" role="tabpanel">
										<div class="pd-10">
										
										<ListLive />
										</div>
									</div>

									</div>




                </div>

	)

}




export default More