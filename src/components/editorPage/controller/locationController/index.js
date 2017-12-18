import React from 'react';
import axios from 'axios';
import styles from './LocationController.css';

let apiUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=30&resultType=json&confmKey=U01TX0FVVEgyMDE3MTExNzE5NTEwNDEwNzQ5MTE=&keyword=';

const propTypes = {
  onLocationSelected: React.PropTypes.func.isRequired
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
        console.log(response);
        console.log(response.data.results.common.errorMessage);
        if(response.data.results.common.errorMessage=='정상'){
          console.log(response.data.results.juso);
          let locationList = response.data.results.juso.map(function(addr){
            return {name:addr.bdNm, detail:addr.jibunAddr};
          });
          _self.setState({locationList: locationList});
        }else{
          _self.setState({locationList: undefined, searchText: response.data.results.common.errorMessage})
        }
      });
  }

  render(){
    let renderLocation = (locationList) => {
      let _self = this;
      if(locationList&&locationList.length>0){
        return locationList.map(function(addr, idx){
          return (<div key={addr+idx} onClick={()=>_self.props.onLocationSelected(addr.detail)} className={styles.addr}>
            {addr.name}
            <h6>{addr.detail}</h6>
          </div>)
        });
      }else{
        return (<img className={styles.thumbnail} src={'/resources/writing_view/location_icon.png'}/>)
      }
    }
    return (
      <div className={styles.locationController}>
        <div className={styles.content}>
          <input type="text" value={this.state.searchText} onChange={(e) => this.setState({searchText:e.target.value})}
                    className={styles.searchBar} placeholder={'위치를 검색해 주세요'} />
          <img onClick={this.search} className={styles.searchBtn} src={'/resources/navi/seach_btn.svg'} />
          <div className={styles.locationList}>
            {renderLocation(this.state.locationList)}
          </div>
        </div>
      </div>
    )
  }

}

LocationController.propTypes = propTypes;
export default LocationController;
