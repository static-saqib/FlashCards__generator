import React from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import Error404 from '../Error/Error404'
import FlashCardsDetails from '../FlashCards/FlashCardsDetails'
import CreateFlashCards from './CreateFlashCards'
import MyFlashCards from '../FlashCards/MyFlashCards'




const FlashCardsHome = () => {
  return (
    <div className="min-h-screen bg-red-100">
      <div className='pt-20 m-auto w-4/5 bottom-shadow'>
        <div className='flex' >
          <div className='m-2 flex items-center' >
            {/* created navlink to navigate between Create New page to My Flashcard page */}
            <NavLink to='/'>
              <button className="" >
                Create New
              </button>
            </NavLink>
          </div>

          <div className='mx-8 flex items-center' >

            <NavLink to='/myflashcard' >
              <button className="" >
                My Flashcard
              </button>
            </NavLink>
          </div>
        </div>

        <hr className="" />
        {/* adding routes  */}
        <Routes>
          <Route>
            <Route index path='/' element={<CreateFlashCards />} />
             <Route path='/myflashcard' element={<MyFlashCards />} /> 
            { <Route path='/flashcardsdetails/:id' element={<FlashCardsDetails />} /> }
            {/* if path is not match it will shows Error404 component */}
            <Route path='*' element={<Error404 />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default FlashCardsHome
