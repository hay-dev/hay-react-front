import React from 'react';

import styles from './Comments.css';
import Comment from './comment';

const propTypes={
  profileImg: React.PropTypes.string.isRequired,
  comments: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      profileImg: React.PropTypes.string.isRequired,
      end: React.PropTypes.string.isRequired
    })
  ),
  onWriteComment: React.PropTypes.func.isRequired
}

const defaultProps = {
  comments: []
}

class Comments extends React.Component{

  constructor(props){
    super(props);

    this.state={
      comment: ''
    }
    this.writeComment = this.writeComment.bind(this);
  }

  writeComment(){
    this.props.onWriteComment(this.state.comment);
    this.setState({comment:''});
  }

  render(){
    let renderComments = (comments)=>{
      return comments.map(function(comment, idx){
        return <Comment key={idx} profileImg={comment.profileImg} name={comment.name} content={comment.content}/>
      });
    }
    return (
      <div className={styles.comments}>
      댓글 {this.props.comments.length}
      <hr className={styles.hr_line}/>
        {renderComments(this.props.comments)}
        <div className={styles.comment_box}>
          <div className={styles.profileImg}><img src={this.props.profileImg}/></div>
          <textarea className={styles.comment} value={this.state.comment} onChange={(e)=>{this.setState({comment: e.target.value})}} placeholder={'서로 이야기를 나눠보세요'}></textarea>
          <button className={styles.confirmBtn} onClick={this.writeComment}>확인</button>
        </div>
      </div>
    )
  }
}

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;

export default Comments;
