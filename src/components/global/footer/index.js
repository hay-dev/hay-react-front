import React from 'react';

import styles from './Footer.css';
import { Link } from 'react-router-dom';

import ImageButton from '../imageButton';

class Header extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    let renderActionItems = (actions) =>{
      if(actions)
      return actions.map(function(actionItem, index){
        return (<li key={index}>
                </li>)
      });
    }
    return (
      <div className={styles.footer}>
        <div className={styles.context}>
          <h4 className={styles.copyright}>{'Copyright (c) depmeet Corp.'}</h4>
          <ul className={styles.sns}>
            <li><img src={'/resources/footer/blog.svg'}/></li>
            <li><img src={'/resources/footer/faceboook.svg'}/></li>
            <li><img src={'/resources/footer/google.svg'}/></li>
            <li><img src={'/resources/footer/twitter.svg'}/></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;
