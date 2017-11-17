import React from 'react';

import styles from './Comment.css';

const propTypes={
  profileImg: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired
}

class Comment extends React.Component{

  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return (
      <div className={styles.comment}>
        <div className={styles.profileArea}>
          <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
          {this.props.name}
        </div>
        {this.props.content}
      </div>
    )
  }
}

Comment.propTypes = propTypes;

export default Comment;
