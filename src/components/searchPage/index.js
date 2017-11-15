import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from '../header';
import FloatingBtn from '../floatingButton';
import ListItem from './listItem';

import InfiniteScroll from 'react-infinite-scroller';

const headerActions = [
  {icon: '/resources/navi/Personal_btn.svg', link: 'Editor'},
  {icon: '/resources/navi/follower_btn.svg', link: 'Test'},
  {icon: '/resources/navi/seach_btn.svg', link: 'Test'}
]

const itemList = [{title : 'AI VUX 기획 입문자를 위한 실전 Tip',
                  content: '지난겨울 한창 휴가를 즐기던 중 새로운 프로젝트가 시작되었다는 소식에 마지막 여행코스를 돌지 못하고 급히 복귀하게 되었습니다. 당시 만나게 된 그 새 프로젝트는 음성인식 스피커의 음성 인터페이스를 설계하는 것이었고 필자는 잠시 머릿속이 텅 비는 경험을 했었습니다. 사실 Voice UX는 생소한 것이 아니라 예전부터 있었습니다만 왜 과거 피처폰 시절에 스마트폰 UI를 설계해야 했을 때처럼 생소하고 또 당황했을까요? (필자만 그렇다면 이 글을 읽는 당신은 이미 입문자가 아닙니다.)',
                  date:'Nov.11.2017', location: '연남동 심야식다 하스',
                  writer:'홍길동',
                  profileImg:'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1'}];


function createItem(page) {
  let listItemData = itemList[0];
  return (<ListItem
            title={listItemData.title}
            content={listItemData.content}
            date={listItemData.date}
            location={listItemData.location}
            writer={listItemData.writer}
            profileImg={listItemData.profileImg}
            onClock={function(){}}/>)
}

class SearchPage extends React.Component{

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
        hasMore: (page < itemList.length)
      });
    }.bind(this), 100);
  }

  render(){
    let renderKetWords = (keywords) => {
      return keywords.map(function(keyword){
        return (<div className={styles.keyword}>{keyword}</div>)
      });
    }
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
           <div className={styles.search_content}>
           <textarea className={styles.searchBar}>가나다라</textarea>
           <div className={styles.keywords}>
            <div className={styles.context}>
              {renderKetWords(['테스트', '키워드', '가나다라','테스트', '키워드', '가나다라','테스트', '키워드', '가나다라','테스트', '키워드', '가나다라'])}
            </div>
           </div>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadPostItem}
              hasMore={this.state.hasMorePost}
              loader={<div className="loader">Loading ...</div>}>
              {this.state.items}
            </InfiniteScroll>
          </div>
        </div>
        <FloatingBtn style={{'right':'30px', 'bottom':'50px'}} icon={'/resources/main/Writing_btn.svg'} link={'editor'}/>
      </div>
    )
  }

}
export default SearchPage;
