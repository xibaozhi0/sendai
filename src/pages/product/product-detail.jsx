import React, { Component } from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'
import memoryUtils from "../../utils/memoryUtils";
import {reqCategory} from '../../api'
const Item = List.Item
export default class ProductDetail extends Component {
  state = {
    cName1: '', // 一次分類名前
    cName2: '', // 二次分類名前
  }

  async componentDidMount () {

    // 現在の製品のカテゴリIDを取得します
    const {pCategoryId, categoryId} = this.props.location.state.product
    if(pCategoryId==='0') { // 一次分類の商品
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    } else { // 二次分類の商品
      // 複数のリクエストを一度に送信します。それらが成功した場合のみ、通常どおり処理されます。
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  /*
 アンインストールする前に保存データを消去する
 */
  componentWillUnmount () {
    memoryUtils.product = {}
  }
  render() {

    // 運ばれた状態データを読む

    console.log(this.props.location.state.product )
    const {name, desc, price, detail, imgs} = this.props.location.state.product  
    const {cName1, cName2} = this.state
    console.log(cName1, cName2)
    const title = (
      <span>
          <Icon
            className="ant-dropdown-link"
            type='arrow-left'
            style={{marginRight: 10, fontSize: 20, color:'#1890ff'}}
            onClick={() => this.props.history.goBack()}
          />

        <span>製品詳細</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">製品説明:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品価格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">カテゴリー:</span>
            <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">製品写真:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">製品詳細:</span>
            <span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
          </Item>

        </List>
      </Card>
    )
  }
}
