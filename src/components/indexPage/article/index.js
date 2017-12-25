import React from 'react';
import {Link} from 'react-router-dom';

import styles from './Article.css';
import Weather from "../../../consts/Weather";

const propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired,
    writeDate: React.PropTypes.string.isRequired,
    weather: React.PropTypes.number,
    location: React.PropTypes.string,
    commentCnt: React.PropTypes.number.isRequired,
    likeCnt: React.PropTypes.number.isRequired,
    tags: React.PropTypes.array.isRequired,
    onModify: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
};

function getTags(tags) {
    let tagStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagStr += '#' + tags[i] + ' ';
    }
    return tagStr;
}

function removeHtmlTags(text) {
    var regex = /(<([^>]+)>)/ig;
    return text.replace(regex, '');
}

class Article extends React.Component {

    render() {
        return (
            <Link to={'/lookup/' + this.props.id}>
                <div className={styles.postItem}>
                    <div className={styles.header}>
                        <img className={styles.thumbnail}
                             src={"https://assets.punchdrink.com/wp-content/uploads/2016/03/Article-Second-Cheapest-Wine-By-the-Glass-Restaurant-Dining-NYC-Gramercy-Tavern-Juliette-Pope-David-Lynch-Jose-Andres.jpg"}/>
                        <span className={styles.date}>{this.props.writeDate}</span>
                        <span className={styles.tags}>{getTags(this.props.tags)}</span>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <span className={styles.title}>{this.props.title}</span>
                            <img className={styles.weather} src={this.props.weather ? Weather[this.props.weather] : ''}/>
                        </div>
                        <div className={styles.summary}>
                            {removeHtmlTags(this.props.summary)}
                        </div>
                        <ul className={styles.footer}>
                            <li>{this.props.location ? this.props.location : ''}</li>
                            <li>댓글 {this.props.commentCnt}</li>
                            <li>혼럽 {this.props.likeCnt}</li>
                            <li className={styles.button}>삭제</li>
                            <Link to="/editor">
                                <li className={styles.button}>수정</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </Link>
        )
    }
}

Article.propTypes = propTypes;

export default Article;
