import React, { useContext, useEffect, useState } from 'react'
import PageContext from '../PageContext'


function NewCourse() {
    const {screen, setScreen} = useContext(PageContext)
    const {screenPosition, setScreenPosition} = useContext(PageContext) 
    const {courses, addCourses} = useContext(PageContext)
    const [newCourse, setNewCourse] = useState('')
    const [newCourseColour, setNewCourseColour] = useState('')
    const [newCourseId, setNewCourseId] = useState()
    const availableColours = ["crimson","springgreen","lightpink","lightskyblue", "blanchedalmond", "lightsalmon","palevioletred","thistle","dodgerblue","yellowgreen","paleturquoise", "lightgreen"]
    
    useEffect(() => {
      generateColour()
      generateCourseId()
      localStorage.setItem('savedCourses', JSON.stringify(courses))
    }, [])
    

    const addingNewCourse = () => {
        if (newCourse !== '') {
        addCourses(otherCourses => [...otherCourses, {courseId:newCourseId, name: newCourse, colour: newCourseColour}])
        console.log(courses)
        setScreen('One');
        setScreenPosition('full')
        } else {alert('⚠️ You must give it a name.')}
    }

    const generateColour = () => {
        const length = availableColours.length
        const colourIndex = Math.floor(Math.random()* length) 
        setNewCourseColour(availableColours[colourIndex])
    }

    const generateCourseId = () => {
        const generatedCourseId = Math.floor(Math.random()* 10000000) 
        setNewCourseId(generatedCourseId)
    }


  return (
    <div>
        <h1>New Course</h1>
        <div><input className='inputBar' style={{borderBottom:'10px solid', borderBottomColor:newCourseColour}} minLength='1' onInput={e => setNewCourse(e.target.value)}></input></div>
        <div className='separator'></div>
        <button className='configButton' style={{backgroundColor:newCourseColour}} onClick={() => {generateColour()}}>Colour Change</button>
        <button className='configButton' style={{backgroundColor:'lightseagreen'}} onClick={() => {addingNewCourse()}}>Save</button>
    </div>
  )
}

export default NewCourse