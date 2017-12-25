import React from 'react';

const propTypes = {
    icon: React.PropTypes.string.isRequired,
    hoverIcon: React.PropTypes.string,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    link: React.PropTypes.string,
    onClick: React.PropTypes.func
};

const defaultProps = {
    style: {},
    className: '',
    link: '',
    onClick: () => {}
};

class ImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseOver() {
        if (this.props.hoverIcon) {
            this.setState({icon: this.props.hoverIcon});
        }
    }

    mouseLeave() {
        this.setState({icon: this.props.icon});
    }

    render() {
        return (
            <img src={this.props.icon}
                     onMouseOver={this.mouseOver}
                     onMouseLeave={this.mouseLeave}
                     onClick={this.props.onClick}
                     className={this.props.className}/>
        );
    }
}

ImageButton.propTypes = propTypes;
ImageButton.defaultProps = defaultProps;

export default ImageButton;
