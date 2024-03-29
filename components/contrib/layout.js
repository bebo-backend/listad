import React from 'react'

import Header from '../navigation/header'
import Footer from '../navigation/footer'
import PropTypes from 'prop-types'
import Head from 'next/head'


const Layout = ({ title="",children,tag }) => (
  <>
  <Head>
  <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link rel="icon" href="favicon.ico" />

       {/* <!-- Simple bar CSS --> */}
   
    {/* <!-- Fonts CSS --> */}
    <link href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
    {/* <!-- Icons CSS --> */}
    
    



   
 

    {/* <!-- App CSS --> */}

	// <link rel="stylesheet" type="text/css" href="vendors/styles/icon-font.min.css"/>




   

    </Head>

   
    <main className="layout"  >

    <Header />
      <div className="" >{children}</div>
     
      <Footer />
    </main>



  </>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.node,
  title:PropTypes.string
}