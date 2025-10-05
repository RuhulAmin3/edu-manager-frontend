/**
 * External Dependencies
 */
import { Row, Col } from "antd";
import { FC, ReactNode } from "react";

/**
 * Internal Dependencies
 */
import DetailPageHeader, { DetailPageHeaderProps } from "./detail-page-header";
import ProfileAvatarCard, { ProfileAvatarCardProps } from "./profile-avatar-card";

export type EntityDetailLayoutProps = {
  headerProps: DetailPageHeaderProps;
  profileProps: ProfileAvatarCardProps;
  children: ReactNode;
  profileColSpan?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  contentColSpan?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
};

const EntityDetailLayout: FC<EntityDetailLayoutProps> = ({
  headerProps,
  profileProps,
  children,
  profileColSpan = { xs: 24, lg: 6 },
  contentColSpan = { xs: 24, lg: 18 },
}) => {
  return (
    <div>
      <DetailPageHeader {...headerProps} />

      <Row gutter={[24, 24]} style={{ marginTop: "20px" }}>
        {/* Profile Section */}
        <Col {...profileColSpan}>
          <ProfileAvatarCard {...profileProps} />
        </Col>

        {/* Content Section */}
        <Col {...contentColSpan}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default EntityDetailLayout;
