import React from 'react';

class NotFound extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        return(
            <div>
                <h1>NotFound</h1>
                <p>{this.props.id} Does NOT exist.</p>
            </div>
        )
    }

}

export default NotFound;