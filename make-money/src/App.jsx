import {Component} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {generateShuangSeQiu,generateKuaiLe8, getWinningLevel} from './utils/generateNumber.js';
import './App.scss';

const caipiaoMap = {
  'ssq': 11,
  'kl8': 89,
};


class App extends Component {
  constructor(props) {
    super(props);
    const today = dayjs().format('YYYY-MM-DD');
    const dataBaseStr = localStorage.getItem('dataBase');
    let dataBase = {};
    if (dataBaseStr) {
      dataBase = JSON.parse(dataBaseStr);
    }
    if (!dataBase.history) {
      dataBase.history = {};
    }
    if (!dataBase.history[today]) {
      dataBase.history[today] = {
        'ssq': {
          buy: [],
          winning: [],
          level: 0
        },
        'kl8': {
          buy: [],
          winning: [],
          level: 0
        }
      };
    }



    this.state = {
      today,
      dataBase
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // fetch('https://api.tanshuapi.com/api/caipiao/v1/query?key=045c8bff6b502c38a4a10c311044e4b8&caipiaoid=11',{
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //
    // })
    // cors错误

    // axios.get('https://api.tanshuapi.com/api/caipiao/v1/query', {
    //   params: {
    //     key: '045c8bff6b502c38a4a10c311044e4b8',
    //     caipiaoid: 11
    //   }
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });


  }

  // http://api.tanshuapi.com/api/caipiao/v1/query

  // key: 045c8bff6b502c38a4a10c311044e4b8
  //
//     {
//       "caipiaoid": 1,
//       "name": "福利彩票",
//       "parentid": 0
//     },
//     -{
//     "caipiaoid": 2,
//       "name": "体育彩票",
//       "parentid": 0
//   },
//   -{
//     "caipiaoid": 3,
//     "name": "足球彩票",
//     "parentid": 0
//   },
//     -{
//       "caipiaoid": 5,
//       "name": "高频",
//       "parentid": 0
//     },
//     -{
//       "caipiaoid": 6,
//       "name": "地方彩",
//       "parentid": 0
//     },
//     -{
//       "caipiaoid": 11,
//       "name": "双色球",
//       "parentid": 1
//     },
//     -{
//       "caipiaoid": 12,
//       "name": "福彩3D",
//       "parentid": 1
//     },
//     -{
//       "caipiaoid": 13,
//       "name": "七乐彩",
//       "parentid": 1
//     },
//     -{
//       "caipiaoid": 14,
//       "name": "大乐透",
//       "parentid": 2
//     },
//     -{
//       "caipiaoid": 15,
//       "name": "七星彩",
//       "parentid": 2
//     },
//     -{
//       "caipiaoid": 16,
//       "name": "排列三",
//       "parentid": 2
//     },
//     -{
//       "caipiaoid": 17,
//       "name": "排列五",
//       "parentid": 2
//     },
//     -{
//       "caipiaoid": 23,
//       "name": "华东福彩15选5",
//       "parentid": 1
//     },
//     -{
//       "caipiaoid": 24,
//       "name": "东方6+1",
//       "parentid": 6
//     },
//     -{
//       "caipiaoid": 30,
//       "name": "体彩6+1",
//       "parentid": 6
//     },
//     -{
//       "caipiaoid": 89,
//       "name": "快乐8",
//       "parentid": 1
//     }
// ]

  generateNumbers = (caipiao) => {
    const {dataBase, today} = this.state;
    const numbers = caipiao === 'ssq' ? generateShuangSeQiu() : generateKuaiLe8();
    // const level = getWinningLevel(numbers, dataBase.history[today].ssq.winning, 1);
    dataBase.history[today][caipiao].buy.push(numbers);
    // dataBase.history[today].ssq.level = level;
    this.setState({
      dataBase
    });
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
  }


  render() {
    const {
      dataBase: {
        history
      }, today
    } = this.state;
    const todayData = history[today];

    return (
      <div className={'container'}>
        <div className={'history-wrap'}>
          <table>
            <thead>
            <tr>
              <th>日期</th>
              <th>双色球</th>
              <th>快乐8</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(history).map((date) => {
              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>
                    {history[date].ssq.buy.map((item, index) => {
                      return (
                        <div key={index} className={'number-container'}>
                          {
                            item.redBalls.map((redBall, index) => {
                              return (
                                <span key={index} className={'number red-ball'}>{redBall}</span>
                              );
                            }
                            )
                          }
                          <span className={'number blue-ball'}>{item.blueBall}</span>
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {history[date].kl8.buy.map((item, index) => {
                      return (
                        <div key={index} className={'number-container'}>
                          {
                            item.map((redBall, index) => {
                                return (
                                  <span key={index} className={'number red-ball'}>{redBall}</span>
                                );
                              }
                            )
                          }
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        <div className={'today'}>
          <h2>今日购买</h2>
          <div className={'ssq'}>
            <h3>双色球</h3>
            <div>
              {todayData.ssq.buy.map((item, index) => {
                return (
                  <div key={index} className={'number-container'}>
                    {
                      item.redBalls.map((redBall, index) => {
                        return (
                          <span key={index} className={'number red-ball'}>{redBall}</span>
                        );
                      }
                      )
                    }
                    <span className={'number blue-ball'}>{item.blueBall}</span>
                  </div>
                );
              })}
            </div>
            <button
              className={'btn'}
              onClick={()=>this.generateNumbers('ssq')}
            >
              生成
            </button>
          </div>
          <div className={'kl8'}>
            <h3>快乐8</h3>

            <div>
              {todayData.kl8.buy.map((item, index) => {
                return (
                  <div key={index} className={'number-container'}>
                    {
                      item.map((redBall, index) => {
                          return (
                            <span key={index} className={'number red-ball'}>{redBall}</span>
                          );
                        }
                      )
                    }
                  </div>
                );
              })}
            </div>

            <button
              className={'btn'}
              onClick={() => this.generateNumbers('kl8')}
            >
              生成
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
