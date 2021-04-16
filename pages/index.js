import React, {useState,useEffect} from 'react'

import Link from 'next/link';

import {useRouter} from 'next/router'
import {useSelector,useDispatch} from 'react-redux'

import Layout from "../components/contrib/layout"

import {NextSeo} from 'next-seo'

import axios from 'axios'



 const main = () => {

const router = useRouter()


  const dispatch = useDispatch()







    return (  

     <Layout >


<NextSeo title={"Welcome to cite.com  - The best dating website in nigeria"} titleTemplate='%s | yadu'
description="Find dates, friends around you" />




<main id="main  " className="main pr-4 pl-3" style={{display:'flex',flexDirection:'column',
alignItems:'center',justifyContent:'center',marginTop:40}}  >

<h1>Download Adlist on </h1> <br />
<h1> Google Play </h1>

<h5 style={{marginTop:40}} > Nigeria No. 1 Advertisement App </h5>


    </main>

     </Layout >

);
}

export default main;

