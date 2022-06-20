import React, { useContext, useEffect, useState } from 'react'
import PageContext from '../PageContext'


function NewCourse() {
    const {screen, setScreen} = useContext(PageContext)
    const {screenPosition, setScreenPosition} = useContext(PageContext) 
    const {courses, addCourses} = useContext(PageContext)
    const [newCourse, setNewCourse] = useState('')
    const [newCourseColour, setNewCourseColour] = useState('')
    const [newCourseId, setNewCourseId] = useState()
    const {selectedCourse, setSelectedCourse} = useContext(PageContext)
    const availableColours = ["crimson","springgreen","lightpink","lightskyblue", "blanchedalmond", "lightsalmon","palevioletred","thistle","dodgerblue","yellowgreen","paleturquoise", "lightgreen"]
  
    useEffect(() => {
      retrieveData()
    }, [])
    
    
    const retrieveData = () => {
      const retrievedDataArray = courses.filter(object => object.courseId === selectedCourse)
      setNewCourseColour(retrievedDataArray[0].colour)
      setNewCourseId(retrievedDataArray[0].courseId)
      setNewCourse(retrievedDataArray[0].name)
    }

    const editingCourse = () => {
      if (newCourse !== '') {
      const edited = courses.map(obj => {
        if (obj.courseId === selectedCourse) {
          return {...obj, name: newCourse, colour: newCourseColour};
        }
        return obj;
      });
      addCourses(edited);
      console.log(courses)
      setScreen('One');
      setScreenPosition('full')
    } else {alert('⚠️ You must give it a name.')}};


    const generateColour = () => {
        const length = availableColours.length
        const colourIndex = Math.floor(Math.random()* length) 
        setNewCourseColour(availableColours[colourIndex])
    }


  return (
    <div>
        <h1>Edit Course</h1>
        <div><input className='inputBar' value={newCourse} style={{borderBottom:'10px solid', borderBottomColor:newCourseColour}} minLength='1' onInput={e => setNewCourse(e.target.value)}></input></div>
        <div className='separator'></div>
        <button className='configButton' style={{backgroundColor:newCourseColour}} onClick={() => {generateColour()}}>Colour Change</button>
        <button className='configButton' style={{backgroundColor:'lightseagreen'}} onClick={() => {editingCourse()}}>Save</button>
    </div>
  )
}

export default NewCourse