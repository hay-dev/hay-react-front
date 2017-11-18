import React from 'react';
import axios from 'axios';
import styles from './LocationController.css';

let apiUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=30&resultType=json&confmKey=U01TX0FVVEgyMDE3MTExNzE5NTEwNDEwNzQ5MTE=&keyword=';

const propTypes = {
  onAddressSelected: React.PropTypes.func.isRequired
}

class LocationController extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      searchText: ''
    }
    this.search = this.search.bind(this);
  }

  search(){
    let _self = this;
    axios.get(apiUrl+this.state.searchText)
      .then(function (response) {
        if(response.data.results.common.errorMessage=='정상'){
          let addressList = response.data.results.juso.map(function(addr){
            return {name:addr.bdNm, detail:addr.jibunAddr};
          });
          _self.setState({addressList: addressList});
        }else{
          _self.setState({addressList: undefined, searchText: response.data.results.common.errorMessage})
        }
      });
  }

  render(){
    let renderLocation = (addressList)=>{
      let _self = this;
      if(addressList&&addressList.length>0){
        return addressList.map(function(addr, idx){
          return (<div key={addr+idx} onClick={()=>_self.props.onAddressSelected(addr.detail)} className={styles.addr}>
            {addr.name}
            <h6>{addr.detail}</h6>
          </div>)
        });
      }else{
        return (<img className={styles.thumbnail} src={'/resources/writing_view/location_icon.PNG'}/>)
      }
    }
    return (
      <div className={styles.locationController}>
        <div className={styles.content}>
          <textarea value={this.state.searchText} onChange={(e)=>this.setState({searchText:e.target.value})} className={styles.searchBar} placeholder={'위치를 검색해 주세요'}></textarea>
          <img onClick={this.search} className={styles.searchBtn} src={'/resources/navi/seach_btn.svg'}/>
          <div className={styles.locationList}>
            {renderLocation(this.state.addressList)}
          </div>
        </div>
      </div>
    )
  }

}

LocationController.propTypes = propTypes;
export default LocationController;
