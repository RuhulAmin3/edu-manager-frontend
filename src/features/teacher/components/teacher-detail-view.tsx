/**
 * External Dependencies
 */
import { Row, Col, message } from "antd";
import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BookOutlined,
  BankOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";

/**
 * Internal Dependencies
 */

import { useGetTeacherQuery } from "../teacher.api";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import { bloodGroupList } from "~/common/constants";
import EntityDetailLayout from "~/components/ui/entity-detail-layout";
import InfoCard from "~/components/ui/info-card";
import LoadingSpin from "~/components/ui/loading-spin";
import type { Teacher } from "../teacher.types";

const TeacherDetailView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  
  const { data: response, isLoading, error, refetch } = useGetTeacherQuery(id as string, {
    skip: !id
  });

  const teacherData: Teacher = response?.data as Teacher;

  const handleEdit = () => {
    navigate(`/${role?.toLowerCase()}/update-teacher/${id}`);
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
        <h3>Failed to load teacher details</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Teacher not found</h3>
      </div>
    );
  }

  const fullName = `${teacherData.name.firstName} ${teacherData.name.middleName ? teacherData.name.middleName + " " : ""
    }${teacherData.name.lastName}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const personalInfoItems = [
    { label: "Full Name", value: fullName },
    { label: "Teacher ID", value: teacherData.teacherId },
    { label: "Gender", value: teacherData.gender },
    { label: "Date of Birth", value: formatDate(teacherData.dateOfBirth) },
    { label: "Blood Group", value: bloodGroupList[teacherData.bloodGroup] || teacherData.bloodGroup },
    { label: "Email", value: teacherData.email },
    { label: "Contact Number", value: teacherData.contactNo },
    { label: "Address", value: teacherData.address },
  ];

  const professionalInfoItems = [
    { label: "Designation", value: teacherData.designation },
    { label: "Subject", value: teacherData.subject },
    { label: "Employment Type", value: teacherData.type },
    { label: "Monthly Salary", value: formatCurrency(teacherData.salary) },
  ];

  const educationalInfoItems = [
    { label: "University", value: teacherData.educationalQualification.universityName },
    { label: "Subject/Field", value: teacherData.educationalQualification.subject },
    { label: "Degree", value: teacherData.educationalQualification.graduation },
    { label: "Result/Grade", value: teacherData.educationalQualification.result || "N/A" },
    { label: "Completion Year", value: teacherData.educationalQualification.completedYear || "N/A" },
  ];

  const additionalInfoItems = [
    { label: "Created At", value: formatDate(teacherData.createdAt) },
    { label: "Last Updated", value: formatDate(teacherData.updatedAt) },
    { label: "Description", value: teacherData.shortDescription || "N/A", span: 2 },
  ];

  const breadcrumbItems = [
    {
      label: "Teacher List",
      link: `/${role?.toLowerCase()}/teachers`,
    },
    {
      label: "Teacher Details",
    },
  ];

  const headerProps = {
    breadcrumbItems,
    onEdit: handleEdit,
    onRefresh: handleRefresh,
    onExportPdf: handleExportPdf,
    onExportExcel: handleExportExcel,
    onPrint: handlePrint,
    editButtonText: "Edit Teacher",
  };

  const profileProps = {
    name: fullName,
    id: teacherData.teacherId,
    image: teacherData.image,
    status: "Active", // Teachers don't have status field like students
    role: "Teacher",
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

        {/* Professional Information */}
        <Col xs={24} xl={12}>
          <InfoCard
            title="Professional Information"
            icon={<BankOutlined />}
            items={professionalInfoItems}
            columns={1}
            loading={isLoading}
          />
        </Col>

        {/* Educational Background */}
        <Col xs={24}>
          <InfoCard
            title="Educational Background"
            icon={<BookOutlined />}
            items={educationalInfoItems}
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

export default TeacherDetailView;
