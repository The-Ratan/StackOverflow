import React from 'react'
import DisplayPublicPage from './PublicPage'
import LeftSideBar from "../../components/LeftSidebar/LeftSidebar"
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Public = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
     <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
     <div className="home-container-2">
        <DisplayPublicPage/>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Public
