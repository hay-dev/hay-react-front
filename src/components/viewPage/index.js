import React from 'react';

import styles from './ViewPage.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import UserInfo from '../global/userInfo';
import Comment from "./comment/index";

const headerActions = [
    {icon: '/resources/main/delect_btn_off.svg', hoverIcon: '/resources/main/delect_btn_on.svg', link: 'Test'},
    {icon: '/resources/main/adjust_btn_off.svg', hoverIcon: '/resources/main/adjust_btn_on.svg', link: 'Test'}
];

function removeHtmlTags(text) {
    var regex = /(<([^>]+)>)/ig;
    return text.replace(regex, '');
}

class ViewPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            author: {},
            title: '',
            content: '',
            writeDate: '',
            weather: 0,
            location: '',
            comments: []
        };
        this.loadArticle = this.loadArticle.bind(this);
        this.writeComment = this.writeComment.bind(this);
    }

    componentWillMount() {
        this.loadArticle();
    }

    loadArticle() {
        axios.get('http://localhost:8080/articles/' + this.props.match.params.id)
            .then(response => {
                console.log('Loading article ' + response.data.id + ' successful.');
                console.log(response);
                let article = response.data;
                this.setState({
                    id: article.id,
                    author: article.author,
                    title: article.title,
                    content: removeHtmlTags(article.content),
                    writeDate: article.writeDate,
                    weather: article.weather,
                    location: article.location,
                    comments: article.comments
                });
            })
            .catch(response => {
                console.log('Loading article ' + response.data.id + ' failed.');
                console.log(response);
            });
    }

    writeComment(content) {
        axios.post('http://localhost:8080/articles/' + this.props.match.params.id + '/comments', {
            'author_id': 14,
            'content': content
        })
            .then(response => {
                console.log('Writing comment successful.');
                console.log(response);
                this.setState({
                    comments: this.state.comments.concat([response.data])
                });
            })
            .catch(response => {
                console.log('Writing comment failed.');
                console.log(response);
            });
    }

    render() {
        let renderKetWords = (keywords) => {
            return keywords.map(function (keyword, index) {
                return (
                    <div
                    key={index}
                    className={styles.keyword}>{keyword}</div>
                );
            });
        };

        if (this.state.id !== 0) {
            return (
                <div>
                    <Header actions={headerActions}/>
                    <div className={styles.contents}>
                        <div className={styles.lookup_content}>
                            <UserInfo className={styles.header}
                                      author={this.state.author}
                                      date={this.state.writeDate}
                                      location={this.state.location}
                                      profileImage=""/>
                            <div className={styles.title}>{this.state.title}</div>
                            <div className={styles.content}>
                                s{this.state.content}
                            </div>
                            <div className={styles.keywords}>
                                <span className={styles.guide}>Keyword</span>
                                <div className={styles.context}>
                                    {renderKetWords(['테스트', '키워드', '가나다라', '테스트', '키워드', '가나다라', '테스트', '키워드', '가나다라', '테스트', '키워드', '가나다라'])}
                                </div>
                            </div>
                            <div className={styles.comments}>
                                댓글 {this.state.comments.length}
                                <hr className={styles.hr_line}/>
                                {this.state.comments.map((comment) => {
                                    return <Comment key={comment.id}
                                                    id={comment.id}
                                                    author={comment.author}
                                                    content={comment.content}
                                                    writeDate={comment.writeDate}/>
                                })}
                                <div className={styles.comment_box}>
                                    <div className={styles.profileImg}><img src={this.state.profileImg}/></div>
                                    <textarea className={styles.comment}
                                              value={this.state.comment}
                                              onChange={(e) => {
                                                  this.setState({comment: e.target.value})
                                              }} placeholder={'서로 이야기를 나눠보세요'}/>
                                    <button className={styles.confirmBtn} onClick={this.writeComment}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                    <FloatingBtn style={{'right': '30px', 'bottom': '160px'}}
                                 icon={'/resources/writing/honluv_icon_on.svg'}
                                 link={'editor'}
                                 onClick={() => {}}/>
                    <FloatingBtn style={{'right': '30px', 'bottom': '90px'}}
                                 icon={'/resources/writing/reply_btn.svg'}
                                 link={'editor'}/>
                </div>
            )
        } else {
            return (
                <div>Loading ...</div>
            )
        }
    }
}

export default ViewPage;
