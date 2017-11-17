import React from 'react';

import styles from './ViewPage.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import ImageButton from '../global/imageButton';
import UserInfo from '../global/userInfo';
import Comments from './comments';

const ARTICLE_URL = '/articles/';

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

class ViewPage extends React.Component{

  constructor(props){
    super(props);

    this.state={
      id: '',
      writer: 'writer',
      location: 'location',
      date: 'date',
      title: '오롯이 나를 만나는 시간',
      content: 'ㅁㄴㅇㅁㄴㅇㅁasdasdㄴㅇ',
      profileImg: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
      name:'앙기무띠',
      comments: []};
    this.onWriteComment = this.onWriteComment.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onModify = this.onModify.bind(this);
  }

  onWriteComment(content){
    let comment = {
      name: this.state.name,
      profileImg: this.state.profileImg,
      content: content
    }
    this.setState({comments:[...this.state.comments, comment]})
  }

  onDelete(){
    axios.delete(ARTICLE_URL+this.state.id)
    .then(function(response) {
      window.location = '/';
    });
  }

  onModify(){
    window.location = '/editor?article=123';
  }

  render(){
    let headerActions = [
      {icon: '/resources/main/delect_btn_off.svg', hoverIcon:'/resources/main/delect_btn_on.svg', onClick: this.onDelete},
      {icon: '/resources/main/adjust_btn_off.svg', hoverIcon:'/resources/main/adjust_btn_on.svg', onClick: this.onModify}
    ]
    let renderKeyWords = (keywords) => {
      return keywords.map(function(keyword, idx){
        return (<div key={idx} className={styles.keyword}>{keyword}</div>)
      });
    }
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.lookup_content}>
            <UserInfo className={styles.header}
                      writer={this.state.writer}
                      date={this.state.date}
                      location={this.state.location}
                      profileImg={this.state.profileImg} />
            <div className={styles.title}>{this.state.title}</div>
            <div className={styles.content}>
              {this.state.content}
            </div>
            <div className={styles.keywords}>
              <span className={styles.guide}>Keyword</span>
               <div className={styles.context}>
                 {renderKeyWords(['테스트', '키워드', '가나다라','테스트', '키워드', '가나다라','테스트', '키워드', '가나다라','테스트', '키워드', '가나다라'])}
               </div>
            </div>
            <Comments comments={this.state.comments} onWriteComment={this.onWriteComment} profileImg={this.state.profileImg}/>
          </div>
        </div>
        <Footer/>
        <FloatingBtn style={{'right':'30px', 'bottom':'160px'}} icon={'/resources/writing/honluv_icon_on.svg'} link={'editor'}/>
        <FloatingBtn style={{'right':'30px', 'bottom':'90px'}} icon={'/resources/writing/reply_btn.svg'} link={'editor'}/>
      </div>
    )
  }


  componentDidMount(){
    let articleId = getQueryStringValue('article');
    let _self = this;
    axios.get(ARTICLE_URL+articleId)
    .then(function(response) {
      if(response.data){
        _self.setState({content:response.data.content,
                        title:response.data.title,
                        id:articleId,
                        location:response.data.location,
                        weather:response.data.weather,
                        date:response.data.writeDate,
                        writer:response.data.author});
      }
    });
  }
}

export default ViewPage;
