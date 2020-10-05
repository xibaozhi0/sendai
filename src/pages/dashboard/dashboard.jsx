import React, {Component} from 'react'
import {
  Skeleton, Switch,  Avatar ,
  Card,
  Col, Row,
  Statistic,
  DatePicker,
  Timeline,
  Icon
} from 'antd'
// import { EditOutlined, EllipsisOutlined, SettingOutlined,UpCircleOutlined  } from '@ant-design/icons';
import moment from 'moment'
import Line from './line'
import Bar from './bar'
import './dashboard.less'

const { Meta } = Card;

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker

export default class Dashboard extends Component {

  state = {
    loading: true,
    isVisited: true
  }

  handleChange = (isVisited) => {
    return () => this.setState({isVisited})
  }
  onChange = checked => {
    this.setState({ loading: !checked });
  }
  render() {
    const {isVisited} = this.state
    const { loading } = this.state;


    return (
      <div className='dashboard'>
        <Card
          className="dashboard-card"
          title="商品の合計金額"
          extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
          style={{width: 350}}
          headStyle={{color: 'rgba(0,0,0,.45)'}}
        >
          <Statistic
            value={1128163}
            suffix="piece"
            style={{fontWeight: 'bolder'}}
          />
          <Statistic
            value={15}
            valueStyle={{fontSize: 15}}
            prefix={'毎週'}
            suffix="+"
          
          />
          <Statistic
            value={10} 
            valueStyle={{fontSize: 15}}
            prefix={'毎日'}
            suffix="-"
            UpCircleOutlined 
          />
       <Switch checked={!loading} onChange={this.onChange} />

           <Card style={{ width: 300, marginTop: 10,position:'right' }} loading={loading}>
             <Meta
               avatar={
                 <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
               }
               title="Detail"
               description="because of good weather, the sells up to $1000"
             />
           </Card> 

         <Card
           style={{ width: 300, marginTop: 16 }}
           actions={[
             <Icon type="setting" key="setting" />,
             <Icon type="edit" key="edit" />,
             <Icon type="ellipsis"  key="ellipsis" />,
           ]}
         >
         <Skeleton loading={loading} avatar active>
           <Meta
             avatar={
               <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
             }
             title="Card title"
             description="This is the description"
           />
         </Skeleton>
       </Card>
             
               </Card>

        <Line/>

        <Card
          className="dashboard-content"
          title={<div className="dashboard-menu">
            <span className={isVisited ? "dashboard-menu-active dashboard-menu-visited" : 'dashboard-menu-visited'}
                  onClick={this.handleChange(true)}>訪問量</span>
            <span className={isVisited ? "" : 'dashboard-menu-active'} onClick={this.handleChange(false)}>売上高</span>
          </div>}
           extra={<RangePicker 
            defaultValue={[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]}
            format={dateFormat}
          />}
        
        >
          <Card
            className="dashboard-table-left"
            title={isVisited ? '訪問量' : '販売動向'}
            bodyStyle={{padding: 0, height: 275}}
            // extra={<Icon type="reload"/>}
          >
            <Bar/>
          </Card>

          <Card title='仕事'  className="dashboard-table-right">
         
            <Timeline>
              <Timeline.Item color="green">新しいバージョンの反復</Timeline.Item>
              <Timeline.Item color="green">デザインの最初のバージョンを完成させる</Timeline.Item>
              <Timeline.Item color="red">
                <p>共同デバッグインターフェイス</p>
                <p>機能の受け入れ</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>ログイン機能設計</p>
                <p>ASD</p>
                <p>ページレイアウト</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}