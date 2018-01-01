import React from 'react';
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { List } from 'immutable';

import styles from './Index.css';

import Header from '../global/header';
import FloatingBtn from '../global/floatingButton';
import Article from './article';

import InfiniteScroll from 'react-infinite-scroller';

function removeHtmlTags(text) {
    var regex = /(<([^>]+)>)/ig;
    return text.replace(regex, '');
}

const propTypes = {
    memberId: React.PropTypes.number.isRequired
};

class SearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            member: {},
            hasMorePost: false,
            items: List()
        };
        this.loadMember = this.loadMember.bind(this);
        this.search = this.search.bind(this);
        this.loadRecentPostItem = this.loadRecentPostItem.bind(this);
        this.loadPostItem = this.loadPostItem.bind(this);
        this.renderArticles = this.renderArticles.bind(this);

        this.loadMember();
    }

    loadMember() {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        };
        axios.get('http://localhost:8080/members/' + this.props.id, config)
            .then(response => {
                console.log(response);
                this.setState({
                    member: response.data
                });
            })
            .catch(response => {
                console.log(response);
                alert('오류로 인해 내 정보를 불러오지 못했습니다.');
            });

    }

    loadMore() {
        console.log('loadMore');
        console.log(this.state.hasMorePost);
        if (this.state.items.length === 0) {
            this.loadRecentPostItem();
        } else {
            this.loadPostItem();
        }
    }

    loadRecentPostItem() {
        axios.get('http://localhost:8080/articles/search/recent?query=' + document.getElementById('keyword').value)
            .then(response => {
                this.setState({
                    items: this.state.items.push(response.data)
                });
                if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                    this.state.hasMorePost = false;
                }
            })
            .catch(response => {
                console.log(response);
            });
    }

    loadPostItem() {
        axios.get('http://localhost:8080/articles/search?query=' + document.getElementById('keyword').value +
            '&last_id=' + (this.state.items[this.state.items.length - 1].id))
            .then(response => {
                this.setState({
                    items: this.state.items.push(response.data)
                });
                if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                    this.state.hasMorePost = false;
                }
            })
            .catch(response => {
                console.log(response);
            });
    }

    search() {
        this.setState({
            items: [],
            hasMorePost: true
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.search();
        }
    }

    follow(memberId) {
        axios.post('http://localhost:8080/members/14/follows/' + memberId)
            .then(response => {
                if (response.status === 201) {
                    this.loadMember();
                } else {
                    alert('혼럽에 실패했습니다. 잠시 후 다시 시도해주세요.');
                }
            })
            .catch(response => {
                console.log(response);
                alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            });
    }

    renderArticles() {
        if (this.state.items.length === 0) {
            return (
                <div>게시물이 없습니다.</div>
            );
        }

        return this.state.items.map(article => {
            console.log(article);
            return (
                <Article
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    content={removeHtmlTags(article.content)}
                    author={article.author}
                    date={article.writeDate}
                    location={article.location}
                    profileImage="profile Image"
                    honluved={article.likers.includes(14)}
                    onView={e => {
                    }}
                    onFollow={() => {
                        console.log('asdf');
                        this.follow(article.author);
                    }}/>
            );
        });
    }

    render() {
        let renderKeyWords = (keywords) => {
            return keywords.map(function (keyword, index) {
                return (
                    <div className={styles.keyword}
                         key={index}>{keyword}</div>
                );
            });
        };
        return (
            <div>
                <Header/>
                <div className={styles.contents}>
                    <div className={styles.search_content}>
                        <input id="keyword" type="text" className={styles.searchBar}
                               onKeyPress={this.handleKeyPress.bind(this)}
                               placeholder={'검색 내용을 입력해주세요.'}/>
                        <div className={styles.keywords}>
                            <div className={styles.context}>
                                {renderKeyWords(['테스트', '키워드', '가나다라', '테스트', '키워드', '가나다라', '테스트', '키워드', '가나다라', '테스트', '키워드', '가나다라'])}
                            </div>
                        </div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore.bind(this)}
                            hasMore={this.state.hasMorePost}
                            loader={<div className="loader">Loading ...</div>}>
                            {this.renderArticles()}
                        </InfiniteScroll>
                    </div>
                </div>
                <FloatingBtn style={{'right': '30px', 'bottom': '50px'}} icon={'/resources/main/Writing_btn.svg'}
                             link={'editor'}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    };
};

SearchPage = connect(mapStateToProps)(SearchPage);

SearchPage.propTypes = propTypes;

export default SearchPage;
