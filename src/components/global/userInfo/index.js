import React from 'react';

import styles from './UserInfo.css';
import ImageButton from '../imageButton';

const propTypes = {
  className: React.PropTypes.string,
  profileImg: React.PropTypes.string.isRequired,
  writer: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  actionBtn: React.PropTypes.shape({
     onClick: React.PropTypes.func,
     defaultIcon: React.PropTypes.string.isRequired,
     hoverIcon: React.PropTypes.string
   })
}

class UserInfo extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    let renderSubButton = (actionBtn) =>{
      if(actionBtn)
      return <ImageButton
                className={styles.likeBtn}
                onClick={actionBtn.onClick}
                defaultIcon={actionBtn.defaultIcon}
                hoverIcon={actionBtn.hoverIcon}/>
    }
    return (
      <div className={styles.userInfo+(this.props.className?' '+this.props.className:'')}>
        <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
        <div className={styles.subInfo}>
          <div>
            <span className={styles.name}>{this.props.writer}</span>
            <ImageButton className={styles.fallowBtn} defaultIcon={'/resources/writing/following_btn_off.svg'} hoverIcon={'/resources/writing/following_btn_on.svg'}/>
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
