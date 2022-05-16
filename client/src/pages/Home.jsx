import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Catergories from '../components/Categories'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

function Home() {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <Slider/>
        <Categories/>
        <Products/>
        <Newsletter/>
    </div>
  )
}

export default Home