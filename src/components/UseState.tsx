import React from 'react'

const SECURITY_CODE = 'paradigma';

type useProps = {
  name: string,
}
export const UseState = ({ name }: useProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [error, setError] = React.useState(false);
  // const [value, setValue] = React.useState('');
  // const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  console.log(state);
  
  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    })
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    })
  }

  const onConfirm = () => {
    setState({
      ...state,
      error:false,
      loading: false,
      confirmed: true,
    })
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  };

  const onWrite = (newValue: string) => {
    setState({
      ...state,
      value: newValue,
    })
  };

  React.useEffect(() => {
    if(state.loading) {
      setTimeout(() => {
        if( state.value === SECURITY_CODE){
          // setState({
          //   ...state,
          //   loading: false,
          //   confirmed: true,
          // })
          onConfirm();
        } else {
          // setState({
          //   ...state,
          //   error: true,
          //   loading: false,
          // })
          onError();
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
                onChange={(event : React.ChangeEvent<HTMLInputElement>) => {onWrite(event.target.value)}}
              />
              <button className='bg-red-500 px-2 py-1 rounded-md text-white'
              onClick={() => {
                // setState({
                //   ...state,
                //   loading: true,
                //   error: false,
                // })
                onCheck();
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
              onDelete();
            }}
            >Yes, delete</button>
            <button className='p-1 mx-2 rounded-md transition duration-300 ease-in-out bg-green-200  hover:scale-105 hover:bg-green-700'
            onClick={() => {
              onReset();
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
            onReset();
          }}
          >Recover code, please</button>
        </div>
      </React.Fragment>
    )
  }
}
