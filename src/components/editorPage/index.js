import React from 'react';

import CKEditor from "react-ckeditor-component";
import axios from 'axios';
import styles from './editorPage.css';
import Controller from './controller';

import Header from '../global/header';
import Footer from '../global/footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as postActions from '../../actions/post';


const ARTICLE_URL = '';

const CKEditorConfig = { toolbarGroups : [
  { name: 'styles', groups: [ 'styles' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }],
    removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,Scayt,SelectAll,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Underline,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,BidiLtr,BidiRtl,Language,Link,Unlink,Anchor,Flash,Image,Form,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,TextColor,BGColor,Maximize,ShowBlocks,About',
    height: 500,
    uiColor: '#ffffff',
    resize_enabled: false,
    removePlugins: 'elementspath'
  };


function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

class EditorPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      title: '',
      content: '당신의 하루를 적어주세요.',
      location: '',
      weather: '',
      date: 'Nov.18.2017',
      tags: ''
    }

    this.onAddressSelected = this.onAddressSelected.bind(this);
    this.onLineSelected = this.onLineSelected.bind(this);
    this.onImageSelected = this.onImageSelected.bind(this);
    this.onWeatherSelected = this.onWeatherSelected.bind(this);
    this.uploadPost = this.uploadPost.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render(){
    let headerActions = [
      {icon: '/resources/writing_view/save_btn_off.svg', hoverIcon:'/resources/writing_view/save_btn_on.svg', link: '/', onClick: this.uploadPost}
    ]
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.editor}>
            <div className={styles.date}>{this.state.date}</div>
            <textarea className={styles.title} value={this.state.title} placeholder={'제목을 적어주세요'} onChange={(e)=>{this.setState({title:e.target.value})}}></textarea>
            <CKEditor
              activeClass="p10"
              config={CKEditorConfig}
              content={this.state.content}
              events={{"change": this.onChange}}
             />
             <Controller
               onAddressSelected= {this.onAddressSelected}
               onLineSelected= {this.onLineSelected}
               onImageSelected= {this.onImageSelected}
               onWeatherSelected = {this.onWeatherSelected}
             />
             <textarea className={styles.tags} value={this.state.tags} onChange={(e)=>this.setState({tags:e.target.value})} placeholder={'#태그를_입력해_주세요'}></textarea>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  componentDidMount(){
    if(this.props.post){
      this.setState(this.props.post);
    }
  }

  uploadPost(){
    if(getQueryStringValue('article')){
      this.props.updatePost(getQueryStringValue('article'), this.state);
    }else{
      this.props.uploadPost(this.state);
    }
  }

  onWeatherSelected(weather){
    this.setState({weather});
  }

  onAddressSelected(location){
    this.setState({location});
  }

  onLineSelected(lineStyle){
    let lineElem = '<hr style="border: 0px; border-top: '+lineStyle+'"/>';
    let newContent = this.state.content+lineElem;
    this.forceUpdateContent(newContent);
    this.setState({content: newContent})
  }

  onImageSelected(imageData){
    let imageElem = '<img style="width:500px; display:block;" src="'+imageData+'"/>';
    let newContent = this.state.content+imageElem;
    this.forceUpdateContent(newContent);
    this.setState({content: newContent})
  }

  forceUpdateContent(newContent){
    document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByClassName('cke_editable')[0].innerHTML=newContent;
  }

  onChange(evt){
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }

}


const mapStateToProps = (state) => {
  let articleId = getQueryStringValue('article');
  return (articleId)? {post:state.post.list[articleId]}: {};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ...postActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
