import { Layout, Row, Col, Card } from 'antd';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import CryptoPriceChart from './components/PriceLineChart'
import CandlestickChart from './components/CandlestickChart';
import VolumeChart from './components/VolumeChart';
import LivePriceChart from './components/LivePriceChart';
import LiveCandlestickChart from './components/LiveCandlestickChart';
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
                  width: 800,
                }}>
                {/* <CryptoPriceChart /> */}
                <LivePriceChart />
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
