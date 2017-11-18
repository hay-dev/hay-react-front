import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import PostItem from './postItem';

import InfiniteScroll from 'react-infinite-scroller';

import { connect } from 'react-redux';

const ARTICLE_URL = '/articles/';

class IndexPage extends React.Component{

  constructor(props){
    super(props);

    this.state={
      hasMorePost: true,
      items:[],
      itemList: []
    }
    this.loadPostItem = this.loadPostItem.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  loadPostItem(page){
    if(page> this.props.posts.length)return;
    setTimeout(function() {
      this.setState({
        items: this.state.items.concat([this.createItem(page)]),
        hasMore: (page < this.props.posts.length)
      });
    }.bind(this), 100);
  }

  createItem(page) {
    let postNum = this.props.posts.length-page
    let item = this.props.posts[postNum];
    return (<PostItem
              title={item.title}
              summary={item.summary}
              date={item.date}
              location={item.location}
              tags={['ㅁㄴㅇ', 'ㅁㄴㅇㅍ', 'ㅁㅇ']}
              weather={'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png'}
              countOfComment={0}
              countOfLike={0}
              onModify={'/editor?article='+(postNum)}
              onDelete={function(){
                axios.delete(ARTICLE_URL+item.id)
                .then(function(response) {
                  window.location = '/';
                });
              }}
              onLookup={'/lookup?article='+(postNum)}
              key={page} />)
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={styles.contents}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadPostItem}
            hasMore={this.state.hasMorePost}
            loader={<div className="loader"></div>}>
            {this.state.items}
          </InfiniteScroll>
        </div>
        <FloatingBtn style={{'right':'30px', 'bottom':'90px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
        <Footer/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {posts: state.post.list};
}

export default connect(mapStateToProps)(IndexPage);
