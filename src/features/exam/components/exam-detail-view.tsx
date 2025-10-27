
/**
 * External Dependencies
 */
import { Row, Col, message } from "antd";
import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

/**
 * Internal Dependencies
 */

import { useGetExamQuery } from "../exam.api";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import EntityDetailLayout from "~/components/ui/entity-detail-layout";
import InfoCard from "~/components/ui/info-card";
import LoadingSpin from "~/components/ui/loading-spin";
import type { ExamType } from "../exam.type";

const ExamDetailView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};

  const { data: response, isLoading, error, refetch } = useGetExamQuery(id as string, {
    skip: !id
  });

  const examData: ExamType = response?.data as ExamType;

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
        <h3>Failed to load exam details</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!examData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Exam not found</h3>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const examInfoItems = [
    { label: "Title", value: examData.title },
    { label: "Date", value: formatDate(examData.date) },
    { label: "Class", value: (examData as any)?.class?.className || "N/A" },
  ];

  const breadcrumbItems = [
    {
      label: "Exam List",
      link: `/${role?.toLowerCase()}/exams`,
    },
    {
      label: "Exam Details",
    },
  ];

  const headerProps = {
    breadcrumbItems,
    onRefresh: handleRefresh,
    showEditButton:false,
    showExportButtons:false,
  }; 
  return (
    <EntityDetailLayout
      headerProps={headerProps}
      profileProps={{
        name: examData.title,
        id: examData?.classId || "N/A",
        image: "",
        status: "Active",
        role: "Exam",
        loading: isLoading,
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <InfoCard
            title="Exam Information"
            icon={<BookOutlined />}
            items={examInfoItems}
            columns={1}
            loading={isLoading}
          />
        </Col>
        <Col xs={24}>
          <InfoCard
            title="Subjects"
            icon={<CalendarOutlined />}
            items={examData.subjects.map(subject => ({
              label: subject.subjectId,
              value: `Total Mark: ${subject.totalMark}`
            }))}
            columns={1}
            loading={isLoading}
          />
        </Col>
      </Row>
    </EntityDetailLayout>
  );
};

export default ExamDetailView;
