import React from 'react';

import styles from './ViewPage.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import ImageButton from '../global/imageButton';
import UserInfo from '../global/userInfo';
import Comments from './comments';

import { connect } from 'react-redux';

const ARTICLE_URL = '/articles/';

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

class ViewPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {comments:[]}
    this.onWriteComment = this.onWriteComment.bind(this);
  }

  onWriteComment(content){
    let comment = {
      name: this.props.writer,
      profileImg: this.props.profileImg,
      content: content
    }
    this.setState({comments:[...this.state.comments, comment]})
  }

  render(){
    let headerActions = [
      {icon: '/resources/main/delect_btn_off.svg', hoverIcon:'/resources/main/delect_btn_on.svg', onClick: this.props.onDelete},
      {icon: '/resources/main/adjust_btn_off.svg', hoverIcon:'/resources/main/adjust_btn_on.svg', onClick: this.props.onModify}
    ]
    let renderKeyWords = (tags) => {
      return tags.split('#').map(function(keyword, idx){
        if(keyword!=' '&&keyword.length>0){
          return (<div key={idx} className={styles.keyword}>{keyword}</div>)
        }
      });
    }
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.lookup_content}>
            <UserInfo className={styles.header}
                      writer={this.props.writer}
                      date={this.props.date}
                      location={this.props.location}
                      profileImg={this.props.profileImg} />
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: this.props.content}}>
            </div>
            <div className={styles.keywords}>
              <span className={styles.guide}>Keyword</span>
               <div className={styles.context}>
                 {renderKeyWords(this.props.tags)}
               </div>
            </div>
            <Comments comments={this.state.comments} onWriteComment={this.onWriteComment} profileImg={this.props.profileImg}/>
          </div>
        </div>
        <Footer/>
        <FloatingBtn style={{'right':'30px', 'bottom':'160px'}} icon={'/resources/writing/honluv_icon_on.svg'} link={'editor'}/>
        <FloatingBtn style={{'right':'30px', 'bottom':'90px'}} icon={'/resources/writing/reply_btn.svg'} link={'editor'}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {...state.post.list[getQueryStringValue('article')],
          writer: state.account.name,
          profileImg: state.account.profileImg};
}

export default connect(mapStateToProps)(ViewPage);
