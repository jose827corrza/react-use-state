import { UseState } from './components/UseState'
// import { ClassState } from './components/ClassState'
import React from 'react';
import { UseReducer } from './components/UseReducer';
import { ClassState } from './components/ClassState';

function App() {
  return (
    <React.Fragment>
      <div className=' h-screen bg-cyan-200'>
        <div className='pt-20'>
          <div className='p-16 h-1/2'>
            <UseState name={'useState'}/>   
          </div>

          <div className='p-16 h-1/2'>
            <UseReducer name={'useReducer'}/>
          </div>
        </div>
        
      </div>
      
    </React.Fragment>
  );
}

export default App;
