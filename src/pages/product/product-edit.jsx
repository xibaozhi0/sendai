import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Cascader,
  Button,
  message
} from 'antd'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import {reqCategorys, reqAddOrUpdateProduct} from '../../api'

const {Item} = Form
const { TextArea } = Input
class ProductEdit extends Component {
  state = {
    options: [],
  }
  constructor (props) {
    super(props)

    // refで識別されるラベルオブジェクトを保持するコンテナーを作成する
    this.pw = React.createRef()
    this.editor = React.createRef()
  }

  initOptions = async(categorys) => {
    //カテゴリに基づいてオプション配列を生成する
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 葉ではなく
    }))
     // セカンドクラス製品のアップデートの場合
     const {isUpdate, product} = this
     const {pCategoryId} = product
     if(isUpdate && pCategoryId!=='0') {
       //対応する二次分類リストを取得する
       const subCategorys = await this.getCategorys(pCategoryId)
       // セカンダリドロップダウンリストを生成するためのオプション
       const childOptions = subCategorys.map(c => ({
         value: c._id,
         label: c.name,
         isLeaf: true
       }))
 
       // 現在の製品に対応する第1レベルのオプションオブジェクトを見つける
       const targetOption = options.find(option => option.value===pCategoryId)
 
       // 対応する第1レベルオプションに関連付けられています
       targetOption.children = childOptions
     }
    // オプションのステータスを更新する
    this.setState({
      options
    })
  }
 /*
  最初/二次カテゴリリストを非同期で取得し、非同期関数の戻り値が新しいpromiseオブジェクトであることを示します。
  promiseの結果と値はasyncの結果によって決定されます
   */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)   // {status: 0, data: categorys}
    const categorys = result
      // 第1レベルの分類リストの場合
      if (parentId==='0') {
        this.initOptions(categorys)
      } else { // 二次リスト
        return categorys  // 二次リストに戻る==>現在の非同期関数によって返されたpromsieは成功し、値はカテゴリになります
      }
  }
  componentDidMount () {
    this.getCategorys('0')
  }
  componentWillMount() {
    const product = this.props.location.state ? this.props.location.state.product : null
    this.isUpdate = !! product
    this.product = product || {}
  }
  validatePrice = (rule, value, callback) => {
 
    if (value*1 > 0) {
      callback() //確認済み
    } else {
      callback('価格は0より大きくなければなりません') // 確認できませんでした
    }
  }
   /*
  コールバック関数を使用して、次のレベルのリストをロードします
   */
  loadData = async selectedOptions => {
    console.log(selectedOptions)
    // 選択したオプションオブジェクトを取得します
    const targetOption = selectedOptions[0]
    // 表示 loading
    targetOption.loading = true

    // 選択したカテゴリに応じて、セカンダリカテゴリのリストの取得をリクエストします
    const subCategorys = await this.getCategorys(targetOption.value)
    // 読み込みを非表示
    targetOption.loading = false
    // 2次分類配列にはデータがあります
    if (subCategorys && subCategorys.length>0) {
      //2次リストを生成するためのオプション
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 現在のオプションにリンク
      targetOption.children = childOptions
    } else { // 現在選択されているカテゴリにはセカンダリカテゴリがありません
      targetOption.isLeaf = true
    }

    // オプションのステータスを更新する
    this.setState({
      options: [...this.state.options],
    })
  }
  submit = () => {
    // フォーム検証を実行し、合格した場合はリクエストを送信します
    this.props.form.validateFields(async (error, values) => {
      if (!error) {

        // 1.データを収集し、製品オブジェクトにカプセル化します
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length===1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        const product = {name, desc, price, imgs, detail, pCategoryId, categoryId}

        if(this.isUpdate) {
          product._id = this.product._id
        }

        // 2. 追加/更新するインターフェース要求関数を呼び出す
        const result = await reqAddOrUpdateProduct(product)

        // 3. 結果に応じてプロンプト
        if (result.status===0) {
          message.success(`${this.isUpdate ? '更新' : '追加'}商品成功!`)
          this.props.history.goBack()
        } else {
          message.error(`${this.isUpdate ? '更新' : '追加'}商品失败!`)
        }
      }
    })
  }
  render() {
    const {isUpdate, product} = this
    const {pCategoryId, categoryId, imgs, detail} = product
    const categoryIds = []
    if (isUpdate) { 
      if(pCategoryId==='0') {
        categoryIds.push(categoryId)
      } else {
        // 製品はセカンドクラスの製品です
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
  
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },  // 左ラベルの幅
      wrapperCol: { span: 8 }, // 右ラベルの幅
    }
     // 左方向
     const title = (
      <span>
        <b onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </b>
        <span>{ isUpdate ? '商品変更' : '商品'}</span>
      </span>
    )
  
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  {required: true, message: '商品名を入力してください'}
                ]
              })(<Input placeholder='商品名を入力してください'/>)
            }
          </Item>
          <Item label="商品説明">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  {required: true, message: '商品説明を入力してください'}
                ]
              })(<TextArea placeholder="商品説明を入力してください" autosize={{ minRows: 2, maxRows: 6 }} />)
            }

          </Item>
          <Item label="商品価格">

            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  {required: true, message: '商品価格を入力してください'},
                  {validator: this.validatePrice}
                ]
              })(<Input type='number' placeholder='商品価格を入力してください' addonAfter='円'/>)
            }
          </Item>
           <Item label="商品分類">
            {
              getFieldDecorator('categoryIds', {
                initialValue: categoryIds,
                rules: [
                  {required: true, message: '商品種類を入力してください'},
                ]
              })(
                <Cascader
                  placeholder='商品種類を入力してください'
                  options={this.state.options}  /*表示するリストデータの配列*/
                  loadData={this.loadData} /*特定のリスト項目が選択されると、次のレベルのリストの監視コールバックがロードされます*/
                />
              )
            }
          </Item>
          <Item label="製品写真">
          <PicturesWall ref={this.pw} imgs={imgs}/>
        </Item>
        <Item label="商品詳細" labelCol={{span: 2}} wrapperCol={{span: 20}}>
        <RichTextEditor ref={this.editor} detail={detail}/>
      </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提出</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(ProductEdit)
