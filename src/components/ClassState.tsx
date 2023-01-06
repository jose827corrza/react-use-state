import React from 'react'
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

type classProps = {
    name: string,
};

type classState = {
    error: boolean,
    loading: boolean,
    value: string,
    confirmed: boolean,
    deleted: boolean,
}
export class ClassState extends React.Component<classProps, classState> {
    state: classState = {
        error: true,
        loading: false,
        value: '',
        confirmed: false,
        deleted: false,
    }
componentDidUpdate() {
    if(this.state.loading) {
        setTimeout(() => {
        //   this.setState({ loading: false})
            if (SECURITY_CODE === this.state.value) {
                this.setState({error: false, loading: false});
            } else {
                this.setState({error: true, loading: false})
            }
        }, 3000)
      }
}

    render() {
        return (
            <div className=' grid grid-flow-row justify-items-center'>
                <h2 className='text-2xl font-bold'>Delete {this.props.name}</h2>
                <p>Please, write the security code to confirm you want to delete it.</p>
                {(this.state.error && !this.state.loading) && (<p>Error: the code is not correct</p>)}
                {this.state.loading && <Loading />}
                <div>
                    <input 
                        placeholder='security code' 
                        className='border-2 border-gray-400 rounded-md m-4 px-2'
                        value={this.state.value}
                        onChange={(event) => this.setState({value: event.target.value})}
                    />
                    <button className='bg-red-500 px-2 py-1 rounded-md text-white'
                    // onClick={() => this.setState((state) => ({error: !state.error}))}
                    onClick={() => this.setState((state) => ({loading: true}))}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        );
    }
}