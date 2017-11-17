import React from 'react';

import CKEditor from "react-ckeditor-component";
import axios from 'axios';
import styles from './editorPage.css';
import Controller from './controller';

import Header from '../global/header';
import Footer from '../global/footer';

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
      title: '제목을 적어주세요',
      content: '당신의 하루를 적어주세요.',
      address: '',
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
      {icon: '/resources/writing_view/save_btn_off.svg', hoverIcon:'/resources/writing_view/save_btn_on.svg', onClick: this.uploadPost}
    ]
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.editor}>
            <div className={styles.date}>{this.state.date}</div>
            <textarea className={styles.title} value={this.state.title} onChange={(e)=>{this.setState(title:e.target.value)}}></textarea>
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

  uploadPost(){
    let method = 'post';
    let url = ARTICLE_URL;
    if(this.state.id){
      method = 'put';
      url += this.state.id;
    }
    axios({
      method: method,
      url: url,
      data: { ...this.state }
    }).then(function (response) {
      window.location = '/';
    });
  }

  componentDidMount(){
    let articleId = getQueryStringValue('article');
    let _self = this;
    if(articleId){
      axios.get(ARTICLE_URL+articleId)
      .then(function(response) {
        if(response.data){
          _self.forceUpdateContent(response.data.content);
          _self.setState({content:response.data.content,
                          title:response.data.title,
                          id:articleId,
                          location:response.data.location,
                          weather:response.data.weather,
                          date:response.data.writeDate,
                          writer:response.data.author});
        }
      });
    }
  }

  onWeatherSelected(weather){
    this.setState({weather});
  }

  onAddressSelected(address){
    this.setState({address});
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
export default EditorPage;
