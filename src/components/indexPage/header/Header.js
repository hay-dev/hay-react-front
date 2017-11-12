import React from 'react';

import styles from './Header.css';

const propTypes = {
   
}

class Header extends React.Component{

  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return (
      <div className={styles.header}>
        <ul>
          <li style={{"float": "left"}}><a href="#">Icon</a></li>
          <li><a href="#">Btn</a></li>
          <li><a href="#">Btn</a></li>
          <li><a href="#">Btn</a></li>
        </ul>
      </div>
    )
  }

}

Header.propTypes = propTypes;

export default Header;
