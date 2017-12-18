import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import PostItem from './postItem';

import InfiniteScroll from 'react-infinite-scroller';


function createItem(article) {
    return (<PostItem
        title={article.title}
        summary={article.content}
        date={article.writeDate}
        tags={['ㅁㄴㅇ', 'ㅁㄴㅇㅍ', 'ㅁㅇ']}
        weather={'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png'}
        countOfComment={2}
        countOfLike={article.likeCnt}
        onModify={function () {
        }}
        onDelete={function () {
        }}
        onLookup={function () {
        }}
        key={article.id} />)
}

class IndexPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMorePost: true,
            nextPostId: -1,
            items: []
        }
        this.loadPostItem = this.loadPostItem.bind(this);
    }

    loadRecentPostItem() {
        axios.get(url)
            .then(response => {
                console.log(this.state.nextPostId);
                this.setState({
                    items: this.state.items.concat([createItem(response.data)])
                });
                this.state.nextPostId = response.data.id;
                if (this.state.nextPostId = 1) {
                    this.state.hasMorePost = false;
                }
            })
            .catch(response => {
                console.log(response);
            });
    }

    loadPostItem(page) {
        let url = '';
        if (this.state.nextPostId == -1) {
            url = 'http://localhost:8080/articles/recent';
        } else {
            url = 'http://localhost:8080/articles/' + this.state.nextPostId;
        }

        axios.get(url)
            .then(response => {
                console.log(this.state.nextPostId);
                this.setState({
                    items: this.state.items.concat([createItem(response.data)])
                });
                if (this.state.nextPostId == -1) {
                    this.state.nextPostId = response.data.id;
                }
                if (this.state.nextPostId == 1) {
                    this.state.hasMorePost = false;
                } else {
                    this.state.nextPostId--;
                }
            })
            .catch(response => {
                console.log(response);
            });
        // setTimeout(function() {
        //   this.setState({
        //     items: this.state.items.concat([createItem(page)]),
        //     hasMore: (page < 1000)
        //   });
        // }.bind(this), 100);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={styles.contents}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadPostItem}
                        hasMore={this.state.hasMorePost}
                        loader={<div className="loader">Loading ...</div>}>
                        {this.state.items}
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
