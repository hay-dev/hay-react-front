import React from 'react';

import styles from './Header.css';
import { Link } from 'react-router-dom';

import ImageButton from '../imageButton';

const propTypes = {
  actions: React.PropTypes.arrayOf(React.PropTypes.shape({
     link: React.PropTypes.string,
     onClick: React.PropTypes.func,
     icon: React.PropTypes.string.isRequired,
     hoverIcon: React.PropTypes.string
   }))
}

const defaultProps = {
  actions: []
}

const defaultHeaderActions = [
  {icon: '/resources/navi/Personal_btn.svg', link: '/profile'},
  {icon: '/resources/navi/follower_btn.svg', link: '/follower'},
  {icon: '/resources/navi/seach_btn.svg', link: '/search'}
]

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
        if(actionItem.link){
        return (<li key={index}>
                  <Link to={actionItem.link}>
                    <ImageButton defaultIcon={actionItem.icon} hoverIcon={actionItem.hoverIcon}/>
                  </Link>
                </li>)
        }else{
          return (<li key={index}>
                    <ImageButton onClick={actionItem.onClick} defaultIcon={actionItem.icon} hoverIcon={actionItem.hoverIcon}/>
                </li>)
        }
      });
    }
    return (
      <div className={styles.header}>
        <ul>
          <li style={{"float": "left"}}><Link to="/"><img className={styles.logo} src={'/resources/navi/logo.png'}/></Link></li>
            {renderActionItems([...defaultHeaderActions, ...this.props.actions])}
        </ul>
      </div>
    )
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
