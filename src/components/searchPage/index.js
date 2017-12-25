import React from 'react';
import axios from 'axios';

import styles from './Index.css';

import Header from '../global/header';
import FloatingBtn from '../global/floatingButton';
import Article from './article';

import InfiniteScroll from 'react-infinite-scroller';

function removeHtmlTags(text) {
    var regex = /(<([^>]+)>)/ig;
    return text.replace(regex, '');
}

class SearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMorePost: false,
            items: []
        };
        this.search = this.search.bind(this);
        this.loadRecentPostItem = this.loadRecentPostItem.bind(this);
        this.loadPostItem = this.loadPostItem.bind(this);
        this.renderArticles = this.renderArticles.bind(this);
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
                    items: this.state.items.concat(response.data)
                }, () => {
                    if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                        this.state.hasMorePost = false;
                    }
                });
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
                    items: this.state.items.concat(response.data)
                }, () => {
                    if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                        this.state.hasMorePost = false;
                    }
                });
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

    follow() {
        axios.post('http://localhost:8080/members/14/follows/' + this.state.author.id)
            .then(response => {
                this.setState({

                }, () => {
                    if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                        this.state.hasMorePost = false;
                    }
                });
            })
            .catch(response => {
                console.log(response);
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
                    onView={e => {
                    }}
                    onFollow={this.follow}/>
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

export default SearchPage;
