import { Layout, Row, Col, Card } from 'antd';
import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';
import CandlestickChart from './components/Test/CandlestickChart';
import VolumeChart from './components/Test/VolumeChart';
import Index from './page/TimeChart/index';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ padding: '24px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card
                bordered={true}
                style={{
                  width: 1220,
                }}>
                {/* <CryptoPriceChart /> */}
                {/* <LivePriceChart /> */}
                <Index />
              </Card>
            </Col>
            <Col span={4}>
              <Card bordered={true}
                style={{
                  width: 800,
                }}>
                <CandlestickChart />
                {/* <LiveCandlestickChart /> */}
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={true}>
                <VolumeChart />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
