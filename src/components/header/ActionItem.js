import React from 'react';

import { Link } from 'react-router-dom';

const propTypes = {
  className: React.PropTypes.string,
  link: React.PropTypes.string.isRequired,
  defaultIcon: React.PropTypes.string.isRequired,
  hoverIcon: React.PropTypes.string
}

const defaultProps = {
  styleName: ''
}

class ActionItem extends React.Component{
  constructor(props) {
      super(props);
      this.mouseOver = this.mouseOver.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
      this.state = {
          icon: props.defaultIcon
      };
  }

  mouseOver() {
    if(this.props.hoverIcon)
      this.setState({icon: this.props.hoverIcon});
  }

  mouseOut() {
      this.setState({icon: this.props.defaultIcon});
  }

  render(){
    return (<Link to={this.props.link}><img onMouseLeave={this.mouseOut} className={this.props.className} onMouseOver={this.mouseOver} src={this.state.icon}/></Link>)
  }

}

ActionItem.propTypes = propTypes;
ActionItem.defaultProps = defaultProps;

export default ActionItem;
