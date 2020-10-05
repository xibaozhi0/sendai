
import React, { Component } from 'react'
import moment from 'moment';
import { Calendar, Badge,Alert, } from 'antd';

// リマインダーイベントデータの収集
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'success', content: 'お誕生日！' },
      ];
      break;
      case 20:
      listData = [
        { type: 'warning', content: 'クロックイン！' },
      ];
      break;
    default:
  }
  return listData || [];
}

// リマインダーイベントをレンダリング
function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return '追加コンテンツ';
  }
}

//カスタムレンダリングの月のセル。返されたコンテンツはセルに追加されます
function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>追加コンテンツ</span>
    </div>
  ) : null;
}
export default class  extends Component {
  state = {
    value: moment(),
    selectedValue: moment(),
  };
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };
  componentDidMount(){
    console.log('サブアセンブリー')
  }
  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
      <Alert
        message={`${selectedValue && selectedValue.format('YYYY-MM-DD')}:ご選択された `}
      />
      <Calendar value={value} onSelect={this.onSelect} 
      onPanelChange={this.onPanelChange} 
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender} />
    </div>
    );
  }
}

