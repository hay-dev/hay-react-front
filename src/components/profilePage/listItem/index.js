import React from 'react';

import styles from './listItem.css';

const propTypes = {
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  writer: React.PropTypes.string.isRequired,
  profileImg: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
}
class PostItem extends React.Component{

  onFallow(){
    //need impl
  }

  render(){
    return (
      <div className={styles.listItem} onClick={this.props.onClick}>
        <div className={styles.title}>{this.props.title}</div>
        <span>{this.props.location}</span>
        <span>{this.props.date}</span>
        <div className={styles.summary}>{this.props.content}</div>
      </div>
    )
  }

}

PostItem.propTypes = propTypes;

export default PostItem;
