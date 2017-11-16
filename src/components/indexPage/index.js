import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../global/header';
import FloatingBtn from '../global/floatingButton';
import PostItem from './postItem';

import InfiniteScroll from 'react-infinite-scroller';


function createItem(page) {
  return (<PostItem
            title={'AI VUX 기획 밉문자를 위한 실전 TIP'}
            summary={'asdasd'}
            date={'asdasd'}
            tags={['ㅁㄴㅇ', 'ㅁㄴㅇㅍ', 'ㅁㅇ']}
            weather={'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png'}
            countOfComment={2}
            countOfLike={8}
            onModify={function(){}}
            onDelete={function(){}}
            onLookup={function(){}}
            key={page + 1} />)
}

class IndexPage extends React.Component{

  constructor(props){
    super(props);

    this.state={
      hasMorePost: true,
      items: [createItem(0)]
    }
    this.loadPostItem = this.loadPostItem.bind(this);
  }

  loadPostItem(page){
    setTimeout(function() {
      this.setState({
        items: this.state.items.concat([createItem(page)]),
        hasMore: (page < 1000)
      });
    }.bind(this), 100);
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
            loader={<div className="loader">Loading ...</div>}>
            {this.state.items}
          </InfiniteScroll>
        </div>
        <FloatingBtn style={{'right':'30px', 'bottom':'50px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
      </div>
    )
  }

}
export default IndexPage;
