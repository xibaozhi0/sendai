import React, {Component} from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
円グラフルーティングコンポーネント
 */
export default class Pie extends Component {

  getOption = () => {
    return {
      title : {
        text: 'the source of users visiting',
        subtext: '純粋なフィクション',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ["ダイレクアクセス","メールマーケティング", "アフィリエイト広告","動画広告","検索エンジン"]
      },
      series : [
        {
          name: 'the source of visiting',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'ダイレクアクセス'},
            {value:310, name:'メールマーケティング'},
            {value:234, name:'アフィリエイト広告'},
            {value:135, name:'動画広告'},
            {value:1548, name:'検索エンジン'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  }

  getOption2 = () => {
    return {
      backgroundColor: '#2c343c',

      title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'the source of visiting',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'ダイレクトアクセス'},
            {value:310, name:'メールマーケティング'},
            {value:274, name:'アフィリエイト広告'},
            {value:235, name:'動画広告'},
            {value:400, name:'検索エンジン'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Card title='円グラフ1'>
          <ReactEcharts option={this.getOption()} style={{height: 300}}/>
        </Card>
        <Card title='円グラフ2'>
          <ReactEcharts option={this.getOption2()} style={{height: 300}}/>
        </Card>
      </div>
    )
  }
}
