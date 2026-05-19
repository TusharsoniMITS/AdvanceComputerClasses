import React from 'react'
import Slider from './Home/Slider'
import OurFeatures from './Home/OurFeatures'
import StudentReview from './Home/StudentReview'
import HomeMarquee from './Home/HomeMarquee'
import Counter from './Home/Counter'
import AppSection from './Home/AppSection'
import LatestCourse from './Home/LatestCourse'



function Home() {
  return (
    <>
    <Slider/>
    <HomeMarquee/>
    <LatestCourse/>
    <OurFeatures/>
    
    <Counter/>
    <StudentReview/>
    <AppSection/>
    </>
  )
}

export default Home
