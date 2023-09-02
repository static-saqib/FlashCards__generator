// this is cards details page 
import React, { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TfiBackRight } from 'react-icons/tfi';
import { BsCloudDownload } from 'react-icons/bs';
import { BsPrinter } from 'react-icons/bs';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import ShareModel from './ShareModel';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Show_IMG from "./Images/Show_IMG.png";
import { IoIosArrowForward } from 'react-icons/io';


const FlashCardsDetails = () => {

  // using useState for adding active class
  const [active, setActive] = useState(0);
  //  it's a function to reassign value to active 
  const handleClick = (event) => {
    setActive(event);
  }

  // import useParams hook for catch id of the cards from url
  const { id } = useParams();
  // import useSelector from react-redux and access data from reducer
  const { cards } = useSelector((state) => state.flashcardReducers);
  // using find method  for find card which is selected by the user
  const carddata = cards.find((cards) => cards.id === id);
  // useEffect use for set Enter_Definition & term_uploadimage when carddata change
  useEffect(() => {
    setTermDis(carddata.term[0].Enter_Definition)
    // showing image upload by user if image is not uploaded by user it will be set default image
    setTermImg(carddata.term[0].term_uploadimage ? (carddata.term[0].term_uploadimage) : (Show_IMG))
  }, [carddata])

  // use useState hook to set default image of term_uploadimage if image is not uploaded by user
  const [TermImg, setTermImg] = useState(Show_IMG);
  // use useState hook to set cards image of term_uploadimage
  const [TermDis, setTermDis] = useState("");
  // Setting image and definition on click on next and previous button
  const setCard = (NewIndex) => {
    setTermDis(carddata.term[NewIndex].Enter_Definition);
    setTermImg(carddata.term[NewIndex].term_uploadimage ? (carddata.term[NewIndex].term_uploadimage) : (Show_IMG.png))
  }
  // It's a function for next button
  const nextCard = () => {
    const isLastCard = active === carddata.term.length - 1;
    const NewIndex = isLastCard ? 0 : active + 1;
    setActive(NewIndex);
    setCard(NewIndex);
  }
  // It's a function for previous button
  const prevCard = () => {
    const isFirstSlide = active === 0;
    const NewIndex = isFirstSlide ? carddata.term.length - 1 : active - 1;
    setActive(NewIndex);
    setCard(NewIndex);
  }
  // function for set term image and term definition as well as call the function handelClick 
  function displayTermDetails(item, index) {
    setTermImg(item.term_uploadimage ? (item.term_uploadimage) : (Show_IMG));
    setTermDis(item.Enter_Definition);
    handleClick(index);
  }
  // import useNavigate for navigation
  const navigate = useNavigate();
  // using useState for share Button on click share it will be visible
  const [visible, setVisible] = useState(false);
  const onClose = () => { setVisible(false) }

  return (
    <>
      <div className="pt-3">
        <span className='flex'>
          {/* navigate to My Flashcard card page  */}
          <IoMdArrowRoundBack onClick={() => navigate(-1)} className='text-2xl m-1 cursor-pointer hover:text-red-600 ' />
          <span className='font-bold text-xl px-3'>
            {/* display the name of group */}
            {carddata.Create_Group}
          </span>
        </span>
        <div className="pl-11 my-2 pr-4">
          {/* display the description of  group name */}
          {carddata.description}
        </div>
        <div className="flex flex-wrap space-between">
          <div className="bg-customRed overflow-auto w-64 drop-shadow-md rounded-lg py-1 h-[340px] my-3  px-3">
            <h1 className="font-bold m-2 dark:text-blue-400">Flashcards</h1>
            <hr />
            {/* display list of terms and onclick on terms calling the function displayTermDetails and applying active class  */}
            {carddata.term.map((item, index) => {
              return (
                <div key={index} // assigning the index of the current term as the key prop for each rendered element
                  onClick={() => displayTermDetails(item, index)}
                  className="p-3 font-medium cursor-pointer ">
                  {/* applying active class on the term where you clicked  */}
                  <div className={active === index ? "activeTerm" : undefined} >
                    <IoIosArrowForward className=' icon hidden mr-1' />
                    {item.Enter_Term}
                  </div>
                </div>
              )
            })}
          </div>


          {/* onClick of term it will shows the term image and term description  */}

          <div className="" id='forPrint'>
            <div className=" flex flex-wrap ml-6 py-11 px-5 drop-shadow-md my-3  h-[340px] bg-customRed rounded-lg  ">
              <div className=" pr-2 h-[286px] flex justify-center items-center w-[240px] overflow-hidden">
                <img src={TermImg} alt="" className='m-auto rounded-lg max-h-[286px] transition duration-300 ease-in-out hover:scale-110' />
              </div>

              <div className=" pl-2 w-[280px]  ">
                {TermDis}
              </div>
            </div>
            {/* creating a shadow effect */}
            <div className="flex justify-center my-2 ">
              <p className="mx-auto  h-3 w-60 bg-black opacity-5  rounded-[100%] shadow-xl"></p>
            </div>
            {/* It's next and previous button to navigate between cards */}
            <div className="flex justify-center items-center">
              <MdNavigateBefore className='text-5xl cursor-pointer hover:text-blue-400  ' onClick={prevCard} />
              {/* It's showing active cards and number of cards */}
              <span className='ml-10'>{active + 1}/</span>
              <span className='mr-10'>{carddata.term.length}</span>
              <MdNavigateNext className='text-5xl cursor-pointer hover:text-blue-400  ' onClick={nextCard} />
            </div>
          </div>

          {/* button for share, download, print  */}
          <div className=" w-[200px] my-3 pl-5  rounded-lg h-48">
            <div onClick={() => setVisible(true)} className="bg-customRed flex cursor-pointer mb-4 drop-shadow-md hover:scale-110 rounded-lg w-[250px] p-2 h-10"><TfiBackRight className='text-2xl mx-5' />Share</div>
            <div className="bg-customRed flex cursor-pointer my-4 drop-shadow-md hover:scale-110 rounded-lg w-[250px] p-2 h-10"><BsCloudDownload className='text-2xl mx-5' />Download</div>
            <div onClick={() => { window.print() }} className="bg-customRed flex cursor-pointer my-4 drop-shadow-md hover:scale-110 rounded-lg w-[250px] p-2 h-10"><BsPrinter className='text-2xl mx-5' />Print</div>
          </div>


        </div>

      </div>


      <ShareModel onClose={onClose} visible={visible} />



    </>
  )
}

export default FlashCardsDetails
