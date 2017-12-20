import React from 'react';
import axios from 'axios';

import CKEditor from "react-ckeditor-component";
import styles from './editorPage.css';
import Controller from './controller';

import Header from '../global/header';
import Footer from '../global/footer';

let headerActions = [
    {
        icon: '/resources/writing_view/save_btn_off.svg',
        hoverIcon: '/resources/writing_view/save_btn_on.svg'
    }
]

const CKEditorConfig = {
    toolbarGroups: [
        {name: 'styles', groups: ['styles']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'insert', groups: ['insert']},
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        {name: 'forms', groups: ['forms']},
        {name: 'links', groups: ['links']},
        {name: 'colors', groups: ['colors']},
        {name: 'tools', groups: ['tools']},
        {name: 'others', groups: ['others']},
        {name: 'about', groups: ['about']}],
    removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,Scayt,SelectAll,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Underline,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,BidiLtr,BidiRtl,Language,Link,Unlink,Anchor,Flash,Image,Form,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,TextColor,BGColor,Maximize,ShowBlocks,About',
    height: 500,
    uiColor: '#ffffff',
    resize_enabled: false,
    removePlugins: 'elementspath'
};


class EditorPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '제목을 적어주세요',
            content: '당신의 하루를 적어주세요.',
            location: null,
            weather: 0
        };
        this.onLineSelected = this.onLineSelected.bind(this);
        this.onImageSelected = this.onImageSelected.bind(this);
        this.onWeatherSelected = this.onWeatherSelected.bind(this);
        this.onLocationSelected = this.onLocationSelected.bind(this);
        this.onChange = this.onChange.bind(this);
        this.uploadPost = this.uploadPost.bind(this);

        headerActions[0].onClick = this.uploadPost;
    }

    uploadPost() {
        axios.post('http://localhost:8080/articles', {
            'title': this.state.title,
            'content': this.state.content,
            'weather': this.state.weather,
            'location': this.state.location,
            'author': {
                'id': 14
            }
        })
            .then(response => {
                console.log(this);
                if (response.status === 201) {
                   this.props.history.push('/');
                } else {
                    alert('글을 업로드하지 못했습니다. 잠시 후 다시 시도해주세요.');
                }
            })
            .catch(response => {
                console.log(response);
                alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            })
    }

    onWeatherSelected(weather) {
        this.setState({'weather': weather});
    }

    onLocationSelected(location) {
        this.setState({'location': location});
    }

    onLineSelected(lineStyle) {
        let lineElem = '<hr style="border: 0; border-top: ' + lineStyle + '"/>';
        let newContent = this.state.content + lineElem;
        this.forceUpdateContent(newContent);
        this.setState({'content': newContent})
    }

    onImageSelected(imageData) {
        let imageElem = '<img style="width:500px; display:block;" src="' + imageData + '"/>';
        let newContent = this.state.content + imageElem;
        this.forceUpdateContent(newContent);
        this.setState({'content': newContent})
    }

    forceUpdateContent(newContent) {
        document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByClassName('cke_editable')[0].innerHTML = newContent;
    }

    onChange(evt) {
        let newContent = evt.editor.getData();
        this.setState({
            content: newContent
        });
    }

    render() {
        return (
            <div>
                <Header actions={headerActions}/>
                <div className={styles.contents}>
                    <div className={styles.editor}>
                        <div className={styles.date}>{'Dec.19.2017'}</div>
                        <textarea className={styles.title} value={this.state.title} onChange={(e) => {
                            this.setState({title: e.target.value});
                        }}></textarea>
                        <CKEditor
                            activeClass="p10"
                            config={CKEditorConfig}
                            content={this.state.content}
                            events={{"change": this.onChange}}
                        />
                        <Controller
                            onLineSelected={this.onLineSelected}
                            onImageSelected={this.onImageSelected}
                            onWeatherSelected={this.onWeatherSelected}
                            onLocationSelected={this.onLocationSelected}
                        />
                        <textarea className={styles.tags} placeholder={'#태그를_입력해_주세요'}></textarea>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default EditorPage;
