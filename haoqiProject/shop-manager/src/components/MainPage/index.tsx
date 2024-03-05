import React from 'react';
import { List, Button, Card } from 'antd';

export default class MainPage extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      list: []
    };
  }

  handleAddShop = ():void=>{

  }

  render() {
    return (
      <div>
        <Card>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            loadMore={<div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              <Button onClick={this.handleAddShop}>新增店铺</Button>
            </div>}
            dataSource={[]}
            renderItem={(item) => (
              <List.Item
                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
              >
              </List.Item>
            )}
          />
        </Card>

      </div>
    );
  }
}