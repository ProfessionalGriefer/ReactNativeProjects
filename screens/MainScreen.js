import React from 'react';
import { connect } from 'react-redux';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <View></View>
        )
    }
}



const mapStateToProps = state => ({
    
});
export default connect(mapStateToProps, {})(MainScreen);