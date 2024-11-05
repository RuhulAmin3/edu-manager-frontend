// External Imports
import { Col } from "antd";
import { Fragment } from "react";

// Internal Imports
import student from "../../../assets/student.svg";
import teacher from "../../../assets/teacher.svg";
import guardian from "../../../assets/guardian.svg";
import subject from "../../../assets/subject.svg";
import DefaultCard from "../../../components/ui/default-card";
import AdminTopCard from "./admin-top-card";
import { EDU_MANAGER_TOKENS } from "../../../styles/token";

const AdminRowCards = () => {
  return (
    <Fragment>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            icon={student}
            title="Total Students"
            color={EDU_MANAGER_TOKENS.colors["edu-danger-bg-opacity"]}
          />
        </DefaultCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            icon={teacher}
            title="Total Teachers"
            color={EDU_MANAGER_TOKENS.colors["edu-success-bg-opacity"]}
          />
        </DefaultCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard icon={guardian} title="Total Guardians" />
        </DefaultCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            icon={subject}
            title="Total Subjects"
            color={EDU_MANAGER_TOKENS.colors["edu-warning-bg-opacity"]}
          />
        </DefaultCard>
      </Col>
    </Fragment>
  );
};

export default AdminRowCards;
