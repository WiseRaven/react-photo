import React from 'react';
import { connect } from 'react-redux';
import { showHint, hideHint } from './../../actions/hints';
import CopyToClipboard from '../../components/CopyToClipboard';

class CopyToClipboardContainer extends React.Component {
    render() {
        return (
            <CopyToClipboard  {...this.props}/>
        )
    }
}

const mapDispatchToProps = {
    showHint,
    hideHint,
};
const mapStateToProps = (state) => ({
    hint: state.hints.hint,
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyToClipboardContainer);

