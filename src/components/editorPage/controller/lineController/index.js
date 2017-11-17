import React from 'react';
import axios from 'axios';
import styles from './LineController.css';

const propTypes = {
  onLineSelected: React.PropTypes.func.isRequired
}

class LineController extends React.Component{

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div className={styles.lineController}>
        <hr className={styles.line_boldx2} onClick={()=>this.props.onLineSelected('3px solid')}/>
        <hr className={styles.line_bold} onClick={()=>this.props.onLineSelected('2px solid')}/>
        <hr className={styles.line_solid} onClick={()=>this.props.onLineSelected('0.5px solid')}/>
        <hr className={styles.line_dotted} onClick={()=>this.props.onLineSelected('2px dotted')}/>
        <hr className={styles.line_thin} onClick={()=>this.props.onLineSelected('0.5px solid #e9e9e9')}/>
      </div>
    )
  }

}

LineController.propTypes = propTypes;
export default LineController;
