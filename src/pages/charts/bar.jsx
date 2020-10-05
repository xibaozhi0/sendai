import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
chart router component
 */
export default class Bar extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20], // sale of array
    stores: [6, 10, 25, 20, 15, 10], // array of stock
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store-1)
        return pre
      }, []),
    }))
  }

  /*
  return config object of chart
   */
  getOption = (sales, stores) => {
    return {
      title: {
        text: 'ECharts sample of entering'
      },
      tooltip: {},
      legend: {
        data:['sale of amount', 'stock']
      },
      xAxis: {
        data: ["shirt","hat","clone","pan","shoe","socket"]
      },
      yAxis: {},
      series: [{
        name: 'sales of amount',
        type: 'bar',
        data: sales
      }, {
        name: 'stock',
        type: 'bar',
        data: stores
      }]
    }
  }

  render() {
    const {sales, stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>update</Button>
        </Card>

        <Card title='ヒストグラム'>
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>

      </div>
    )
  }
}