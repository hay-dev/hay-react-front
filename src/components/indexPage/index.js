import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import styles from './Index.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';

import InfiniteScroll from 'react-infinite-scroller';
import Article from "./article/index";

class IndexPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMorePost: true,
            articles: List()
        };
        this.loadMore = this.loadMore.bind(this);
        this.loadRecentPostItem = this.loadRecentPostItem.bind(this);
        this.loadPostItem = this.loadPostItem.bind(this);
    }

    loadMore() {
        if (this.state.articles.size === 0) {
            this.loadRecentPostItem();
        } else {
            this.loadPostItem();
        }
    }

    loadRecentPostItem() {
        axios.get('http://localhost:8080/articles/recent')
            .then(response => {
                console.log("loading recent post item successful.");
                console.log(response);
                this.setState({
                    articles: this.state.articles.push(response.data)
                });
                if (response.data.size === 0 || this.state.articles.get(-1).id === 1) {
                    this.state.hasMorePost = false;
                }
            })
            .catch(response => {
                console.log("loading recent post item failed.");
                console.log(response);
            });
    }

    loadPostItem() {
        axios.get('http://localhost:8080/articles/' + (this.state.articles.get(-1).id - 1))
            .then(response => {
                console.log("Loading post item successful.");
                console.log(response);
                this.setState({
                    articles: this.state.articles.push(response.data)
                });
                if (response.data.size === 0 || this.state.articles.get(-1).id === 1) {
                    this.state.hasMorePost = false;
                }
            })
            .catch(response => {
                console.log("Loading post item failed.");
                console.log(response);
            });
    }

    render() {
        let renderArticles = () => {
            return this.state.articles.map(article => {
                return (
                    <Article key={article.id}
                             id={article.id}
                             title={article.title}
                             summary={article.content}
                             writeDate={article.writeDate}
                             weather={article.weather}
                             location={article.location}
                             commentCnt={article.comments.length}
                             likeCnt={article.likers.length}
                             tags={["hashtag"]}
                             onModify={() => {
                             }}
                             onDelete={() => {
                             }}/>
                )
            });
        };

        return (
            <div>
                <Header/>
                <div className={styles.contents}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMorePost}
                        loader={<div className="loader">Loading ...</div>}>
                        {renderArticles()}
                    </InfiniteScroll>
                </div>
                <FloatingBtn style={{'right': '30px', 'bottom': '90px'}}
                             icon={'/resources/main/Writing_btn.svg'}
                             link={'editor'}/>
                <Footer/>
            </div>
        )
    }
}

export default IndexPage;
