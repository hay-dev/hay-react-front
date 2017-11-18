import React from 'react';

import axios from 'axios';
import styles from './ProfilePage.css';
import { Link } from 'react-router-dom';

import Header from '../global/header';
import Footer from '../global/footer';
import ListItem from './listItem';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const tabs = ['일기', '혼플']

class ProfilePage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      tab: 0
    }
  }

  render(){
    let _self = this;
    let renderListItem = (items) =>{
      if(this.state.tab==0){
        return items.map(function(item, idx){
          return (<ListItem
                    key={idx}
                    title={item.title}
                    content={item.summary}
                    date={item.date}
                    location={item.location}
                    writer={item.writer}
                    profileImg={_self.props.profileImg}
                    onClock={function(){}}/>)
        })
      }else if(this.state.tab==1){
        return ('아직 준비중인 기능입니다!');
      }
    }

    let renderTabs = (tabs) =>{
      return tabs.map(function(tab, idx){
        return (<li key={idx} className={(_self.state.tab==idx)?styles.active:''} onClick={()=>_self.setState({tab: idx})}>{tab}</li>);
      })
    }
    return (
      <div>
        <Header/>
        <div className={styles.contents}>
          <div className={styles.profile_content}>
            <div className={styles.profile}>
              <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
              <div className={styles.details}>
                <div className={styles.top}>
                  <h1>{this.props.name}</h1>
                  <span>글 수 64 </span>
                  <span> 혼플 수 64</span>
                </div>
                <div className={styles.bottom}>{this.props.description}</div>
              </div>
              <Link className={styles.settingBtn} to={'/profile/modify'}>
                <img src={'/resources/profile_setting.png'}/>
              </Link>
            </div>
            <ul className={styles.tab_holder}>
              {renderTabs(tabs)}
            </ul>
            <div className={styles.item_list}>
              {renderListItem(this.props.posts)}
            </div>
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
    description: state.account.description,
    posts: state.post.list
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
