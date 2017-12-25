import React from 'react';

import styles from './Comment.css';

const propTypes = {
    id: React.PropTypes.number.isRequired,
    author: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        profileImage: React.PropTypes.string
    }).isRequired,
    content: React.PropTypes.string.isRequired,
    writeDate: React.PropTypes.string.isRequired
};

class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.comment}>
                <div className={styles.profileArea}>
                    <div className={styles.profileImage}><img src={this.props.comment.author.profileImage}/></div>
                    {this.props.comment.author.name}
                </div>
                {this.props.comment.content}
            </div>
        )
    }
}

Comment.propTypes = propTypes;

export default Comment;
