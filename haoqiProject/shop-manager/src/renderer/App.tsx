import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { AnsiUp } from 'ansi_up'
const ansi_up = new AnsiUp();
import {
  List,
  Button,
  Card,
  Modal,
  Input,
  message,
  notification,
  Avatar,
  Flex,
  Divider,
  Space,
  Rate,
  Switch,
  Tag, Popover
} from 'antd';
import './App.css';

import {
  DeleteTwoTone,
  CheckOutlined,
  CloseOutlined,
  EditTwoTone,
} from '@ant-design/icons';

import { Shop } from '../main/main';
import { getDate } from '../utils/date';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackgroundTask, setIsBackgroundTask] = useState(
    localStorage.getItem('isBackgroundTask') === 'true',
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [notifiyApi, contextHolder1] = notification.useNotification();
  const [shopName, setShopName] = useState('');
  const shopList = useRef<Shop[]>(
    JSON.parse(localStorage.getItem('shopList') || '""') || [],
  );
  const [isStart, setIsStart] = useState(false);
  const [, updateState] = useState(Math.random());
  const forceUpdate = React.useCallback(() => updateState(Math.random()), []);
  const [filePath, setFilePath] = useState(
    localStorage.getItem('filePath') || '',
  );
  const logs = useRef([])

  const setLogs = (list: any) => {
    logs.current = list;
    forceUpdate();
  }

  const setShopList = (list: Shop[]) => {
    shopList.current = list;
    localStorage.setItem('shopList', JSON.stringify(list));
    forceUpdate();
  };

  const handleAddShop = (): void => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const rmal = window.electron.ipcRenderer.on('appium-log', (log)=>{
      logs.current.push(log)
      if (logs.current.length > 500) logs.current.shift()
      setLogs(logs.current)
    })

   const  rmmr = window.electron.ipcRenderer.on('main-err', (e) => {
      notifiyApi.error({
        message: '导出失败',
        description: e.toString(),
        duration: 60,
      });
      console.error(e);
    });

    const rmsm = window.electron.ipcRenderer.on('show-message',(config:any)=>{
      notification.open({
        type:config.type,
        message: config.message,
        description:config.description,
      })
    })

    const needLogin = (name) => {
      const utterance = new SpeechSynthesisUtterance(
        `${name}登录失效，请重新登录`,
      );
      window.speechSynthesis.speak(utterance);
    };

    const rmnl = window.electron.ipcRenderer.on('need-login', needLogin);
    const updateShopLoginExpire = ({ name, expire }: any) => {
      const newShopList = shopList.current.map((item: any) => {
        if (item.name === name) {
          return {
            ...item,
            expire,
          };
        }
        return item;
      });
      console.log('newShopList', newShopList, shopList);
      setShopList(newShopList);
    };
    const rmusle = window.electron.ipcRenderer.on(
      'update-shop-login-expire',
      updateShopLoginExpire,
    );

    const exportExcel = ({ path, isAuto, isSuccess }: any) => {
      if (!isSuccess) {
        notifiyApi.error({
          message: '导出失败',
          description: `没有数据你导出锤子啊`,
        });
        return;
      }
      if (isAuto) setIsStart(false);
      notifiyApi.success({
        message: '导出成功',
        description: `文件保存在: ${path}`,
        duration: 10,
      });
    };

    const rmee = window.electron.ipcRenderer.on('export-excel', exportExcel);

    const st = window.electron.ipcRenderer.on('stop-task', () => {
      setIsStart(false);
    });
    const spc = window.electron.ipcRenderer.on(
      'save-path-changed',
      (fPath: string) => {
        notifiyApi.success({
          message: '保存路径已设置',
          description: `文件将保存在: ${fPath}`,
          duration: 10,
        });
        localStorage.setItem('filePath', fPath);
        setFilePath(fPath);
      },
    );

    const updateShopRealInfo = (arg: any) => {
      const newShopList = shopList.current.map((item: any) => {
        if (item.name === arg.name) {
          return {
            ...item,
            realInfo: arg.realInfo,
            updateTime: getDate(),
          };
        }
        return item;
      });
      setShopList(newShopList);
      console.log('updateShopRealInfo', arg);
    };
    const rmri = window.electron.ipcRenderer.on(
      'update-shop-real-info',
      updateShopRealInfo,
    );

    return () => {
      rmal();
      rmmr();
      rmsm();
      rmnl();
      rmusle();
      rmee();
      rmri();
      st();
      spc();
    };
  }, []);

  const openWindow = (id: string) => {
    window.electron.ipcRenderer.once('open-window', (arg) => {
      // eslint-disable-next-line no-console
      console.log(arg);
    });
    window.electron.ipcRenderer.sendMessage('open-window', {
      shop: {
        name: id,
      },
    });
  };

  const handleOk = () => {
    if (!shopName) {
      messageApi.error('店铺名不能为空');
      return;
    }

    if (shopList.current.some((item: any) => item.name === shopName)) {
      messageApi.error('店铺名已存在');
      return;
    }

    // setShopList([
    //   ...shopList,
    //   {
    //     name: shopName,
    //   },
    // ]);
    const newShopList = [
      ...shopList.current,
      {
        name: shopName,
        person: '',
        assistant: '',
        realInfo: {},
        updateTime: getDate(),
      },
    ];
    setShopList(newShopList);
    openWindow(shopName);
    setIsModalOpen(false);
  };

  const deleteShop = (name: string) => {
    if (isStart) {
      messageApi.error('请先停止统计');
      return;
    }
    window.electron.ipcRenderer.once('delete-session', (arg) => {
      // eslint-disable-next-line no-console
      if (arg === 'success') {
        // setShopList(shopList.filter((item: any) => item.name !== name));
        const newShopList = shopList.current.filter(
          (item: any) => item.name !== name,
        );
        setShopList(newShopList);
        messageApi.success('删除成功');
      } else {
        messageApi.error('删除失败');
      }
    });
    window.electron.ipcRenderer.sendMessage('delete-session', {
      shopName: name,
    });
  };

  const handleCancel = () => {
    setShopName('');
    setIsModalOpen(false);
  };

  const handleShopNameChange = (e: any) => {
    setShopName(e.target.value);
  };

  const formateDate = (date: number) => {
    return new Date(date).toLocaleString();
  };

  const handleStartTask = () => {
    window.electron.ipcRenderer.once('start-task', () => {
      setIsStart(true);
    });
    window.electron.ipcRenderer.sendMessage('start-task', {
      shopList: shopList.current,
      isBackgroundTask,
      savePath: filePath,
    });
  };

  const handleStopTask = () => {
    window.electron.ipcRenderer.sendMessage('stop-task');
  };

  const handleExportExcel = () => {
    window.electron.ipcRenderer.sendMessage('export-excel', filePath);
  };

  const handleConnectPhone = () =>{
    window.electron.ipcRenderer.sendMessage('connect-phone');
  }

  const handleImportShopList = () => {
    window.electron.ipcRenderer.once('import-shop-list', (arg: any) => {
      // eslint-disable-next-line no-console
      console.log(arg);
      if (arg) {
        const newShopList = [...shopList.current, ...arg];
        setShopList(arg);
      }
    });
    window.electron.ipcRenderer.sendMessage('import-shop-list');
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '24px',
          margin: '20px 0',
        }}
      >
        店铺统计助手
      </h1>
      <Card>
        <Flex vertical gap={'large'}>
          <Flex
            style={{ backgroundColor: '#fff' }}
            justify="space-evenly"
            align="center"
          >
            <Button
              type="primary"
              loading={isStart}
              onClick={() => handleStartTask()}
            >
              开始统计
            </Button>
            <Button
              type="primary"
              disabled={!isStart}
              onClick={() => handleStopTask()}
            >
              停止统计
            </Button>
            <Button type="primary" onClick={() => handleExportExcel()}>
              导出Excel
            </Button>
            <Popover content={
              <div style={{
                maxWidth: '800px',
                maxHeight: '400px',
                overflowY: 'auto',
              }} >
                {logs.current.map((item, index) => (
                  <div style={{
                    borderBottom: '1px dashed #ccc',
                  }} key={index} dangerouslySetInnerHTML={{
                    __html:ansi_up.ansi_to_html(item)
                  }}>
                  </div>
                ))}
              </div>
            }
                     title="连接日志"
                     placement="bottom"
                     trigger="hover">
              <Button type="primary" onClick={() => handleConnectPhone()}>
                连接手机
              </Button>
            </Popover>

            <Space>
              <div>后台静默统计</div>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={isBackgroundTask}
                disabled={isStart}
                onChange={(checked) => {
                  setIsBackgroundTask(checked);
                  localStorage.setItem('isBackgroundTask', checked.toString());
                }}
              />
            </Space>
            {/* <Button type="primary">Primary</Button> */}
          </Flex>
          <Flex align="center" gap="small">
            <div>数据保存路径:</div>
            <Button
              type="link"
              onClick={() => {
                if (isStart) {
                  messageApi.error('请先停止统计');
                } else if (filePath) {
                  window.electron.ipcRenderer.sendMessage(
                    'open-file',
                    filePath,
                  );
                } else {
                  window.electron.ipcRenderer.sendMessage('open-save-dialog');
                }
              }}
            >
              {filePath || '暂未设置保存路径'}
            </Button>
            <EditTwoTone
              className={'delete'}
              onClick={() => {
                if (isStart) {
                  messageApi.error('请先停止统计');
                } else {
                  window.electron.ipcRenderer.sendMessage('open-save-dialog');
                }
              }}
            />
          </Flex>
        </Flex>
        <Divider>店铺列表({shopList?.current?.length})</Divider>
        <List
          // bordered={true}
          className="demo-loadmore-list"
          itemLayout="horizontal"
          locale={{ emptyText: '暂无店铺' }}
          loadMore={
            <div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              <Space size="large">
                <Button onClick={() => handleImportShopList()}>
                  从Excel批量导入
                </Button>
                <Button onClick={() => handleAddShop()}>新增店铺</Button>
              </Space>
            </div>
          }
          dataSource={shopList.current}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events
                <Button
                  key="list-loadmore-edit"
                  onClick={() => {
                    openWindow(item.name);
                  }}
                  disabled={isStart}
                  type="link"
                >
                  打开窗口
                </Button>,
                <DeleteTwoTone
                  key="list-loadmore-more"
                  className="delete"
                  disabled={isStart}
                  onClick={() => deleteShop(item.name)}
                  twoToneColor="#eb2f96"
                />,
              ]}
            >
              <List.Item.Meta
                title={<span>{item.name}</span>}
                avatar={
                  <Avatar style={{ backgroundColor: '#87d068' }} size={60}>
                    {item.name}
                  </Avatar>
                }
                description={`预计登录失效时间：${!item.expire || item.expire < Date.now() ? '已失效' : formateDate(item.expire)} `}
              />
              <Space size="large">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    fontSize: '12px',
                    color: '#666',
                  }}
                >
                  数据更新时间:{item.updateTime}
                </div>
                <Flex gap="middle" vertical>
                  <div>{item.realInfo?.shopName}</div>
                  <Space>
                    <Rate
                      disabled
                      allowHalf
                      value={parseFloat(item.realInfo?.scoreRankRateGrade) || 0}
                    />
                  </Space>
                </Flex>
              </Space>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="新增店铺"
        open={isModalOpen}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="请输入账号名(确保唯一即可, 一般来说一个账号创建一个)"
          value={shopName}
          onChange={handleShopNameChange}
        />
      </Modal>
      {contextHolder}
      {contextHolder1}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
