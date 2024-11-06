import { Col, Row } from "antd";
import AdminRowCards from "../../features/admin/components/admin-row-cards";
import ExamQuantityChart from "../../features/admin/components/exam-quantity-chart";
import DefaultCard from "../../components/ui/default-card";

const AdminSummaryPage = () => {
  return (
    <>
      {/* <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
        <AdminRowCards />
      </Row> */}

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <DefaultCard>
            <ExamQuantityChart />
          </DefaultCard>
        </Col>
        <Col xs={24} lg={12}></Col>
      </Row>
    </>
  );
};

export default AdminSummaryPage;
