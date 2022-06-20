import React, { useState, useContext } from 'react'
import PageContext from '../PageContext'

function NewRecurring() {
    const [startDate, setStartDate] = useState()
    // const [startDateDay, setStartDateDay] = useState()
    // const [startDateMonth, setStartDateMonth] = useState()
    // const [startDateYear, setStartDateYear] = useState()
    // const [startDateWeekday, setStartDateWeekday] = useState()
    const [endDate, setEndDate] = useState()
    const {selectedCourse, setSelectedCourse} = useContext(PageContext)
    const {events, addEvents} = useContext(PageContext)
    const {screenPosition, setScreenPosition} = useContext(PageContext) 
    const {screen, setScreen} = useContext(PageContext)
    
    

    const diffCalc = () => {
        let dStart = new Date(startDate)
        let dEnd = new Date(endDate)
        let dStartNum = dStart.valueOf()
        let dEndNum = dEnd.valueOf()
        const week = 604800000
        let difference = (dEndNum - dStartNum) / week
        return Math.floor(difference)
    }

    const recurrenceCalc = () => {
    
    if (diffCalc() >= 0) { 
    let dStart = new Date(startDate)
    let dStartNum = dStart.valueOf()
    const week = 604800000
        for (let index = 0; index < (diffCalc() + 1); index++) {
            let newOccurrence = new Date(dStartNum + (week * index))
            let newOccurrenceDate = newOccurrence.toLocaleDateString('en-CA')
            addEvents(otherCourseDates => [...otherCourseDates, {courseId:selectedCourse, eventId: Math.floor(Math.random()* 1000000000), date:newOccurrenceDate, status: 'Present'}])
        }
    setScreen('Two')
    setScreenPosition('full')
    } else {alert('⚠️ First Event must be the earlier date of the two.')}
    }

    const weekdayText = () => {
        if (startDate !== undefined) {
        let dStart = new Date(startDate)
        let dStartWeekday = dStart.getDay()
        const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return 'Every ' + weekdays[dStartWeekday]
        } else {return ''}
    }

    const recurrenceText = () => {
        if (diffCalc() === 0) {return 'this week only'} 
        else if (diffCalc() > 0) {return 'for ' + (diffCalc() + 1) + ' weeks'}
    }

  return (
    <div>
    <h1>Add Recurring Events</h1>
    <h3 style={{textAlign:'right'}}> {weekdayText()}  {recurrenceText()}</h3>
    <div><label>First Event:</label><input type='date' className='inputBar' style={{borderBottom:'10px solid'}} minLength='1' onInput={e => setStartDate(e.target.value)}></input></div>
    <div className='separator'></div>
    <div><label>Last Event:</label><input type='date' className='inputBar' style={{borderBottom:'10px solid'}} minLength='1' onInput={e => setEndDate(e.target.value)}></input></div>
    <div className='separator'></div>
    <div><button className='configButton' style={{backgroundColor:'lightseagreen'}} onClick={() => {recurrenceCalc()}}>Add</button></div>

</div>
  )
}

export default NewRecurring