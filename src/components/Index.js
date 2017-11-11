import React from 'react'
import IndexPage from './indexPage/IndexPage';
import store from '../store';
import { Provider } from 'react-redux';

class Index extends React.Component{
  render(){
    return (
      <Provider store = {store}>
        <IndexPage/>
      </Provider>
    );
  }

}

export default Index;
