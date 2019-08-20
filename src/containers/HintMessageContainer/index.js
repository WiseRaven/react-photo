import React from 'react';
import { connect } from 'react-redux';
import { hideHint } from './../../actions/hints';
import HintMessage from '../../components/HintMessage';

class HintMessageContainer extends React.Component {
    render() {
        const { hint } = this.props;
        return (
            <React.Fragment>
            {
                hint ?
                    <HintMessage
                        text={hint.text}
                        msgId={hint.msgId}
                        hideHint={this.props.hideHint.bind(this)}
                    />
                :
                    null
            }
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    hideHint
};
const mapStateToProps = (state) => ({
    hint: state.hints.hint,
});

export default connect(mapStateToProps, mapDispatchToProps)(HintMessageContainer);

