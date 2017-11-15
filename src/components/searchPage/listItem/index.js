import React from 'react';

import styles from './listItem.css';

const propTypes = {
  summary: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  writer: React.PropTypes.string.isRequired,
  profileImg: React.PropTypes.string.isRequired
}
class PostItem extends React.Component{

  render(){
    return (
      <div className={styles.listItem}>
      </div>
    )
  }

}

PostItem.propTypes = propTypes;

export default PostItem;
