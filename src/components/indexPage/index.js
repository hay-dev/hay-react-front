import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../global/header';
import Footer from '../global/footer';
import FloatingBtn from '../global/floatingButton';
import PostItem from './postItem';

import InfiniteScroll from 'react-infinite-scroller';

const ARTICLE_URL = '/articles/';

function createItem(item) {
  return (<PostItem
            title={item.title}
            summary={item.content}
            date={item.date}
            location={item.location}
            tags={['ㅁㄴㅇ', 'ㅁㄴㅇㅍ', 'ㅁㅇ']}
            weather={'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png'}
            countOfComment={0}
            countOfLike={item.likeCnt}
            onModify={function(){window.location='/editor?article='+item.id}}
            onDelete={function(){
              axios.delete(ARTICLE_URL+item.id)
              .then(function(response) {
                window.location = '/';
              });
            }}
            onLookup={function(){window.location='/lookup?article='+item.id}}
            key={page + 1} />)
}

class IndexPage extends React.Component{

  constructor(props){
    super(props);

    this.state={
      hasMorePost: true,
      items:[],
      itemList: []
    }
    this.loadPostItem = this.loadPostItem.bind(this);
  }

  loadPostItem(page){
    setTimeout(function() {
      this.setState({
        items: this.state.items.concat([createItem(this.state.itemList[page])]),
        hasMore: (page < this.state.itemList)
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
        <FloatingBtn style={{'right':'30px', 'bottom':'90px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
        <Footer/>
      </div>
    )
  }

  componentDidMount(){
    axios.get(ARTICLE_URL)
    .then(function(response) {
      if(response.data){
        let itemList = response.data.map(function(item){
          return    {content:item.content,
                          title:item.title,
                          id:item.id,
                          location:item.location,
                          weather:item.weather,
                          date:item.writeDate,
                          writer:item.author}
        })
        _self.setState({itemList,
        items: [createItem(itemList[0])]});
      }
    });
  }

}
export default IndexPage;
