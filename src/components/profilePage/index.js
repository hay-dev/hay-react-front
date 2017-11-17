import React from 'react';

import axios from 'axios';
import styles from './ProfilePage.css';

import Header from '../global/header';


class ProfilePage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.profile}>
            
          </div>
        </div>
      </div>
    )
  }

}
export default ProfilePage;
