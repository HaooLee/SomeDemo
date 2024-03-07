import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
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
} from 'antd';
import './App.css';

import { DeleteTwoTone } from '@ant-design/icons';

import { Shop } from '../main/main';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [notifiyApi, contextHolder1] = notification.useNotification();
  const [shopName, setShopName] = useState('');
  const shopList = useRef<Shop[]>(
    JSON.parse(localStorage.getItem('shopList') || '""') || [],
  );
  const [isStart, setIsStart] = useState(false);

  const setShopList = (list: Shop[]) => {
    shopList.current = list;
    localStorage.setItem('shopList', JSON.stringify(list));
  };

  const handleAddShop = (): void => {
    setIsModalOpen(true);
  };

  useEffect(() => {
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

    const exportExcel = (arg: any) => {
      notifiyApi.success({
        message: '导出成功',
        description: `文件保存在: ${arg}`,
        duration: 10,
      });
    };

    const rmee = window.electron.ipcRenderer.on('export-excel', exportExcel);

    return () => {
      rmnl();
      rmusle();
      rmee();
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
    shopList.current.push({
      name: shopName,
    });
    setShopList(shopList.current);
    openWindow(shopName);
    setIsModalOpen(false);
  };

  const deleteShop = (name: string) => {
    window.electron.ipcRenderer.once('delete-session', (arg) => {
      console.log('dddddddddddddddddd');
      // eslint-disable-next-line no-console
      if (arg === 'success') {
        //setShopList(shopList.filter((item: any) => item.name !== name));
        const newShopList = shopList.current.filter(
          (item: any) => item.name !== name,
        );
        setShopList(newShopList);
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
    window.electron.ipcRenderer.sendMessage('start-task', shopList.current);
  };

  const handleStopTask = () => {
    window.electron.ipcRenderer.once('stop-task', () => {
      setIsStart(false);
    });
    window.electron.ipcRenderer.sendMessage('stop-task');
  };

  const handleExportExcel = () => {
    window.electron.ipcRenderer.sendMessage('export-excel');
  };

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
          {/* <Button type="primary">Primary</Button> */}
        </Flex>
        <Divider>店铺列表</Divider>
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
              <Button onClick={() => handleAddShop()}>新增店铺</Button>
            </div>
          }
          dataSource={shopList.current}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => {
                    openWindow(item.name);
                  }}
                >
                  打开窗口
                </a>,
                <DeleteTwoTone
                  className="delete"
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
              <div>{item.name}</div>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="店铺登录"
        open={isModalOpen}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="请输入店铺名(确保唯一即可)"
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
