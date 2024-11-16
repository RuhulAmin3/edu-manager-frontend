/**
 * External Dependency
 */ 
import { Col, Row } from "antd";

/**
 * Internal Dependency
 */
import ExamQuantityChart from "../../features/admin/components/exam-quantity-chart";
import AdminRowCards from "../../features/admin/components/admin-row-cards";
import DefaultCard from "../../components/ui/default-card";
import StudentAnalyticsChart from "../../features/admin/components/student-analytics-chart";

const AdminSummaryPage = () => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
        <AdminRowCards />
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <DefaultCard>
            <ExamQuantityChart />
          </DefaultCard>
        </Col>
        <Col xs={24} lg={12}>
          <DefaultCard>
            <StudentAnalyticsChart />
          </DefaultCard>
        </Col>
      </Row>
    </>
  );
};

export default AdminSummaryPage;
