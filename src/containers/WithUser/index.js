import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../../actions/options';
import JWTToken from '../../services/JWTToken';

class WithUser extends React.Component {
    componentDidMount() {
        const user  = JWTToken.getToken();
        this.props.setUser(user);
    }
    render() {
        return this.props.children;
    }
}

const mapDispatchToProps = {
    setUser
};
const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(WithUser);
