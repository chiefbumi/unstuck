

import React from 'react'
// import MyNavbar from '../components/mynavbar/navbar.components'
// import { StickyNavbar } from '../components/mynavbar/nav2.components'
import { Outlet } from 'react-router-dom'
// import { MyFooter } from '../components/myfooter/footer.components'
// import Navbar1 from '../components/mynavbar/navbar1.components'
// import HomeHeader from './home/homeheader.components'
import './other-styles.styles.scss'

const NavigationPage = () => {
  return (
    <>
    <div className="navbar">
        {/* <Navbar1 /> */}
    </div>

    <div className="main-container">
        <Outlet />
    </div>


    <div className="footer-joined">
      {/* <MyFooter /> */}
    </div>
    </>
  )
}

export default NavigationPage