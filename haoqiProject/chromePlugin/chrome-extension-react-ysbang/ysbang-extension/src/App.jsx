import { Component } from 'react'
import './App.scss'
import {Button, Tabs, InputNumber, Space, Input, Tag, Table, Form} from 'antd';
const { TextArea } = Input;
import {
  getEx,
  customFetch,
  TaskMgr,
  getNowFormatDate,
  playAudio,
  speak,
  cancelAudio,
  downloadExcel,
} from './utils/utils';
import { AES } from 'crypto-js'
import JSEncrypt from 'jsencrypt'

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0n/X5YegvOwG2VFyPkU5
fHf+GQlOUp8gNE/gqhlNQS8stC0tvfcI/tsBXL20woSOkygaKV5ivWB+qd8R2P+5
1JgV8anl7Uj2y++RH+VmEawmpzsPv/pkr09qADrtpJKgoz82mV3rSqPIoa88aqjb
31up/BLqTI+SiZp6tP8BPpiKGtiWLX4r7BXGX6luOpz8jwBpCusIISzrcg8zNV2o
M4qXnweThh6w71o7d3mORa61CO0JvMopbEalZ0jrUSgDkC/wdYjpiUZtk9sGDVeM
cDJgedt1KG5eUBGyoNPiZWdMaWEc+Z9pjdgCLIeDsboDDTDC4Tu0qZCLbVHXgQ3Y
fwIDAQAB
-----END PUBLIC KEY-----
`

const encrypt = new JSEncrypt()
encrypt.setPublicKey(publicKey)

const taskMgr = new TaskMgr()

class App extends Component {
  constructor(props) {
    super(props)
    const searchResidueGoodsStr = localStorage.getItem('searchResidueGoodsStr') || ''
    const searchHasGoodsStr = localStorage.getItem('searchHasGoodsStr') || ''
    this.state = {
      appVisible: false,
      tabIndex: '1',
      downloadLogs:[],
      downloadPageNum: 200,
      dataResult: [],
      continueDownload: false,
      searchDelay: localStorage.getItem('searchDelay') || 2,
      searchResidueGoodsIng: false,
      searchResidueGoodsStr,
      searchResidueGoodsArr: searchResidueGoodsStr.split('\n').filter(i => i),
      searchResidueResult: [],
      lastSearchResidueGoodsIndex: localStorage.getItem('lastSearchResidueGoodsIndex') || 0,

      searchHasGoodsIng: false,
      searchHasGoodsStr,
      searchHasGoodsArr: searchHasGoodsStr.split('\n').filter(i => i),
      searchHasGoodsResult: [],
      lastSearchHasGoodsIndex: localStorage.getItem('lastSearchHasGoodsIndex') || 0,

      username: '',
      password: '',
      isLogin: false
    }
  }

  componentDidMount() {
    let lastResidueTasks = localStorage.getItem('lastResidueTasks')
    if (lastResidueTasks) {
      this.setState({
        continueDownload: true,
      })
    }
  }

  continueDownload () {
    const { downloadLogs } = this.state
    let lastResidueTasks = localStorage.getItem('lastResidueTasks')
    if (lastResidueTasks) {
      lastResidueTasks = JSON.parse(lastResidueTasks)
      localStorage.removeItem('lastResidueTasks')
      lastResidueTasks.forEach((item) => {
        taskMgr.addTask(item, () => {
          return this.getTableDataTask(item.classify_id, item.page, item.levels)
        })
      })
      downloadLogs.unshift(`继续未完成的下载任务`)
      this.startExecuteTask()
    } else {
      downloadLogs.unshift(`没有需要继续下载的任务`)
    }
    this.setState({
      downloadLogs,
    })
  }

  download() {
    // window.$jd_page_monitor_config  /用户信息
    customFetch('https://dian.ysbang.cn/wholesale-drug/sales/getClassifyWholesaleList/v4270', {
      "ex": getEx('home'),
    }).then((res) => {
      if (res && res.code === '40001') {
        this.createTasks(res.data)
        // 开始执行下载任务
        this.startExecuteTask()
      } else {

      }
    })
  }

  startExecuteTask() {
    setTimeout(() => {
      taskMgr.executeTask(1, null, (res,taskNum, doneNum, useTime,) => {
        const { downloadLogs } = this.state
        let { dataResult } = this.state
        dataResult = dataResult.concat(res)
        downloadLogs.unshift(`[${getNowFormatDate()}]总下载量:${taskNum} 已完成:${doneNum} 用时:${useTime}`)
        this.setState({
          downloadLogs,
          dataResult
        })
      },()=>{
        const { dataResult } = this.state
        downloadExcel(dataResult)
      },(attach, taskList)=>{
        const { dataResult } = this.state
        localStorage.setItem('lastResidueTasks', JSON.stringify([attach, ...taskList.map(i => i.attch)]))
        downloadExcel(dataResult);
        playAudio('有人吗？ 过一下人工验证码呀')
        window.onmousemove = function () {
          location.reload()
          window.onmousemove = null
        }
      })
    }, 500)
  }

  createTasks(arr, levels = []) {
    const { downloadPageNum } = this.state
    arr.forEach((item) => {
      if (item.nextlevel) {
        this.createTasks(item.nextlevel, [...levels, item.classify_name])
      } else {
        const totalPage = Math.min(Math.ceil(item.count / 60), downloadPageNum)
        for (let i = 1; i <= totalPage; i++) {
          taskMgr.addTask({
            classify_id: item.classify_id,
            page: i,
            levels: [...levels, item.classify_name]
          }, () => {
            return this.getTableDataTask(item.classify_id,i, [...levels, item.classify_name])
          })
        }
      }
    })
  }

  getTableDataTask(classify_id, page, levels) {
    let params = {
      "trafficType": 1,
      "page": page,
      "ex": getEx('indexContent'),
      "pagesize": "60",
      "classify_id": classify_id,
      "searchkey": "",
      "operationtype": 1,
      "provider_filter": "",
      "activityTypes": [],
      "qualifiedLoanee": 0,
      "factoryNames": "",
      "tcmGradeNames": [],
      "tcmExeStandardIds": [],
      "specs": "",
      "drugId": -1,
      "tagId": "",
      "showRecentlyPurchasedFlag": true,
      "onlyShowRecentlyPurchased": false,
      "onlySimpleLoan": 0,
      "sn": "",
      "deliverFloor": 0,
      "purchaseLimitFloor": 0,
      "validMonthFloor": 0,
    }

    return new Promise((resolve, reject) => {
      let { downloadLogs,dataResult } = this.state
      downloadLogs.unshift(`开始下载:${levels.join('/')} 第${page}页数据`)
      customFetch('https://dian.ysbang.cn/wholesale-drug/sales/getWholesaleList/v4270', params)
        .then((res) => {
          if (res && res.code === '40001' && res.data) {
            const _res = JSON.parse(JSON.stringify(res.data.wholesales))
            _res.forEach(i => {
              let keys = Object.keys(levels)
              keys.forEach(l => {
                i[`level-${l}`] = levels[l]
              })
            })
            // console.log(_res)
            resolve(_res);
          } else {
            reject(res)
            console.log("请求遇到了异常", res)
          }
        }).catch((e) => {
        reject(e)
        console.log('下载失败。 原因:网络问题或频率太高被拒绝', e)
      })
    });
  }

  getTableData(searchKey) {
    const params = {
      "ex": getEx('indexContent'),
      "trafficType": 1,
      "page": 1,
      "pagesize": "60",
      "classify_id": "",
      "searchkey": searchKey,
      "operationtype": 1,
      "provider_filter": "",
      "activityTypes": [],
      "qualifiedLoanee": 0,
      "factoryNames": "",
      "tcmGradeNames": [],
      "tcmExeStandardIds": [],
      "specs": "",
      "drugId": -1,
      "tagId": "",
      "showRecentlyPurchasedFlag": true,
      "onlyShowRecentlyPurchased": false,
      "onlySimpleLoan": 0,
      "sn": "",
      "deliverFloor": 0,
      "purchaseLimitFloor": 0,
      "validMonthFloor": 0,
    }
    return new Promise((resolve, reject) => {
      customFetch('https://dian.ysbang.cn/wholesale-drug/sales/getWholesaleList/v4270', params)
        .then((res) => {
          if (res && res.code === '40001' && res.data) {
            const _res = JSON.parse(JSON.stringify(res.data))
            resolve(_res);
          } else {
            reject(res)
            console.log("请求遇到了异常", res)
          }
        }).catch((e) => {
        reject(e)
        console.log('下载失败。 原因:网络问题或频率太高被拒绝', e)
      })
    });
  }

  handleTabChange = (key) => {
    this.setState({
      tabIndex: key,
    })
  }

  toggleAppVisible = () => {
    const { appVisible } = this.state
    this.setState({
      appVisible: !appVisible,
    })
  }

  handleDownloadPageNumChange = (e) => {
    this.setState({
      downloadPageNum: e,
    })
  }

  handleSearchDelayChange = (e) => {
    localStorage.setItem('searchDelay', e)
    this.setState({
      searchDelay: e,
    })
  }

  searchResidueGoodsChange = (e) => {
    this.setState({
      searchResidueGoodsStr: e.target.value,
      searchResidueGoodsArr: e.target.value.split('\n').filter(i => i),
      lastSearchResidueGoodsIndex: 0,
    })
    localStorage.setItem('searchResidueGoodsStr', e.target.value)
    localStorage.setItem('lastSearchResidueGoodsIndex', 0)
  }

  searchHasGoodsChange = (e) => {
    this.setState({
      searchHasGoodsStr: e.target.value,
      searchHasGoodsArr: e.target.value.split('\n').filter(i => i),
      lastSearchHasGoodsIndex: 0,
    })
    localStorage.setItem('searchHasGoodsStr', e.target.value)
    localStorage.setItem('lastSearchHasGoodsIndex', 0)
  }

  handleSearchResidueGoods = () => {
    let { searchResidueGoodsArr, lastSearchResidueGoodsIndex, searchResidueResult, searchDelay } = this.state
    const searchKey = searchResidueGoodsArr[lastSearchResidueGoodsIndex]
    let newLastSearchResidueGoodsIndex = Number(lastSearchResidueGoodsIndex) + 1 >= searchResidueGoodsArr.length ? 0 : Number(lastSearchResidueGoodsIndex) + 1

    this.getTableData( searchKey )
      .then((res) => {
      localStorage.setItem('lastSearchResidueGoodsIndex', lastSearchResidueGoodsIndex)
      if (res && res.queryNum <= 10 && res.queryNum > 0){
        searchResidueResult.push({
          name: searchKey,
          queryNum: res.queryNum,
          queryTime: getNowFormatDate(),
        })
        this.setState({
          searchResidueResult,
        })
        speak(`${searchKey}  只剩下${res.queryNum}条了 抓紧采购！`)

      }else if (res && res.queryNum === 0){
        speak(`${searchKey}  已经没有货了！`)
        searchResidueResult.push({
          name: searchKey,
          queryNum: res.queryNum,
          queryTime: getNowFormatDate(),
        })
        this.setState({
          searchResidueResult,
        })
      }

    },()=>{
        speak(`请刷新页面 过一下验证码`)
        if (searchResidueResult.length > 0){
          downloadExcel(searchResidueResult,[
            {
              label: '药品名称',
              key: 'name',
            },
            {
              label: '上次查询余量',
              key: 'queryNum',
            },
            {
              label: '上次查询时间',
              key: 'queryTime',
            }
          ], getNowFormatDate() + '余量不足表')
        }
      this.handleStopSearchResidueGoods()
    })

    this.setState({
      searchResidueGoodsIng: true,
      lastSearchResidueGoodsIndex:newLastSearchResidueGoodsIndex,
    })

    this.searchResidueTimer = setTimeout(()=>{
      this.handleSearchResidueGoods()
    }, searchDelay * 1000 || 2000)
  }

  handleSearchHasGoods = () => {
    let { searchHasGoodsArr, lastSearchHasGoodsIndex, searchHasGoodsResult, searchDelay } = this.state
    const searchKey = searchHasGoodsArr[lastSearchHasGoodsIndex]
    let newLastSearchHasGoodsIndex = Number(lastSearchHasGoodsIndex) + 1 >= searchHasGoodsArr.length ? 0 : Number(lastSearchHasGoodsIndex) + 1

    this.getTableData( searchKey )
      .then((res) => {
      localStorage.setItem('lastSearchHasGoodsIndex', lastSearchHasGoodsIndex)
       if (res && res.queryNum > 0){
        speak(`${searchKey}  有货了 抓紧采购！`)
         searchHasGoodsResult.push({
          name: searchKey,
          queryNum: res.queryNum,
          queryTime: getNowFormatDate(),
        })
        this.setState({
          searchHasGoodsResult,
        })
      }
    },()=>{
        speak(`请刷新页面 过一下验证码`)
        if (searchHasGoodsResult.length > 0){
          downloadExcel(searchHasGoodsResult,[
            {
              label: '药品名称',
              key: 'name',
            },
            {
              label: '上次查询余量',
              key: 'queryNum',
            },
            {
              label: '上次查询有货时间',
              key: 'queryTime',
            }
          ], getNowFormatDate() + '有货药品表')
        }
      this.handleStopSearchHasGoods()
    })

    this.setState({
      searchHasGoodsIng: true,
      lastSearchHasGoodsIndex:newLastSearchHasGoodsIndex,
    })

    this.searchHasTimer = setTimeout(()=>{
      this.handleSearchHasGoods()
    }, searchDelay * 1000 || 2000)
  }

  handleStopSearchResidueGoods = () => {
    clearTimeout(this.searchResidueTimer)
    this.setState({
      searchResidueGoodsIng: false,
    })
  }

  handleStopSearchHasGoods = () => {
    clearTimeout(this.searchHasTimer)
    this.setState({
      searchHasGoodsIng: false,
    })
  }

  handleLogin = (values) => {
    const { username, password } = values

    // 生成一个随机的aes秘钥
    const aesKey = Math.random().toString(36)
    // 使用公钥加密aes秘钥
    const encryptAesKey = encrypt.encrypt(aesKey)

    const body = AES.encrypt(JSON.stringify(values), aesKey).toString();

    fetch('https://', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'F-Y-Key': encryptAesKey,
      },
      body,
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res && res.code === 0) {
        this.setState({
          isLogin: true
        })
      }
    })
  }

  render() {
    const {
      appVisible,
      tabIndex, downloadLogs, downloadPageNum,
      continueDownload,
      searchResidueGoodsStr,
      searchResidueGoodsArr,
      lastSearchResidueGoodsIndex,
      searchResidueGoodsIng,
      searchResidueResult,
      searchHasGoodsIng,
      searchHasGoodsStr,
      searchHasGoodsArr,
      searchHasGoodsResult,
      lastSearchHasGoodsIndex,
      searchDelay,
      isLogin,
      username,
      password,
    } = this.state

    const columns = [
      {
        title: '药品名称',
        dataIndex: 'name',
      },
      {
        title: '上次查询余量',
        dataIndex: 'queryNum',
        align:'center',
        render: (text, record) => {
          return <Tag color={text > 0 ? "orange" : "#cd201f"}>{text}</Tag>
        }
      },
      {
        title: '上次查询时间',
        dataIndex: 'queryTime',
      }
  ]
    const columns2 = [
      {
        title: '药品名称',
        dataIndex: 'name',
      },
      {
        title: '上次查询余量',
        dataIndex: 'queryNum',
        align:'center',
        render: (text, record) => {
          return <Tag color={"success"}>{text}</Tag>
        }
      },
      {
        title: '上次查询时间',
        dataIndex: 'queryTime',
      }
  ]
    const tabList = [
      {
        key: '0',
        label: '药品列表下载',
        children: (
          <div style={{padding:10}}>
            <Space wrap>
              <Button type={"primary"} onClick={()=>this.download()}>下载全部数据</Button>
              <InputNumber min={1} max={100000} addonAfter={'页'} style={{width:'100px'}} value={downloadPageNum} onChange={this.handleDownloadPageNumChange}/>
              <Button type={"primary"} disabled={!continueDownload} onClick={()=>this.continueDownload()}>继续下载上次未完成的数据</Button>
              <Button type={"primary"} onClick={()=>playAudio('来人啊!   过一下验证码啊')}>测试语音播报</Button>
              <Button type={"primary"} onClick={()=>cancelAudio()}>停止语音</Button>

            </Space>
            <div className={'download-log'}>
              {downloadLogs.map((item,idx) => {
                return <p key={idx}>{item}</p>
              })}
            </div>
          </div>
        ),
      },
      {
        key: '1',
        label: '药品余货查询',
        children: (
          <div style={{padding:10}}>
            <TextArea
              rows={5}
              value={searchResidueGoodsStr}
              onChange={(e) => this.searchResidueGoodsChange(e)}
              placeholder={'请输入需要监控是否缺货的药品名称 一行一个'}
              style={{marginBottom:20}} />
            <Space wrap style={{width:'100%'}}>
              <Button type={"primary"} disabled={searchResidueGoodsIng} onClick={this.handleSearchResidueGoods}>查询</Button>
              <Button type={"primary"} disabled={!searchResidueGoodsIng} onClick={this.handleStopSearchResidueGoods}>停止查询</Button>
              <InputNumber min={0.1} max={100000} addonAfter={'秒查一次'} style={{width:'150px'}} value={searchDelay} onChange={this.handleSearchDelayChange}/>
              <Tag color="#2db7f5">{searchResidueGoodsArr.length}条数据</Tag>
              <Tag color="#2db7f5">从第{Number(lastSearchResidueGoodsIndex)+1}条开始查询 即将查询：{searchResidueGoodsArr[lastSearchResidueGoodsIndex]}</Tag>
            </Space>
            <Table
              columns={columns}
              dataSource={[...searchResidueResult]}
              pagination={false}
              scroll={{ y: 300 }}
              rowKey={(record) => record.name}
              bordered></Table>
          </div>
        ),
      },
      {
        key: '2',
        label: '药品采购插件',
        children: (
          <div style={{padding:10}}>
            <TextArea
              rows={5}
              value={searchHasGoodsStr}
              onChange={(e) => this.searchHasGoodsChange(e)}
              placeholder={'请输入需要监控是否有货的药品名称 一行一个'}
              style={{marginBottom:20}} />
            <Space wrap style={{width:'100%'}}>
              <Button type={"primary"} disabled={searchHasGoodsIng} onClick={this.handleSearchHasGoods}>查询</Button>
              <Button type={"primary"} disabled={!searchHasGoodsIng} onClick={this.handleStopSearchHasGoods}>停止查询</Button>
              <InputNumber min={0.1} max={100000} addonAfter={'秒查一次'} style={{width:'150px'}} value={searchDelay} onChange={this.handleSearchDelayChange}/>
              <Tag color="#2db7f5">{searchHasGoodsArr.length}条数据</Tag>
              <Tag color="#2db7f5">从第{Number(lastSearchHasGoodsIndex)+1}条开始查询 即将查询：{searchHasGoodsArr[lastSearchHasGoodsIndex]}</Tag>
            </Space>
            <Table
              columns={columns2}
              dataSource={[...searchHasGoodsResult]}
              pagination={false}
              scroll={{ y: 300 }}
              rowKey={(record) => record.name + record.queryTime}
              bordered></Table>
          </div>
        )
      },
    ]


    return (
      <>
        <Button
          onClick={this.toggleAppVisible}
          type="primary"
          style={{
            position: 'fixed',
            right: '10px',
            top: '50px',
            zIndex: '9999',
        }}>{appVisible ? '隐藏' : '显示'}插件</Button>

        <div className={`App ${appVisible ? "" : "hide"}`}>
          {
            !isLogin && <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                marginTop: 200,
                maxWidth: 600,
              }}

              initialValues={{
                username,
                password,
              }}

              onFinish={this.handleLogin}
              onFinishFailed={()=>{}}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[
                  {
                    required: true,
                    message: '输入账号',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '输入密码',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          }
          {
            isLogin && <Tabs
            activeKey={tabIndex}
            onChange={this.handleTabChange}
            type="card"
            items={tabList}
          />
        }
        </div>
      </>
    )
  }
}

export default App
