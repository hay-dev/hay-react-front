import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Article.css';

import UserInfo from '../../global/userInfo'

const propTypes = {
    id: React.PropTypes.number.isRequired,
    content: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    location: React.PropTypes.string,
    author: React.PropTypes.number.isRequired,
    profileImage: React.PropTypes.string.isRequired,
    honluved: React.PropTypes.bool.isRequired,
    onView: React.PropTypes.func,
    onFollow: React.PropTypes.func.isRequired
};

class Article extends React.Component {

    render() {
        return (
            <div className={styles.listItem}>
                <Link to={'/lookup/' + this.props.id}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.summary}>{this.props.content}</div>
                </Link>
                <UserInfo author={this.props.author}
                          date={this.props.date}
                          location={this.props.location}
                          profileImage={this.props.profileImage}
                          actionBtn={{
                              onClick: this.props.onFollow,
                              icon: this.props.honluved ? '/resources/writing/honluv_icon_on.svg' : '/resources/writing/honluv_icon_off.svg'
                          }}
                          onFollow={this.props.onFollow}/>
            </div>
        )
    }
}

Article.propTypes = propTypes;

export default Article;
