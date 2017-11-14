import React from 'react';
import axios from 'axios';
import styles from './controller.css';

class Controller extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div className={styles.content_controller}>
        <img className={styles.item} src={'/resources/writing_view/weather_btn.svg'}/>
        <img className={styles.item} src={'/resources/writing_view/img_btn.svg'}/>
        <img className={styles.item} src={'/resources/writing_view/map_btn.svg'}/>
        <img className={styles.item} src={'/resources/writing_view/line_btn.svg'}/>
      </div>
    )
  }

}
export default Controller;
