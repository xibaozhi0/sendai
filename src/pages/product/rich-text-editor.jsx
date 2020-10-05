/*
製品の詳細を指定するためのリッチテキストエディターコンポーネント
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {
  
  static propTypes = {
    detail: PropTypes.string
  }
  
  state = {
    editorState: EditorState.createEmpty(), // コンテンツのない編集オブジェクトを作成します
  }

  constructor(props) {
    super(props)
    const html = this.props.detail
    if (html) { // 値がある場合は、html形式の文字列に基づいて対応する編集オブジェクトを作成します
      const contentBlock = htmlToDraft(html)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState,
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(), // コンテンツのない編集オブジェクトを作成します
      }
    }

  }

  /*
  入力中のリアルタイムのコールバック
   */
  onEditorStateChange = (editorState) => {
   
    this.setState({
      editorState,
    })
  }

  getDetail = () => {
    // 入力データに対応するHTML形式のテキストを返します
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {

        const url = window.URL || window.webkitURL
        let src = url.createObjectURL(file)
        resolve({data: {link: src}})
      }
    )
  }

  render() {
    const {editorState} = this.state
    return (
      <Editor
        localization={{ locale: 'zh' }}
        editorState={editorState}
        editorStyle={{border: '1px solid #F1F1F1', minHeight: 200, paddingLeft: 10,
        borderRadius: '2px !important'}}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    )
  }
}