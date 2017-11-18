import React from 'react';

import axios from 'axios';
import styles from './ProfileModifyPage.css';

import Header from '../global/header';
import Footer from '../global/footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as accountActions from '../../actions/account';


class ProfileModifyPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      newProfileImg: '',
      newName: '',
      newEmail: '',
      newDesc: ''
    }
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={styles.contents}>
          <div className={styles.profile_content}>
            <div className={styles.profile}>
            <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
            </div>
            <div className={styles.input_form}>
              <label >{'내 이름'}</label>
              <input defaultValue={this.props.name} onChange={(e)=>this.setState({newName: e.target.value})}/>
              <div className={styles.submit} onClick={()=>this.props.setAccountInfo('name', this.state.newName)}>수정</div>
            </div>
            <div className={styles.input_form}>
              <label>{'내 소게'}</label>
              <input defaultValue={this.props.description} onChange={(e)=>this.setState({newDesc: e.target.value})}/>
              <div className={styles.submit} onClick={()=>this.props.setAccountInfo('description', this.state.newDesc)}>수정</div>
            </div>
            <div className={styles.input_form}>
              <label>{'이메일'}</label>
              <input defaultValue={this.props.email} onChange={(e)=>this.setState({newEmail: e.target.value})}/>
              <div className={styles.submit} onClick={()=>this.props.setAccountInfo('email', this.state.newEmail)}>수정</div>
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


const mapStateToProps = (state) => {
  return {
    profileImg: state.account.profileImg,
    name: state.account.name,
    email: state.account.email,
    description: state.account.description
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ...accountActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModifyPage);
