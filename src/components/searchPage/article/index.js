import React from 'react';
import {Link} from 'react-router-dom'

import commonStyles from '../../common/common.css';
import styles from './Article.css';

import UserInfo from '../../global/userInfo'

const propTypes = {
    id: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    location: React.PropTypes.string,
    author: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        email: React.PropTypes.string.isRequired,
        name: React.PropTypes.string
    }).isRequired,
    profileImage: React.PropTypes.string.isRequired,
    onView: React.PropTypes.func,
    onFollow: React.PropTypes.func.isRequired
};

class Article extends React.Component {

    render() {
        return (
            <Link to={'/lookup/' + this.props.id}>
                <div className={styles.listItem}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.summary}>{this.props.content}</div>
                    <UserInfo author={this.props.author}
                              date={this.props.date}
                              location={this.props.location}
                              profileImage={this.props.profileImage}
                              actionBtn={{
                                  onClick: this.props.onFollow,
                                  icon: '/resources/writing/honluv_icon_off.svg',
                                  hoverIcon: '/resources/writing/honluv_icon_on.svg'
                              }}/>
                </div>
            </Link>
        )
    }
}

Article.propTypes = propTypes;

export default Article;
