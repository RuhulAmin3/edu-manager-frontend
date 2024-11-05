// External Imports
import { Col, Skeleton } from "antd";
import { Fragment } from "react";

// Internal Imports
import student from "../../../assets/student.svg";
import teacher from "../../../assets/teacher.svg";
import guardian from "../../../assets/guardian.svg";
import subject from "../../../assets/subject.svg";
import DefaultCard from "../../../components/ui/default-card";
import AdminTopCard from "./admin-top-card";
import { EDU_MANAGER_TOKENS } from "../../../styles/token";
import { useGetAllStudentsQuery } from "../../student/student.api";
import { useGetAllTeachersQuery } from "../../teacher/teacher.api";
import { useGetAllGuardianQuery } from "../../guardian/guardian.api";
import { useGetAllSubjectsQuery } from "../../subject/subject.api";

const AdminRowCards = () => {
  const { data: studentData, isLoading: isLoadingStudents } =
    useGetAllStudentsQuery({ admissionYear: 2024 });
  const { data: teacherData, isLoading: isLoadingTeachers } =
    useGetAllTeachersQuery({});
  const { data: guardianData, isLoading: isLoadingGuardians } =
    useGetAllGuardianQuery({});
  const { data: subjectsData, isLoading: isLoadingSubjects } =
    useGetAllSubjectsQuery({});

  // Combine loading states
  const isLoading =
    isLoadingStudents ||
    isLoadingTeachers ||
    isLoadingGuardians ||
    isLoadingSubjects;
  if (isLoading) {
    return (
      <>
        <Col xs={24} sm={12} xl={6}>
          <Skeleton active />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Skeleton active />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Skeleton active />
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Skeleton active />
        </Col>
      </>
    );
  }
  return (
    <Fragment>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            total={studentData?.meta?.totalDoc}
            active={studentData?.meta?.totalDoc}
            icon={student}
            title="Total Students"
            color={EDU_MANAGER_TOKENS.colors["edu-danger-bg-opacity"]}
          />
        </DefaultCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            total={teacherData?.meta?.totalDoc}
            active={teacherData?.meta?.totalDoc}
            icon={teacher}
            title="Total Teachers"
            color={EDU_MANAGER_TOKENS.colors["edu-success-bg-opacity"]}
          />
        </DefaultCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            total={guardianData?.meta?.totalDoc}
            active={guardianData?.meta?.totalDoc}
            icon={guardian}
            title="Total Guardians"
          />
        </DefaultCard>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <DefaultCard>
          <AdminTopCard
            total={subjectsData?.meta?.totalDoc}
            active={subjectsData?.meta?.totalDoc}
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
