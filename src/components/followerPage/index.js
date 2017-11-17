import React from 'react';

import axios from 'axios';
import styles from './FollowerPage.css';
import { Link } from 'react-router-dom';

import Header from '../global/header';
import Footer from '../global/footer';

class FollowerPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div>
        <Header/>
        <div className={styles.contents}>
          <div className={styles.follower_content}>
            <img src={'/resources/dummy/follower_page.PNG'}/>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}

export default FollowerPage;
