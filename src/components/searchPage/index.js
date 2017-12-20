import React from 'react';
import axios from 'axios';

import styles from './Index.css';

import Header from '../global/header';
import FloatingBtn from '../global/floatingButton';
import ListItem from './listItem';

import InfiniteScroll from 'react-infinite-scroller';

const itemList = [{
    title: 'AI VUX 기획 입문자를 위한 실전 Tip',
    content: '지난겨울 한창 휴가를 즐기던 중 새로운 프로젝트가 시작되었다는 소식에 마지막 여행코스를 돌지 못하고 급히 복귀하게 되었습니다. 당시 만나게 된 그 새 프로젝트는 음성인식 스피커의 음성 인터페이스를 설계하는 것이었고 필자는 잠시 머릿속이 텅 비는 경험을 했었습니다. 사실 Voice UX는 생소한 것이 아니라 예전부터 있었습니다만 왜 과거 피처폰 시절에 스마트폰 UI를 설계해야 했을 때처럼 생소하고 또 당황했을까요? (필자만 그렇다면 이 글을 읽는 당신은 이미 입문자가 아닙니다.)',
    date: 'Nov.11.2017', location: '연남동 심야식다 하스',
    writer: '홍길동',
    profileImg: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1'
}];

class SearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMorePost: true,
            items: []
        };
        this.search = this.search.bind(this);
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

    loadRecentPostItem(text) {
        axios.get('http://localhost:8080/articles/search/recent?query=' + text)
            .then(response => {
                this.setState({
                    items: this.state.items.concat(response.data)
                }, () => {
                    if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                        this.state.hasMorePost = false;
                    }
                });
                console.log(this.state.items);
            })
            .catch(response => {
                console.log(response);
            });
    }

    loadPostItem(text) {
        axios.get('http://localhost:8080/articles/search?query=' + text + '&last_id=' + (this.state.items[this.state.items.length - 1].id - 1))
            .then(response => {
                this.setState({
                    items: this.state.items.concat(response.data)
                }, () => {
                    if (response.data.length === 0 || this.state.items[this.state.items.length - 1].id === 1) {
                        this.state.hasMorePost = false;
                    }
                });
                console.log(this.state.items);
            })
            .catch(response => {
                console.log(response);
            });
    }

    search(text) {
        this.loadRecentPostItem(text);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            //---------------------------------------------------검색
            e.preventDefault();
            this.search(e.target.value);
        }
    }

    renderPostItems() {
        if (this.state.items.length === 0) {
            return (
                <div>게시물이 없습니다.</div>
            );
        }
        return this.state.items.map(article => {
            console.log(article);
            return (
                <ListItem
                    key={article.id}
                    title={article.title}
                    content={article.content}
                    date={article.writeDate}
                    location={article.location}
                    writer={article.author.email}
                    profileImg="profile Image"
                    onClick={e => {
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
                        <input type="text" className={styles.searchBar} onKeyPress={this.handleKeyPress.bind(this)}
                               placeholder={'가나다라'}/>
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
                            {this.renderPostItems()}
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
