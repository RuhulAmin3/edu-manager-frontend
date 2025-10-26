/**
 * External Dependencies
 */
import { Row, Col, message } from "antd";
import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

/**
 * Internal Dependencies
 */

import { useGetStudentQuery } from "../student.api";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import { bloodGroupList } from "~/common/constants";
import EntityDetailLayout from "~/components/ui/entity-detail-layout";
import InfoCard from "~/components/ui/info-card";
import LoadingSpin from "~/components/ui/loading-spin";
import type { Student } from "../student.types";

const StudentDetailView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  
  const { data: response, isLoading, error, refetch } = useGetStudentQuery(id as string, {
    skip: !id
  });

  const studentData: Student = response?.data as Student;

  const handleEdit = () => {
    navigate(`/${role?.toLowerCase()}/update-student/${id}`);
  };

  const handleRefresh = () => {
    refetch();
    message.success("Data refreshed successfully");
  };

  const handleExportPdf = () => {
    message.info("PDF export functionality will be implemented");
  };

  const handleExportExcel = () => {
    message.info("Excel export functionality will be implemented");
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <LoadingSpin />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Failed to load student details</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Student not found</h3>
      </div>
    );
  }

  const fullName = `${studentData.name.firstName} ${studentData.name.middleName ? studentData.name.middleName + " " : ""
    }${studentData.name.lastName}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const personalInfoItems = [
    { label: "Full Name", value: fullName },
    { label: "Student ID", value: studentData.studentId },
    { label: "Gender", value: studentData.gender },
    { label: "Date of Birth", value: formatDate(studentData.dateOfBirth) },
    { label: "Blood Group", value: bloodGroupList[studentData.bloodGroup] || studentData.bloodGroup },
    { label: "Email", value: studentData.email || "N/A" },
    { label: "Contact Number", value: studentData.contactNo || "N/A" },
    { label: "Address", value: studentData.address },
  ];

  const academicInfoItems = [
    { label: "Class", value: studentData.className },
    { label: "Section", value: studentData.section },
    { label: "Roll Number", value: studentData.classRoll },
    { label: "School Name", value: studentData.schoolName },
    { label: "Admission Year", value: studentData.admissionYear },
    { label: "Status", value: studentData.status },
  ];

  const guardianInfoItems = [
    { label: "Father's Name", value: studentData.guardian.fatherName },
    { label: "Father's Occupation", value: studentData.guardian.fatherOccupation },
    { label: "Father's Contact", value: studentData.guardian.fatherContactNo },
    { label: "Mother's Name", value: studentData.guardian.motherName },
    { label: "Mother's Occupation", value: studentData.guardian.motherOccupation },
    { label: "Mother's Contact", value: studentData.guardian.motherContactNo },
  ];

  const additionalInfoItems = [
    { label: "Created At", value: formatDate(studentData.createdAt) },
    { label: "Last Updated", value: formatDate(studentData.updatedAt) },
    { label: "Description", value: studentData.shortDescription || "N/A", span: 2 },
  ];

  const breadcrumbItems = [
    {
      label: "Student List",
      link: `/${role?.toLowerCase()}/students`,
    },
    {
      label: "Student Details",
    },
  ];

  const headerProps = {
    breadcrumbItems,
    onEdit: handleEdit,
    onRefresh: handleRefresh,
    onExportPdf: handleExportPdf,
    onExportExcel: handleExportExcel,
    onPrint: handlePrint,
    editButtonText: "Edit Student",
  };

  const profileProps = {
    name: fullName,
    id: studentData.studentId,
    image: studentData.image,
    status: studentData.status,
    role: "Student",
    loading: isLoading,
  };

  return (
    <EntityDetailLayout
      headerProps={headerProps}
      profileProps={profileProps}
    >
      <Row gutter={[24, 24]}>
        {/* Personal Information */}
        <Col xs={24} xl={12}>
          <InfoCard
            title="Personal Information"
            icon={<UserOutlined />}
            items={personalInfoItems}
            columns={1}
            loading={isLoading}
          />
        </Col>

        {/* Academic Information */}
        <Col xs={24} xl={12}>
          <InfoCard
            title="Academic Information"
            icon={<BookOutlined />}
            items={academicInfoItems}
            columns={1}
            loading={isLoading}
          />
        </Col>

        {/* Guardian Information */}
        <Col xs={24}>
          <InfoCard
            title="Guardian Information"
            icon={<TeamOutlined />}
            items={guardianInfoItems}
            columns={2}
            loading={isLoading}
          />
        </Col>

        {/* Additional Information */}
        <Col xs={24}>
          <InfoCard
            title="Additional Information"
            icon={<CalendarOutlined />}
            items={additionalInfoItems}
            columns={2}
            loading={isLoading}
          />
        </Col>
      </Row>
    </EntityDetailLayout>
  );
};

export default StudentDetailView;
