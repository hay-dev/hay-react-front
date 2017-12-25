import React from 'react';
import {Link} from 'react-router-dom';

import styles from './FloatingButton.css';
import ImageButton from "../imageButton/index";

const propTypes = {
    icon: React.PropTypes.string.isRequired,
    hoverIcon: React.PropTypes.string,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    link: React.PropTypes.string,
    onClick: React.PropTypes.func
};

const defaultProps = {
    style: '',
    className: '',
    link: '',
    onClick: () => {}
};

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    createLinkButton(actionItem) {
        return <Link to={actionItem.link}>
            <ImageButton defaultIcon={actionItem.icon} hoverIcon={actionItem.hoverIcon}/>
        </Link>
    }

    createClickButton(actionItem) {
        return <ImageButton defaultIcon={actionItem.icon} hoverIcon={actionItem.hoverIcon}
                            onClick={actionItem.onClick}/>
    }

    render() {
        return (
            <div style={this.props.style} className={styles.floatingBtn}>
                <Link to={this.props.link}><img src={this.props.icon}/></Link>
            </div>
        )
    }

}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
