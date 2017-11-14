import React from 'react';

import CKEditor from "react-ckeditor-component";
import axios from 'axios';
import styles from './editorPage.css';
import Controller from './controller';

import Header from '../header';

const headerActions = [
  {icon: '/resources/navi/Personal_btn.svg', link: 'Editor'},
  {icon: '/resources/navi/follower_btn.svg', link: 'Test'},
  {icon: '/resources/navi/seach_btn.svg', link: 'Test'},
  {icon: '/resources/writing_view/save_btn_off.svg', hoverIcon:'/resources/writing_view/save_btn_on.svg', link: 'Test'}
]

const CKEditorConfig = { toolbarGroups : [
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }],
    removeButtons:'Print,Preview,NewPage,Save,Source,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Form,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Underline,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,CreateDiv,BidiLtr,BidiRtl,Language,Link,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Format,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About',
    uiColor: '#ffffff',
    resize_enabled: false,
    removePlugins: 'elementspath'
  };

class EditorPage extends React.Component{

  constructor(props){
    super(props);

    this.state = {
        content: '당신의 하루를 적어주세요.'
    }
  }

  render(){
    return (
      <div>
        <Header actions={headerActions}/>
        <div className={styles.contents}>
          <div className={styles.editor}>
            <div className={styles.date}>{'Nov.11.2017'}</div>
            <textarea className={styles.title}>제목을 적어주세요</textarea>
            <CKEditor
              activeClass="p10"
              content={this.state.content}
              config={CKEditorConfig}
             />
             <Controller/>
          </div>
        </div>
      </div>
    )
  }

}
export default EditorPage;
