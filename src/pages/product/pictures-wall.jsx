import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteImg } from '../../api'
/*
画像アップロードのコンポーネント
 */
export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false, // 大きな画像プレビューモーダルを表示するかどうか
    previewImage: '', // 大きな画像url
    fileList: [
      {
         uid: '-1', // every file has its unique id
        name: 'xxx.png', // filename of picture
        status: 'done', // picture state: done-アップロードしました, uploading: アップロード中, removed: 削除された
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // address of picture
      }
    ]
  }

  constructor(props) {
    super(props)

    let fileList = []

    // imgs属性が渡された場合
    const { imgs } = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: img, // every file has its unique id
        name: img, /// filename of picture
        status: 'done', // picture state: done-アップロードしました, uploading: アップロード中, removed: 削除された
        url: img
      }))
    }

    // 初期化状態
    this.state = {
      previewVisible: false, // 大きな画像プレビューモーダルを表示するかどうか
      previewImage: '', // 大きな画像url
      fileList // アップロードされたすべての画像の配列
    }
  }

  /*
  アップロードされたすべての画像ファイル名の配列を取得します
   */
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  /*
  モーダルを非表示
   */
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    console.log('handlePreview()', file)
    // 指定したファイルに対応する全体像を表示します
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  /*
  file：現在操作されている画像ファイル（アップロード/削除）
  fileList：アップロードされたすべての画像ファイルオブジェクトの配列
   */
  handleChange = async ({ file, fileList }) => {
    console.log(file, fileList
    )

    // アップロードが成功したら、現在アップロードされているファイルの情報(name, url)を変更します
    if  (file.status === 'removed') {
      // 画像削除
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('画像が正常に削除されました!')
      } else {
        message.error('画像を削除できませんでした!')
      }
    }
    

  }
  handleCustomRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) => {
    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    const url = window.URL || window.webkitURL
    let src = url.createObjectURL(file)
  
    const response = {
      uid: src,
      name: src,
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: src,
    }
    // this.handleChange(response)
    this.setState({
      fileList: [...this.state.fileList, { ...response }]
    })
  }
  handleRemove = (file) => {
     // 画像を削除
     console.log(file)
     const fileList = this.state.fileList.filter((item) => {
        return item.uid !== file.uid
     })
     this.setState({
      fileList
     })
     return true
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>画像をアップロード</div>
      </div>
    )
    return (
      <div>
        <Upload
          action="/manage/img/upload" /*画像をアップロードするためのインターフェイスアドレス*/
          accept="image/*" /*画像形式のみを受け入れる*/
          name="image" /*リクエストパラメーター名*/
          listType="picture-card" /*カードスタイル*/
          customRequest={this.handleCustomRequest}
          fileList={fileList} /*アップロードされたすべての画像ファイルオブジェクトの配列*/
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}

        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
