import React from 'react';

import styles from './Header.css';
import { Link } from 'react-router-dom';

import ActionItem from './ActionItem';

const propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
     link: React.PropTypes.string.isRequired,
     icon: React.PropTypes.string.isRequired,
     hoverIcon: React.PropTypes.string
   }))
}

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
        return (<li key={index}><ActionItem link={actionItem.link} defaultIcon={actionItem.icon} hoverIcon={actionItem.hoverIcon}/></li>)
      });
    }
    return (
      <div className={styles.header}>
        <ul>
          <li style={{"float": "left"}}><Link to="/"><img className={styles.logo} src={'/resources/navi/logo.png'}/></Link></li>
            {renderActionItems(this.props.actions)}
        </ul>
      </div>
    )
  }

}

Header.propTypes = propTypes;

export default Header;
