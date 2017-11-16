import React from 'react';

import styles from './ViewPage.css';

import axios from 'axios';

import Header from '../global/header';
import FloatingBtn from '../global/floatingButton';
import ImageButton from '../global/imageButton';
import UserInfo from '../global/userInfo';
import Comments from './comments';

class ViewPage extends React.Component{

  constructor(props){
    super(props);

    this.state={
      writer: 'writer',
      location: 'location',
      date: 'date',
      profileImg: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1'
    }
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={styles.contents}>
          <div className={styles.lookup_content}>
            <UserInfo writer={this.state.writer}
                      date={this.state.date}
                      location={this.state.location}
                      profileImg={this.state.profileImg} />
            <div className={styles.title}>{this.state.title}</div>
            <div className={styles.content}>
              {this.state.content}
            </div>
            <div className={styles.keywords}>
            </div>
            //댓글 목록
            <Comments />
          </div>
        </div>
        <FloatingBtn style={{'right':'30px', 'bottom':'100px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
        <FloatingBtn style={{'right':'30px', 'bottom':'50px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
      </div>
    )
  }
}

export default ViewPage;
