import React from 'react';

import { Link } from 'react-router-dom';

const propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  defaultIcon: React.PropTypes.string.isRequired,
  hoverIcon: React.PropTypes.string
}

const defaultProps = {
  className: ''
}

class ImageButton extends React.Component{
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
    return (<img onClick={this.props.onClick} onMouseLeave={this.mouseOut} className={this.props.className} onMouseOver={this.mouseOver} src={this.state.icon}/>)
  }

}

ImageButton.propTypes = propTypes;
ImageButton.defaultProps = defaultProps;

export default ImageButton;
