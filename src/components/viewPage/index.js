import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../header';
import FloatingBtn from '../floatingButton';
import Comments from './comments';

const headerActions = [
  {icon: '/resources/navi/Personal_btn.svg', link: 'Editor'},
  {icon: '/resources/navi/follower_btn.svg', link: 'Test'},
  {icon: '/resources/navi/seach_btn.svg', link: 'Test'}
]

class SearchPage extends React.Component{

  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.subInfo}>
          </div>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.content}>
            {this.props.content}
          </div>
          <div className={styles.keywords}>
          </div>
          //댓글 목록
          <Comments />
        </div>
        <FloatingBtn style={{'right':'30px', 'bottom':'100px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
        <FloatingBtn style={{'right':'30px', 'bottom':'50px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
      </div>
    )
  }

}
export default SearchPage;
