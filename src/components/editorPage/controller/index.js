import React from 'react';
import styles from './controller.css';
import LocationController from './locationController';
import LineController from './lineController';
import WeatherController from './weatherController';

const Weather = 'weather-modal';
const Image = 'image-modal';
const Location = 'location-modal';
const Line = 'line-modal';

const propTypes = {
    onLocationSelected: React.PropTypes.func.isRequired,
    onLineSelected: React.PropTypes.func.isRequired,
    onImageSelected: React.PropTypes.func.isRequired,
    onWeatherSelected: React.PropTypes.func.isRequired
};

class Controller extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: ''
        }
        this.onWeatherSelected = this.onWeatherSelected.bind(this);
        this.onLocationSelected = this.onLocationSelected.bind(this);
        this.onLineSelected = this.onLineSelected.bind(this);
        this.imageLoad = this.imageLoad.bind(this);
    }

    toggleDialog(e, modal) {
        let targetElement = e.target.getBoundingClientRect();
        let parentElement = e.target.parentNode.getBoundingClientRect();
        let x = targetElement.left - parentElement.left;
        let y = targetElement.top - parentElement.top;
        this.setState({
            modal: (this.state.modal == modal) ? undefined : modal,
            x: x + 45,
            y: y - 50
        });
    }

    imageLoad() {
        var fr = new FileReader();
        fr.onload = (e) => {
            let data = e.target.result;
            if (data) {
                this.props.onImageSelected(data);
            }
        };
        var inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.addEventListener("change", function () {
            fr.readAsDataURL(inputElement.files[0]);
        });
        inputElement.dispatchEvent(new MouseEvent("click"));

    }

    onWeatherSelected(weather) {
        this.setState({modal: undefined});
        this.props.onWeatherSelected(weather);
    }

    onLocationSelected(location) {
        this.setState({modal: undefined});
        this.props.onLocationSelected(location);
    }

    onLineSelected(line) {
        this.setState({modal: undefined});
        this.props.onLineSelected(line);
    }

    render() {
        let getModal = (modal) => {
            switch (modal) {
                case Weather:
                    return <WeatherController onWeatherSelected={this.onWeatherSelected}/>;
                case Location:
                    return <LocationController onLocationSelected={this.onLocationSelected}/>;
                case Line:
                    return <LineController onLineSelected={this.onLineSelected}/>;
                case Image:
                    this.imageLoad();
                    return;
            }
        };
        let renderModal = (modal) => {
            if (modal) {
                let modalContext = getModal(modal);
                if (modalContext)
                    return (<div key={modal} style={{'right': this.state.x, 'top': this.state.y}}
                                 className={styles.controller_modal}>
                        <div className={styles.context}>
                            {modalContext}
                        </div>
                    </div>);
                else {
                    this.setState({modal: undefined});
                }
            }
        };
        return (
            <div className={styles.content_controller}>
                <img className={styles.item} onClick={(e) => this.toggleDialog(e, Weather)}
                     src={'/resources/writing_view/weather_btn.svg'}/>
                <img className={styles.item} onClick={(e) => this.toggleDialog(e, Image)}
                     src={'/resources/writing_view/img_btn.svg'}/>
                <img className={styles.item} onClick={(e) => this.toggleDialog(e, Location)}
                     src={'/resources/writing_view/map_btn.svg'}/>
                <img className={styles.item} onClick={(e) => this.toggleDialog(e, Line)}
                     src={'/resources/writing_view/line_btn.svg'}/>
                {renderModal(this.state.modal)}
            </div>
        )
    }

}

Controller.propTypes = propTypes;

export default Controller;
