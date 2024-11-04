import { Card, Col, Row } from "antd";

const AdminSummaryPage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Card title="Card 1" bordered={false}>
          Content
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card title="Card 2" bordered={false}>
          Content
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card title="Card 3" bordered={false}>
          Content
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card title="Card 4" bordered={false}>
          Content
        </Card>
      </Col>
    </Row>
  );
};

export default AdminSummaryPage;
