import React from 'react';

import styles from './PostItem.css';
import { Link } from 'react-router-dom';

const propTypes = {
  summary: React.PropTypes.string.isRequired,
  weather: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  countOfComment: React.PropTypes.number.isRequired,
  countOfLike: React.PropTypes.number.isRequired,
  location: React.PropTypes.string.isRequired,
  tags: React.PropTypes.array.isRequired,
  onModify: React.PropTypes.string.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onLookup: React.PropTypes.string.isRequired
}

function getTags(tags){
  let tagStr = '';
  for (let i = 0; i < tags.length; i++) {
    tagStr += '#'+tags[i]+' ';
  }
  return tagStr;
}

class PostItem extends React.Component{

  render(){
    return (
      <Link to={this.props.onLookup}>
      <div className={styles.postItem}>
        <div className={styles.header}>
          <img className={styles.thumbnail} src={"https://assets.punchdrink.com/wp-content/uploads/2016/03/Article-Second-Cheapest-Wine-By-the-Glass-Restaurant-Dining-NYC-Gramercy-Tavern-Juliette-Pope-David-Lynch-Jose-Andres.jpg"}/>
          <span className={styles.date}>{this.props.date}</span>
          <span className={styles.tags}>{getTags(this.props.tags)}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>{this.props.title}</span>
            <img className={styles.weather} src={this.props.weather}/>
          </div>
          <div className={styles.summary}>
          {this.props.summary}
          </div>
          <ul className={styles.footer}>
            <li>{this.props.location}</li>
            <li>댓글{this.props.countOfComment}</li>
            <li>혼럽{this.props.countOfLike}</li>
            <li className={styles.button}>삭제</li>
            <li className={styles.button}>수정</li>
          </ul>
        </div>
      </div>
      </Link>
    )
  }
}

PostItem.propTypes = propTypes;

export default PostItem;
