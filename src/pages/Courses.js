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
    const { savingStatus, setSavingStatus } = useContext(PageContext)
    


    function savingforLater() {
        if (savingSliderDefault === 'start') {
            setSavingSliderDefault('end')
            coursesCongifBar.current.style.backgroundColor = 'lightseagreen'
            setSavingStatus('yas')
            determineSaving('yas')
            console.log('i ran saving for later')
        } 
        else {
            setSavingSliderDefault('start')
            coursesCongifBar.current.style.backgroundColor = 'gray'
            setSavingStatus('nay')
            localStorage.clear()    
            console.log('i abstained from saving for later')
        }
    }
    
    function determineSaving(switcher) {
        if (switcher === 'yas') { localStorage.setItem('saving', 'yas') }
        if (switcher === 'yas' && courses.length > 0) {saveCourse()}
        if (switcher === 'nay') {localStorage.setItem('saving', 'nay')}
    }

    function processSaving() {
        if (localStorage.getItem('saving') !== 'yas') {
            console.log('no course shall pass')
        }
        else {
            savingforLater()
            console.log('i ran process saving')
            const retrievedCourses = JSON.parse(localStorage.getItem('savedCourses'));

            if (retrievedCourses !== null && courses.length === 0) {
                addCourses(retrievedCourses);
                console.log('i even ran adding courses from saved courses in localStorage')
            }
        }
    }

    function saveCourse() {
        localStorage.setItem('savedCourses', JSON.stringify(courses))
         console.log('i saved a course with savecourse')
    }

    useEffect(() => {
        processSaving()
         console.log('processSaving was run on Effect')
    
    }, [])


    
    useEffect(() => {
        if (courses.length !== 0) {
            if (savingStatus !== 'yas') {
                console.log('there will be no saving with saveCourse')
                localStorage.clear() 
                // here is new
            } else {
                console.log('since you want saving, I added and ran savecourse into localStorage')
                saveCourse();
            }
        }

    
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