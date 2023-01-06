import React from 'react'

export class Loading extends React.Component {
    componentWillUnmount(): void {
        console.log('componentWillUnmount');
        
    }

    render() {
        return (
            <p>Loading ClassState . . .</p>
        )
    }
}
