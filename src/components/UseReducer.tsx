import React from 'react'

const SECURITY_CODE = 'paradigma';

type useProps = {
  name: string,
}

type State = {
    error: boolean,
    loading: boolean,
    value?: string,
    confirmed: boolean,
    deleted: boolean,
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}
enum StateType {
    ERROR = 'ERROR',
    CHECK = 'CHECK',
    CONFIRM = 'CONFIRM',
    RESET = 'RESET',
    WRITE = 'WRITE',
    DELETE = 'DELETE'
}

// type Action = | {type: StateType} | {type: StateType.WRITE, value: string}
// type Action = {
//     type: StateType,
//     payload?: State
// }
// interface Action {
//     type: StateType,
//     payload: State
// }
type Action =
    | {type: StateType.CHECK | StateType.CONFIRM | StateType.DELETE | StateType.ERROR | StateType.RESET}
    | {type: StateType.WRITE ; payload: State}

export const reducerSwitch = (state: State, action: Action): State => {
    
    switch(action.type){
        case StateType.WRITE: 
            return {
                ...state,
                value: action.payload?.value,
            }
        case StateType.ERROR: 
            return {
                ...state,
                error: true,
                loading: false,
            }
        case StateType.CHECK: 
            return {
                ...state,
                loading: true,
            }
        case StateType.CONFIRM:
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true,
            }
        case StateType.RESET:
            return {
                ...state,
                confirmed: false,
                deleted: false,
                value: '',
              }
        case StateType.DELETE:
            return {
                ...state,
                deleted: true,
                value: '',
              }
        default: 
            return {
                ...state,
            }
    }
}

export const UseReducer = ({ name }: useProps) => {

//   const [state, setState] = React.useState({
//     value: '',
//     error: false,
//     loading: false,
//     deleted: false,
//     confirmed: false,
//   });
  const [state, dispatch ] = React.useReducer(reducerSwitch, initialState)
  console.log(state);
  
//   const onDelete = () => {
//     setState({
//       ...state,
//       deleted: true,
//     })
//   }

//   const onReset = () => {
//     setState({
//       ...state,
//       confirmed: false,
//       deleted: false,
//       value: '',
//     })
//   }

//   const onConfirm = () => {
//     setState({
//       ...state,
//       error: false,
//       loading: false,
//       confirmed: true,
//     })
//   };

//   const onError = () => {
//     setState({
//       ...state,
//       error: true,
//     })
//   };

//   const onCheck = () => {
//     setState({
//       ...state,
//       loading: true,
//     })
//   };

//   const onWrite = (newValue: string) => {
//     setState({
//       ...state,
//       value: newValue,
//     })
//   };

  React.useEffect(() => {
    if(state.loading) {
      setTimeout(() => {
        if( state.value === SECURITY_CODE){
          // setState({
          //   ...state,
          //   loading: false,
          //   confirmed: true,
          // })

        //   onConfirm()
        dispatch({
            type: StateType.CONFIRM
        })
        } else {
          // setState({
          //   ...state,
          //   error: true,
          //   loading: false,
          // })
        //   onError();
        dispatch({type: StateType.ERROR})
        }
      }, 3000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading])

  if(!state.deleted && !state.confirmed) {
    return (
      <div className='h-1/2 grid grid-flow-row justify-items-center '>
          <h2 className='text-2xl font-bold'>Delete {name}</h2>
          <p className='justify-self-center'>Please, write the security code to confirm you want to delete it.</p>
          {state.error && (<p>Error: the code is not correct</p>)}
          {state.loading && (<p>Loading useState . . .</p>)}
          <div>
              <input placeholder='security code' className='border-2 border-gray-400 rounded-md px-2 m-4'
                value={state.value}
                // onChange={(event) => {setValue(event.target.value)}}
                // onChange={(event : React.ChangeEvent<HTMLInputElement>) => ()=> onWrite(event.target.value)}
                onChange={(event : React.ChangeEvent<HTMLInputElement>) => { 
                    dispatch({ 
                        type: StateType.WRITE,
                        payload: {
                            ...state,
                            value: event.currentTarget.value,
                        },
                    })}}
              />
              <button className='bg-red-500 px-2 py-1 rounded-md text-white'
              onClick={() => {
                // setState({
                //   ...state,
                //   loading: true,
                //   error: false,
                // })
                // onCheck();
                dispatch({type: StateType.CHECK})
              }}
              >
                Confirm
                </button>
          </div>
      </div>
    );
  } else if(!!state.confirmed && !state.deleted){
    return(
      <React.Fragment>
       <div className='h-1/2 grid grid-flow-row justify-items-center '>
        <h2 className='text-2xl font-bold'>Delete Use State</h2>
          <p>Sure do you want to delete useState?</p>
          <div>
            <button className='p-1 mx-2 rounded-md transition duration-300 ease-in-out bg-red-200  hover:scale-110 hover:bg-red-500 '
            onClick={() => {
            //   onDelete();
            dispatch({ type: StateType.DELETE})
            }}
            >Yes, delete</button>
            <button className='p-1 mx-2 rounded-md transition duration-300 ease-in-out bg-green-200  hover:scale-105 hover:bg-green-700'
            onClick={() => {
            //   onReset();
            dispatch({ type: StateType.RESET})
            }}
            >Noup,plase take me back</button>
          </div>
       </div>
      </React.Fragment>
    )
  } else {
    return(
      <React.Fragment>
        <div className='h-1/2 grid grid-flow-row justify-items-center '>
          <h2 className='text-2xl font-bold'> {name} Successfully  deleted</h2>
          <button className='p-2 mx-2 rounded-md transition duration-300 ease-in-out bg-green-200  hover:scale-105 hover:bg-green-700'
          onClick={() => {
            // onReset();
            dispatch({ type: StateType.RESET})
          }}
          >Recover code, please</button>
        </div>
      </React.Fragment>
    )
  }
}
