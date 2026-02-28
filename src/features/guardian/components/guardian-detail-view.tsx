/**
 * External Dependencies
 */
import { Row, Col, message, Tag } from "antd";
import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SafetyOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

/**
 * Internal Dependencies
 */

import { useGetGuardianQuery } from "../guardian.api";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import { bloodGroupList } from "~/common/constants";
import EntityDetailLayout from "~/components/ui/entity-detail-layout";
import InfoCard from "~/components/ui/info-card";
import LoadingSpin from "~/components/ui/loading-spin";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import type { Guardian } from "../guardian.types";

const GuardianDetailView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  
  const { data: response, isLoading, error, refetch } = useGetGuardianQuery(id as string, {
    skip: !id
  });

  const guardianData: Guardian = response?.data as Guardian;

  const handleEdit = () => {
    navigate(`/${role?.toLowerCase()}/update-guardian/${id}`);
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
        <h3>Failed to load guardian details</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!guardianData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Guardian not found</h3>
      </div>
    );
  }

  const fullName = `${guardianData.name.firstName} ${guardianData.name.middleName ? guardianData.name.middleName + " " : ""
    }${guardianData.name.lastName}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAccountStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return EDU_MANAGER_TOKENS.colors["edu-success"];
      case "pending":
        return EDU_MANAGER_TOKENS.colors["edu-warning"];
      case "block":
        return EDU_MANAGER_TOKENS.colors["edu-danger"];
      default:
        return EDU_MANAGER_TOKENS.colors["edu-secondary"];
    }
  };

  const accountStatusTag = (
    <Tag 
      color={getAccountStatusColor(guardianData.accountStatus)}
      style={{ fontSize: EDU_MANAGER_TOKENS.fontSize["edu-font-sm"] }}
    >
      {guardianData.accountStatus}
    </Tag>
  );

  const personalInfoItems = [
    { label: "Full Name", value: fullName },
    { label: "Guardian ID", value: guardianData.guardianId },
    { label: "Gender", value: guardianData.gender },
    { label: "Blood Group", value: bloodGroupList[guardianData.bloodGroup] || guardianData.bloodGroup },
    { label: "Email", value: guardianData.email || "N/A" },
    { label: "Contact Number", value: guardianData.contactNo },
    { label: "Occupation", value: guardianData.occupation },
    { label: "Address", value: guardianData.address },
  ];

  const accountInfoItems = [
    { label: "Account Status", value: accountStatusTag },
    { label: "Number of Students", value: guardianData.students.length },
    { label: "Student IDs", value: guardianData.students.length > 0 ? guardianData.students.join(", ") : "No students assigned", span: 2 },
  ];

  const additionalInfoItems = [
    { label: "Created At", value: formatDate(guardianData.createdAt) },
    { label: "Last Updated", value: formatDate(guardianData.updatedAt) },
    { label: "Description", value: guardianData.shortDescription || "N/A", span: 2 },
  ];

  const breadcrumbItems = [
    {
      label: "Guardian List",
      link: `/${role?.toLowerCase()}/guardians`,
    },
    {
      label: "Guardian Details",
    },
  ];

  const headerProps = {
    breadcrumbItems,
    onEdit: handleEdit,
    onRefresh: handleRefresh,
    onExportPdf: handleExportPdf,
    onExportExcel: handleExportExcel,
    onPrint: handlePrint,
    editButtonText: "Edit Guardian",
  };

  const profileProps = {
    name: fullName,
    id: guardianData.guardianId,
    image: guardianData.image,
    status: guardianData.accountStatus,
    role: "Guardian",
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

        {/* Account Information */}
        <Col xs={24} xl={12}>
          <InfoCard
            title="Account Information"
            icon={<SafetyOutlined />}
            items={accountInfoItems}
            columns={1}
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

export default GuardianDetailView;
