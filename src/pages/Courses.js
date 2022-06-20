import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef, useContext } from 'react'
import PageContext from '../PageContext'



function Courses() {
    const coursesCongifBar = useRef()
    const [savingSliderDefault, setSavingSliderDefault] = useState('start')
    const {screenPosition, setScreenPosition} = useContext(PageContext) 
    const {screen, setScreen} = useContext(PageContext)
    const {courses, addCourses} = useContext(PageContext)
    const {selectedCourse, setSelectedCourse} = useContext(PageContext)
    const {savingStatus,  setSavingStatus} = useContext(PageContext)
    


    function savingforLater() {
        if (savingSliderDefault === 'start') {
            setSavingSliderDefault('end')
            coursesCongifBar.current.style.backgroundColor = 'lightseagreen'
            setSavingStatus('yas')
            determineSaving('yas')
        } 
        else {
            setSavingSliderDefault('start')
            coursesCongifBar.current.style.backgroundColor = 'gray'
            setSavingStatus('nay')
            localStorage.clear()    
        }
    }
    
    function determineSaving(switcher) {
        if (switcher === 'yas') {localStorage.setItem('saving', 'yas')}
        if (switcher === 'nay') {localStorage.setItem('saving', 'nay')}
    }

    function processSaving() {
        if (localStorage.getItem('saving') === 'yas') {
            setSavingStatus('yas')
            savingforLater()
            const retrievedCourses = JSON.parse(localStorage.getItem('savedCourses'));
            if (retrievedCourses) {
             addCourses(retrievedCourses);
            }
        }
    }

    function saveCourse() {
        localStorage.setItem('savedCourses', JSON.stringify(courses))
    }

    useEffect(() => {
        processSaving()
    
    }, [])

    useEffect(() => {
        if (courses.length !== 0) {saveCourse()}
    
    }, [courses])
    



    function deleteCourse(idToDelete) {
        addCourses(courses.filter((item) => item.courseId !== idToDelete));
        if (courses.length === 1) {localStorage.removeItem('savedCourses')}
    }

  return (
    <div>
        <h1>Your Courses</h1>
        <div className='configBar'>
            <button onClick={() => {setScreenPosition('null'); setScreen('OneNew')}} className='configBarItem configButton' style={{backgroundColor:'lightseagreen'}}>Add</button>
            <div className='configDesc'>Save for Later</div>
            <div  onClick={() => {savingforLater()}} className='configBarItem sliderBar' style={{justifyContent:savingSliderDefault}}><div className='sliderButton' ref={coursesCongifBar}></div></div>
        </div>
        <div id='coursesContainer'>
            {courses.map(({name, colour, courseId}) => (
            <div className='courseCard'style={{borderColor:colour,color:colour}}>
                <div onClick={() => {setScreen('Two'); setSelectedCourse(courseId)}}style={{cursor:'pointer'}}>
                {name}
                </div>
                <div><button className='configButton' onClick={() => {setScreenPosition('null'); setScreen('OneEdit'); setSelectedCourse(courseId)}} style={{backgroundColor:'skyblue'}}>Edit</button>
                <button onClick={() => {deleteCourse(courseId)}} style={{backgroundColor:'crimson'}} className='configButton'>Delete</button></div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Courses