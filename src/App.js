import './App.css';
import Courses from './pages/Courses'
import ConfigBox from './pages/ConfigBox';
import { useContext, useEffect, useRef, useState } from 'react'
import PageContext from './PageContext'
import CoursePreview from './pages/CoursePreview';

function App() {
  const {screen} = useContext(PageContext)
  const {screenPosition} = useContext(PageContext)
  const mainWindowDisplay = useRef()
  const [newHeightValue, setNewHeightValue] = useState('')

    useEffect(() => {
    setNewHeightValue(window.innerHeight)
    window.onresize = setNewHeightValue(window.innerHeight);

  }, []);

  useEffect(() => {
    if (screenPosition !== 'full') {mainWindowDisplay.current.style.transform = 'translate(0,90%)'}
    if (screenPosition === 'full') {mainWindowDisplay.current.style.transform = 'translate(0,0%)'}
  }, [screenPosition])
  
  return (
    <>
    {screen === 'OneNew' && <ConfigBox />}
    {screen === 'OneEdit' && <ConfigBox />}
    {screen === 'TwoNew' && <ConfigBox />}
    <div id='mainWindowContainer' ref={mainWindowDisplay}> 
    <div id='ceilling'></div>
    <div className='icon'>
    {screen === 'One' && <div className='iconGraphics'>📚</div>}
    {screen === 'Two' && <div className='iconGraphics'>📓</div>}
    {screen === 'TwoNew' && <div className='iconGraphics'>📓</div>}
    {screen === 'OneNew' && <div className='iconGraphics'>📚</div>}
    {screen === 'OneEdit' && <div className='iconGraphics'>📚</div>}
    </div>
    <div> 
      <div className='window' style={{paddingBottom:(newHeightValue*0.1)}}>
      {screen === 'One' && <Courses />}
      {screen === 'Two' && <CoursePreview />}
      {screen === 'OneNew' && <Courses />}
      {screen === 'OneEdit' && <Courses />}
      {screen === 'TwoNew' && <CoursePreview />}
      </div>
    </div>
    </div>
    </>
  );
}

export default App;
