import React from 'react';

import styles from './PostItem.css';

const propTypes = {

}

class PostItem extends React.Component{

  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return (
      <div className={styles.postItem}>
        <div className={styles.header}>
          <img className={styles.thumbnail} src={"https://assets.punchdrink.com/wp-content/uploads/2016/03/Article-Second-Cheapest-Wine-By-the-Glass-Restaurant-Dining-NYC-Gramercy-Tavern-Juliette-Pope-David-Lynch-Jose-Andres.jpg"}/>
          <span className={styles.date}>Nov. 08. 2017</span>
          <span className={styles.tags}>#혼박 #연남동 #혼술 #산책 #나들이</span>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>AI VUX 기획 밉문자를 위한 실전 TIP</span>
            <div className={styles.weather}></div>
          </div>
          <div className={styles.summary}>
          지난겨울 한창 휴가를 즐기던 중 새로운 프로젝트가 시작되었다는 소식에 마지막
여행코스를 돌지 못하고 급히 복귀하게 되었습니다. 당시 만나게 된 그 새 프로젝트는
음성인식 스피커의 음성 인터페이스를 설계하는 것이었고 필자는 잠시 머릿속이 텅 비는
경험을 했었습니다.
사실 Voice UX는 생소한 것이 아니라 예전부터 있었습니다만 왜 과거 피처폰 시절에
스마트폰 UI를 설계해야 했을 때처럼 생소하고 또 당황했을까요? (필자만 그렇다면 이
글을 읽는 당신은 이미 입문자가 아닙니다.)
          </div>
          <ul className={styles.footer}>
            <li>내방에서</li>
            <li>댓글2</li>
            <li>혼럽8</li>
            <li className={styles.button}>삭제</li>
            <li className={styles.button}>수정</li>
          </ul>
        </div>
      </div>
    )
  }

}

PostItem.propTypes = propTypes;

export default PostItem;
