import React from 'react';

import styles from './UserInfo.css';
import ImageButton from '../imageButton';

const propTypes = {
    className: React.PropTypes.string,
    profileImage: React.PropTypes.string.isRequired,
    author: React.PropTypes.number.isRequired,
    date: React.PropTypes.string.isRequired,
    location: React.PropTypes.string,
    onFollow: React.PropTypes.func.isRequired,
    actionBtn: React.PropTypes.shape({
        icon: React.PropTypes.string.isRequired,
        hoverIcon: React.PropTypes.string,
        onClick: React.PropTypes.func
    })
};

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let renderSubButton = (actionBtn) => {
            if (actionBtn)
                return <ImageButton
                    className={styles.likeBtn}
                    icon={actionBtn.icon}
                    hoverIcon={actionBtn.hoverIcon}
                    onClick={actionBtn.onClick}/>
        };

        return (
            <div className={styles.userInfo + (this.props.className ? ' ' + this.props.className : '')}>
                <div className={styles.profileImg}><img src={this.props.profileImage}/></div>
                <div className={styles.subInfo}>
                    <div>
                        <span className={styles.name}>{this.props.author.name}</span>
                        <ImageButton className={styles.fallowBtn}
                                     icon={'/resources/writing/following_btn_off.svg'}
                                     hoverIcon={'/resources/writing/following_btn_on.svg'}
                                     onClick={this.props.onFollow}/>
                    </div>
                    <div>
                        <span className={styles.location}>{this.props.location}</span>
                        <span className={styles.date}>{this.props.date}</span>
                    </div>
                    {renderSubButton(this.props.actionBtn)}
                </div>
            </div>
        )
    }
}

UserInfo.propTypes = propTypes;

export default UserInfo;
