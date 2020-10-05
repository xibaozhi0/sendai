import React, { Component } from 'react'
import { reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api'
import { Divider, Card, Button, Icon, Table, Modal, message } from 'antd'
import AddForm from './add-form'
import UpdateForm from './update-form'
export default class Category extends Component {
  state = {
    categorys: [],
    subCategorys: [],
    loading: false,
    cate_id: 0,
    parentName: '',
    showStatus: 0, // 0-non display  1 add display 2 update display
  }
  initColumns() {
    this.columns = [
      {
        title: 'category name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'do it',
        width: 200,
        render: (category) => (
          <span >
            <b onClick={()=>{
              this.category = category 
              this.setState({showStatus:2})
            }} className="ant-dropdown-link">edit category</b>
            <Divider type="vertical" />
            {
              category.parentId === '0' ? <b className="ant-dropdown-link" onClick={this.showSubCateGory.bind(this, category)} >check sub category</b>
              : null
            }
            </span>
        )
      }
    ]
  }
  showSubCateGory(category) {
    this.setState({
      cate_id:category._id,
      parentName:category.name
    }, () => {
      this.getCategorys()
    })
  }
  async getCategorys() {
    this.setState({
      loading:true
    })
    const id = this.state.cate_id
    const categorys = await reqCategorys(id)

    if (id === 0) {
      this.setState({
        categorys,
        loading: false
      })
    } else {
      this.setState({
        subCategorys: categorys,
        loading: false
      })
    }
  }
  backCategory = () => {
    this.setState({
      cate_id: 0,
      subCategorys: [],
      parentName: ''
    })
  }
  handleCancel() {
    this.form.resetFields()
    this.setState({
      showStatus:0
    })
  }
  addCategory(){
    this.form.validateFields(async (err, values) => {
      //successful to check
      if (!err) {
        this.setState({
          showStatus:0
        })
        await reqAddCategory(values.categoryName, values.parentId)
        this.form.resetFields()
        message.success('successful to add category')
        if (values.parentId === '0') {
          this.setState({
            cate_id:0
          }, () => {
            this.getCategorys()
          })
        } else {
          this.getCategorys()
        }
        
      }
    })
  }
  updateCategory(){
    this.form.validateFields(async(err, values) => {
      // successful to check
      if (!err) {
        this.setState({
          showStatus:0
        })
        const categoryId = this.category._id
        const categoryName = values.categoryName
        if (!categoryName || this.category.name === categoryName) {
          message.info('no edit')
          return
        }
        this.form.resetFields()
        await reqUpdateCategory({categoryId, categoryName})
        message.success('successful to edit')
        this.getCategorys()
      }
    })
  } 
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
     this.getCategorys()
  }
  render() {
    const {categorys, loading, subCategorys, cate_id, parentName,showStatus} = this.state
    const category = this.category || {}
    const title = cate_id === 0 ? '' : (
      <span onClick={this.backCategory}>{parentName}</span>
    )
    const extra = (
      <Button type="primary" onClick={()=>{this.setState({showStatus:1})}}>
        <Icon type="plus" />
        add
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          dataSource={cate_id === 0 ? categorys : subCategorys}
          rowKey="_id"
          columns={this.columns}
        />
        <Modal
          title="add category"
          visible={showStatus===1}
          onOk={this.addCategory.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <AddForm categorys={categorys} parentId={cate_id.toString()}  setForm = {(form)=> {this.form = form}}></AddForm>
        </Modal>
        <Modal
        title="add category"
        visible={showStatus===2}
        onOk={this.updateCategory.bind(this)}
        onCancel={this.handleCancel.bind(this)}
      >
        <UpdateForm categoryName={category.name}
         setForm = {(form)=> {this.form = form}}>
         </UpdateForm>
      </Modal>
      </Card>
    )
  }
}
