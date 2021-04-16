
import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"

import useSWR,{ mutate }  from 'swr'
import axios from 'axios'
import ListUser from "./list-user"
import useUser from '../lib/useUser'

const Screen = ({socket={},setScreen=f=>f})=>{
  
 const { user, mutateUser } = useUser()
 // const [isSearch,setIsSearch] = useState(false)

 const username = user?.username
 
    const {data:members,mutate:mutateAccount} = useSWR(()=>'/api/getmembers/'+username,axios)

if (!members ){


	return <div className="col-12 mb-30 bg-white p-4">
<div className=" height-100-p text-center ">

<img src="/vendors/images/new-loader.gif" alt="" width='60' />


</div>
</div>
} else {

return (
<>

<div className=" p-0 row" >
						
{
	members.data.map((data,index)=>(<ListUser key={index} data={data} /> ))
}

 </div>
 </>

	)

}
}



export default Screen