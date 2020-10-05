import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'
class AddForm extends Component {
  static propTypes = {
    categorys:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }
  componentWillMount() {
    console.log(this.props)
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const {categorys,parentId} = this.props
    return (
      <Form> 
        <Form.Item> {
          getFieldDecorator('parentId', {
            initialValue:parentId,
            rules:[
              { required: true, message: 'you must select one！' }
            ]
          })(
            <Select>
              <Select.Option value="0">一次分類</Select.Option>
              {
                categorys.map((item) => {
                  return (
                    <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                  )
                })
              }
              
            </Select>
          )
        }
        </Form.Item>
        <Form.Item>
        {
          getFieldDecorator('categoryName', {
            rules:[
              { required: true, message: 'please input the category name' }
            ]
          })(
            <Input placeholder="please input the category name" /> 
          )
        }
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddForm)
