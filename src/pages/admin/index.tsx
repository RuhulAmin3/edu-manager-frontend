import { Row } from "antd";
import AdminRowCards from "../../features/admin/components/admin-row-cards";

const AdminSummaryPage = () => {
  return (
    <Row gutter={[16, 16]}>
      <AdminRowCards />
    </Row>
  );
};

export default AdminSummaryPage;
