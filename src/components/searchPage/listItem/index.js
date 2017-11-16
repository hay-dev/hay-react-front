import React from 'react';

import styles from './listItem.css';

import UserInfo from '../../global/userInfo'

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
        <div className={styles.summary}>{this.props.content}</div>
        <UserInfo writer={this.props.writer}
                  date={this.props.date}
                  location={this.props.location}
                  profileImg={this.props.profileImg}
                  actionBtn={{onClick: this.onFallow,
                    defaultIcon : '/resources/writing/honluv_icon_off.svg',
                    hoverIcon : '/resources/writing/honluv_icon_on.svg'}} />
      </div>
    )
  }

}

PostItem.propTypes = propTypes;

export default PostItem;
