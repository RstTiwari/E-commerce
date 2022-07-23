import React from 'react'
import { Fragment } from 'react'
import { CgMouse } from "react-icons/all";
import "./Home.css"

const Home = () => {
  return (
    <Fragment>
      <div className='banner'>
            <p>Welcome to Infocture World</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
      </div>
        
    </Fragment>
  )
}

export default Home
