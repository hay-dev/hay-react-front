import React from 'react';

import axios from 'axios';
import styles from './ProfileModifyPage.css';

import Header from '../global/header';
import Footer from '../global/footer';


class ProfileModifyPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      profileImg : 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1'
    }
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={styles.contents}>
          <div className={styles.profile_content}>
            <div className={styles.profile}>
            <div className={styles.profileImg}><img src={this.state.profileImg}/></div>
            </div>
            <div className={styles.input_form}>
              <label>{'내 이름'}</label>
              <input/>
              <div className={styles.submit}>수정</div>
            </div>
            <div className={styles.input_form}>
              <label>{'내 소게'}</label>
              <input/>
              <div className={styles.submit}>수정</div>
            </div>
            <div className={styles.input_form}>
              <label>{'이메일'}</label>
              <input/>
              <div className={styles.submit}>수정</div>
            </div>
            <div className={styles.sns_guide}>계정 연결 (개인정보 및 간편 로그인을 이용할 수 있습니다.)</div>
            <div className={styles.sns}>페이스북 <img className={styles.sns_btn} src={'/resources/facebook_btn.PNG'}/></div>
            <div className={styles.sns}>트위터  <img className={styles.sns_btn} src={'/resources/twitter_btn.PNG'}/></div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}

export default ProfileModifyPage;
