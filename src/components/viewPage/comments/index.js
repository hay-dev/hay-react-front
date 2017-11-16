import React from 'react';

import styles from './Comments.css';

const propTypes={
  profileImg: React.PropTypes.string.isRequired,
  comments: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      profileImg: React.PropTypes.string.isRequired,
      end: React.PropTypes.string.isRequired
    })
  )
}

const defaultProps = {
  comments: []
}

class Comments extends React.Component{

  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return (
      <div className={styles.comments}>
      댓글 {this.props.comments.length}
      <hr className={styles.hr_line}/>
        <div className={styles.comment_box}>
          <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
          <textarea className={styles.comment} placeholder={'서로 이야기를 나눠보세요'}></textarea>
          <button className={styles.confirmBtn}>확인</button>
        </div>
      </div>
    )
  }
}

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;

export default Comments;
