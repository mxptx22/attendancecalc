import React, { useContext, useEffect } from 'react'
import PageContext from '../PageContext'
import NewCourse from '../components/NewCourse'
import EditCourse from '../components/EditCourse'
import NewRecurring from '../components/NewRecurring'

function ConfigBox() {

  

  const determineBack = () => {
    if (screen === 'OneNew') {return 'One'}
    if (screen === 'OneEdit') {return 'One'}
    if (screen === 'TwoNew') {return 'Two'}
  }

    const {screenPosition, setScreenPosition} = useContext(PageContext) 
    const {screen, setScreen} = useContext(PageContext)
  return (
      <>
    <div className='configBox'>
    <button className='configButton' style={{backgroundColor:'crimson'}} onClick={() => {setScreen(determineBack());setScreenPosition('full')}}>X</button>
    {screen === 'OneNew' && <NewCourse />}
    {screen === 'OneEdit' && <EditCourse />}
    {screen === 'TwoNew' && <NewRecurring />}
    </div>
    </>
  )
}

export default ConfigBox