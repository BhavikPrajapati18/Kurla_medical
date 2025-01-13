import { Container } from '../components'
import mainImage from '../assets/material/main.png'
import PresImage from '../assets/material/pres.png'
import React from 'react'

function Home() {
  return (
    <div>
      <Container>
        <div> 
        <img src={mainImage} alt="mainImage" />  
        </div>
        <div> 
          <img src={PresImage} alt="PresImage" /> 
        </div>
      </Container>
    </div>
  )
}

export default Home
