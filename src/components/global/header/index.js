import React from 'react';

import styles from './Header.css';
import {Link} from 'react-router-dom';

import ImageButton from '../imageButton';

const propTypes = {
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
        icon: React.PropTypes.string.isRequired,
        hoverIcon: React.PropTypes.string,
        link: React.PropTypes.string,
        onClick: React.PropTypes.func
    }))
};

const defaultHeaderActions = [
    {icon: '/resources/navi/Personal_btn.svg', link: '/profile', onClick: () => {}},
    {icon: '/resources/navi/follower_btn.svg', link: '/follower', onClick: () => {}},
    {icon: '/resources/navi/seach_btn.svg', link: '/search', onClick: () => {}}
];

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        let renderActionItems = (actions) => {
            if (actions)
                return actions.map((action, index) => {
                    return (
                        <li key={index}>
                            <Link to={action.link ? action.link : ''}>
                                <ImageButton icon={action.icon}
                                             hoverIcon={action.hoverIcon}
                                             onClick={() => {}}/>
                            </Link>
                        </li>
                    );
                });
        };

        return (
            <div className={styles.header}>
                <ul>
                    <li style={{"float": "left"}}><Link to="/"><img className={styles.logo}
                                                                    src={'/resources/navi/logo.png'}/></Link></li>
                    {renderActionItems([...defaultHeaderActions])}
                </ul>
            </div>
        )
    }
}

Header.propTypes = propTypes;

export default Header;
