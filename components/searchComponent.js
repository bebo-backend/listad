import React, {useState} from 'react'
import Link from 'next/link';


import {useRouter} from 'next/router'







 const main = ({setSearch=f=>f,filter=false,setFilter=f=>f, searchFilter="Product",onClickFunc}) => {

    const [state,setState] = useState("all")
    





const change=(e)=>{
// console.log(e.target.value);
    setState(e.target.value)
    setSearch(e.target.value ? e.target.value : 'all')
 
}

const click=(e)=>{
    e.preventDefault()
    setSearch(state ? state : 'all')
}

const type=(filter="City",label="")=>   <span className=" dropdown "  onClick={e=>{setFilter(filter)}}>

    
<span role="button" data-toggle="dropdown-status"  >
    
    By {label ?label:filter}</span>


</span>

    return (  
       
<div className="input-group mb-3  " style={{    
  borderRadius: '5px',paddingLeft:' 4px',border:'1px solid silver',background: 'white'}}>
                        <div className="input-group-prepend bg-gray-400">
                   <span className="input-group-text">
                   <i className="icon-copy dw dw-search2 px-1 font-weight-bold text-primary" style={{color:'#1b00ff'}}></i></span>
                    </div>
                        <input style={{border:'0px solid silver',height:'43px'}}
                        type="text" className="form-control " 
                        placeholder={filter? searchFilter ? "Search  " +searchFilter: "Search members, groups, live on cite " :"Find seller around you"}
                         onChange={change}   />
                      

                      </div>




);
}

export default main;


