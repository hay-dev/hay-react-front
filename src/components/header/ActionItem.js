import React from 'react';

const propTypes = {
  className: React.PropTypes.string,
  onAction: React.PropTypes.func.isRequired,
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
    return (<img onClick={this.props.doAction} className={this.props.className} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} src={this.state.icon}/>)
  }

}

ActionItem.propTypes = propTypes;
ActionItem.defaultProps = defaultProps;

export default ActionItem;
