import React from 'react';

import styles from './Header.css';

import ActionItem from './ActionItem';

const propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
     onAction: React.PropTypes.func.isRequired,
     icon: React.PropTypes.string.isRequired,
     hoverIcon: React.PropTypes.string
   }))
}

class Header extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    let renderActionItems = (actions) =>{
      if(actions)
      return actions.map(function(actionItem, index){
        return (<li key={index}><ActionItem onAction={actionItem.onAction} defaultIcon={actionItem.icon} hoverIcon={actionItem.hoverIcon}/></li>)
      });
    }
    return (
      <div className={styles.header}>
        <ul>
          <li style={{"float": "left"}}><img className={styles.logo} src="/resources/navi/logo.svg"/></li>
            {renderActionItems(this.props.actions)}
        </ul>
      </div>
    )
  }

}

Header.propTypes = propTypes;

export default Header;
