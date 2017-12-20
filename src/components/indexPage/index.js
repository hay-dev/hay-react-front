import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import PostItem from './postItem';

import InfiniteScroll from 'react-infinite-scroller';

class IndexPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMorePost: true,
            items: []
        };
        this.loadRecentPostItem = this.loadRecentPostItem.bind(this);
        this.loadPostItem = this.loadPostItem.bind(this);
    }

    loadMore() {
        if (this.state.items.length === 0) {
            this.loadRecentPostItem();
        } else {
            this.loadPostItem();
        }
    }

    loadRecentPostItem() {
        axios.get('http://localhost:8080/articles/recent')
            .then(response => {
                this.setState({
                    items: this.state.items.concat([response.data])
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
        axios.get('http://localhost:8080/articles/' + (this.state.items[this.state.items.length - 1].id - 1))
            .then(response => {
                this.setState({
                    items: this.state.items.concat([response.data])
                });
                if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                    this.state.hasMorePost = false;
                }
            })
            .catch(response => {
                console.log(response);
            });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={styles.contents}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMorePost}
                        loader={<div className="loader">Loading ...</div>}>
                        {this.state.items.map(article => {
                            console.log(article);
                            return <PostItem key={article.id}
                                             title={article.title}
                                             summary={article.content}
                                             date={article.writeDate}
                                             weather={article.weather}
                                             countOfComment={0}
                                             countOfLike={article.likeCnt}
                                             tags={["hashtag"]}
                                             onLookup={() => {}}
                                             onModify={() => {}}
                                             onDelete={() => {}} />
                        })}
                    </InfiniteScroll>
                </div>
                <FloatingBtn style={{'right': '30px', 'bottom': '90px'}} icon={'/resources/main/Writing_btn.svg'}
                             link={'editor'}/>
                <Footer/>
            </div>
        )
    }

}

export default IndexPage;
