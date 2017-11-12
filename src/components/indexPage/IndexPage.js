import React from 'react';

import styles from './Index.css';

import axios from 'axios';

import Header from './header/Header';


class IndexPage extends React.Component{

  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return (
      <div>
      <Header/>
      </div>
    )
  }

}
export default IndexPage;
