import React from 'react';

import axios from 'axios';
import styles from './ProfilePage.css';
import { Link } from 'react-router-dom';

import Header from '../global/header';
import Footer from '../global/footer';
import ListItem from './listItem';

const defaultProps = {
  profileImg: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1'
}

const tabs = ['일기', '혼플']

class ProfilePage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      tab: 0,
      items: [{
        title: 'AI VUX 기획 입문자를 위한 실전 Tip',
        content: '지난겨울 한창 휴가를 즐기던 중 새로운 프로젝트가 시작되었다는 소식에 마지막 여행코스를 돌지 못하고 급히 복귀하게 되었습니다. 당시 만나게 된 그 새 프로젝트는 음성인식 스피커의 음성 인터페이스를 설계하는 것이었고 필자는 잠시 머릿속이 텅 비는 경험을 했었습니다.',
        date: 'Nov.11.2017',
        location: '연남동 심야식다 하스',
        writer: 'writer'
      }]
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
                    content={item.content}
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
        return (<li key={idx} className={(_self.state.tab==idx)?styles.active:''} onClick={()=>_self.setState({tab: idx})}>일기</li>);
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
                  <h1>글 못 쓰는 소설가</h1>
                  <span>글 수 64 </span>
                  <span> 혼플 수 64</span>
                </div>
                <div className={styles.bottom}>{'소설가이지만 글 못쓰는 소설가 입니다. 글스기를 망성이게하는 착각을 푸는 글을 써보려고 합니다.'}</div>
              </div>
              <Link className={styles.settingBtn} to={''}>
                <img src={'/resources/profile_setting.png'}/>
              </Link>
            </div>
            <ul className={styles.tab_holder}>
              {renderTabs(tabs)}
            </ul>
            <div className={styles.item_list}>
              {renderListItem(this.state.items)}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}

ProfilePage.defaultProps = defaultProps;

export default ProfilePage;
