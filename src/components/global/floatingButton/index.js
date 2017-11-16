import React from 'react';

import styles from './FloatingButton.css';
import { Link } from 'react-router-dom';

const propTypes = {
  style: React.PropTypes.object.isRequired,
  link: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired
}

class Header extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={this.props.style} className={styles.floatingBtn}>
        <Link to={this.props.link}><img src={this.props.icon}/></Link>
      </div>
    )
  }

}

Header.propTypes = propTypes;

export default Header;
