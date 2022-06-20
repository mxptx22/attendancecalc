import React from 'react'
import { useRef, useEffect, useContext, useState } from 'react'
import PageContext from '../PageContext'

function CoursePreview() {
    const {screen, setScreen} = useContext(PageContext)
    const {courses, addCourses} = useContext(PageContext)
    const [newCourse, setNewCourse] = useState('')
    const [newCourseColour, setNewCourseColour] = useState('')
    const [newCourseId, setNewCourseId] = useState()
    const {selectedCourse, setSelectedCourse} = useContext(PageContext)
    const {events, addEvents} = useContext(PageContext)
    const [courseEvents, setCourseEvents] = useState ([])
    const [newDate, setNewDate] = useState('')
    const [courseDates, setCourseDates] = useState([])
    const {screenPosition, setScreenPosition} = useContext(PageContext) 

    useEffect(() => {
      retrieveFromLocalStorage()
      retrieveData()
      }, [])

    useEffect(() => {
      saveToLocalStorage()  
      retrieveData()
    }, [events])
    
    useEffect(() => {
      retrieveFromLocalStorage()
  }, [courses]) 


  useEffect(() => {
    
}, [screen]) 
  
    
      
      
      const retrieveData = () => {
        const retrievedDataArray = courses.filter(object => object.courseId === selectedCourse)
        setNewCourseColour(retrievedDataArray[0].colour)
        setNewCourseId(retrievedDataArray[0].courseId)
        setNewCourse(retrievedDataArray[0].name)
        const retrievedEventArray = events.filter(object => object.courseId === selectedCourse).sort((a, b) => b.date.localeCompare(a.date))
        setCourseEvents(retrievedEventArray)
      }

      function retrieveFromLocalStorage() {
        const retrievedEvents = JSON.parse(localStorage.getItem('savedEvents'));
        if (retrievedEvents !== null){
        if (retrievedEvents.length !== 0) {
          addEvents(retrievedEvents);
        }}
      }

      function saveToLocalStorage() {
        localStorage.setItem('savedEvents', JSON.stringify(events));
      }

      const addingNewDate = () => {
        if (newDate !== '') {
            addEvents(otherCourseDates => [...otherCourseDates, {courseId:newCourseId, eventId: Math.floor(Math.random()* 1000000000), date:newDate, status: 'Present'}])
            
        }
        retrieveData()
    }


    function testingPrinter() {
        // console.log(events)
        // console.log(courseEvents)
        // console.log(newDate)
        // console.log('Present Days',countingPresent())
        // console.log('Absent Days',countingAbsent())
        // console.log('Total Days',countingTotal())
        // console.log('Total Days',countingAttendance())
        console.log(events.sort((a, b) => a.date.localeCompare(b.date)))
    }
    
    const markingAbsence = (course, eventExamined) => {

            const edited = events.map((obj) => {
              if (obj.courseId === course && obj.eventId === eventExamined) {
                if (obj.status === 'Present') {return {...obj, status: 'Absent'}} else {return {...obj, status: 'Present'}};
              }
              return obj;
            });
            addEvents(edited);
        }
    
    const countingPresent = () => {
        const presentDates = courseEvents.filter((object) => object.courseId === selectedCourse && object.status === 'Present')
        const presentDatesNumber = presentDates.length
        return presentDatesNumber
    }

    const countingAbsent = () => {
        const absentDates = courseEvents.filter((object) => object.courseId === selectedCourse && object.status === 'Absent')
        const absentDatesNumber = absentDates.length
        return absentDatesNumber
    }

    const countingTotal = () => {
        const totalDates = courseEvents.filter((object) => object.courseId === selectedCourse)
        const totalDatesNumber = totalDates.length
        return totalDatesNumber
    }

    const countingAttendance = () => {
        if (countingTotal() !== 0) {
        return Math.round((countingPresent() / countingTotal()) * 100) + '%'}
    }

    function deleteEvent(idToDelete) {
        addEvents(events.filter((item) => item.eventId !== idToDelete));
    }

  return (
    <div>
        <div className='courseNameBar' style={{backgroundColor:newCourseColour}}>{newCourse}</div>
        <div className='configBar'>
        <button className='configButton' onClick={() => {setScreen('One')}}>Back</button>
        <button className='configButton' onClick={() => {setScreen('TwoNew'); setScreenPosition('null')}}>Add Recurring</button>
        <button className='configButton' onClick={() => {addingNewDate()}}>Add Date</button>
        <input style={{width:'auto'}} className='inputBar' type='date' onInput={e => setNewDate(e.target.value)}></input>
        </div>
        <div class='bigAttendance' style={{color:newCourseColour}}>{countingAttendance()}</div>
        <div class='mediumAttendance'><span style={{color:newCourseColour,fontWeight:'800'}}>{countingPresent()}</span> Marked Present</div>
        <div class='mediumAttendance'><span style={{color:newCourseColour,fontWeight:'800'}}>{countingAbsent()}</span> Marked Absent</div>
        <div class='mediumAttendance'><span style={{color:newCourseColour,fontWeight:'800'}}>{countingTotal()}</span> in Total</div> 
        <div className='recordsContainer'> 
        {courseEvents.map(({courseId, date, status, eventId}) => (
        <div>
        <div className='recordCard'  style={{backgroundColor:status != 'Present'? 'lightcoral':'palegreen'}}>
            <div onClick={() => markingAbsence(courseId, eventId)}>
            <div>
            <b>{date}</b>
            </div>
            <div>___</div>
            <div>
            {status}
            </div>
            </div>
        </div>
        <div className='recordCard' style={{marginTop:'10px',backgroundColor:'gainsboro'}} onClick={() => {deleteEvent(eventId)}}>
        ✖
            </div>
        </div>
        ))}
    
    </div></div>
  )
}

export default CoursePreview