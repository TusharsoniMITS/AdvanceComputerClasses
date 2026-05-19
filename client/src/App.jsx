import React from 'react'
import Navbar from './component/Layout/Navbar'
import Footer from './component/Layout/Footer'
import { Route, Routes } from 'react-router'
import Home from './component/Home'
import Login from './component/Auth/Login'
import Register from './component/Auth/Register'
import Contact from './component/Contact'
import HindiTypingTest from './component/Typing/TypingHindi'
import EnglishTyping from './component/Typing/TypingEnglish'
import Blog from './component/Blog/Blog'
import BlogView from './component/Blog/BlogView'
import CourseDisplay from './component/CourseDisplay'
import LatestCourse from './component/Home/LatestCourse'
import ProtectedRoute from './component/Auth/ProtectedRoute'
import AdminPanel from './component/Admin Dashboard/AdminPanel'
import { Toaster } from 'react-hot-toast'
import HindiTypingInstruction from './component/Typing/HindiTypingInstruction'
import NotFound from './component/NotFound'
import ChangePassword from './component/Auth/ChangePassword'




function App() {
  return (
    <>


      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/hindityping' element={<HindiTypingTest />} />
        <Route path='/englishtyping' element={<EnglishTyping />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/getNumberCourse' element={<LatestCourse />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blogview/:postId' element={<BlogView />} />
        <Route path="/coursedisplay" element={<CourseDisplay />} />
        <Route path="/hinditypinginstruction" element={<HindiTypingInstruction />} />


        {/* 🔐 Protect Admin Route */}
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
      <Toaster />




    </>
  )
}

export default App
