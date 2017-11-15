import React from 'react';

import styles from './listItem.css';

import ImageButton from '../../imageButton';

const propTypes = {
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  writer: React.PropTypes.string.isRequired,
  profileImg: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}
class PostItem extends React.Component{

  render(){
    return (
      <div className={styles.listItem} onClick={this.props.onClick}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.summary}>{this.props.content}</div>
        <div className={styles.footer}>
          <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
          <div className={styles.subInfo}>
            <div>
              <span>{this.props.writer}</span>
              <ImageButton className={styles.fallowBtn} defaultIcon={'/resources/writing/following_btn_off.svg'} hoverIcon={'/resources/writing/following_btn_on.svg'}/>
            </div>
            <div>
              <span className={styles.location}>{this.props.location}</span>
              <span className={styles.date}>{this.props.date}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

PostItem.propTypes = propTypes;

export default PostItem;
