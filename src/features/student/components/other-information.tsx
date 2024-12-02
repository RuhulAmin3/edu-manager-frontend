
import React from 'react'
import FormSectionTopbar from '~/components/ui/form-section-topbar'
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import DefaultCard from '~/components/ui/default-card';
import { Col, Row } from 'antd';
import CustomFormItem from '~/components/form/custom-form-item';
import CustomInput from '~/components/form/custom-input';
import CustomTextarea from '~/components/form/custom-textarea';

const OtherInformation = () => {
  return (
     <div style={{marginBlock:"20px"}}>
        <FormSectionTopbar title="Others Information" icon={<HiOutlineBuildingLibrary/>}/>
        <DefaultCard> 

        {/* first row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}  >
            <CustomFormItem
              label="Address"
              name="address"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} md={12}  >
            <CustomFormItem
              label="Password"
              name="password"
              layout="vertical" 
            >
              <CustomInput isPassword />
            </CustomFormItem>
          </Col>
          <Col xs={24} md={24}>
            <CustomFormItem
              label="Short Description"
              layout="vertical"
              name="shortDescription" 
            >
              <CustomTextarea rows={5} />
            </CustomFormItem>
          </Col> 
        </Row>
        </DefaultCard>
     </div>
  )
}

export default OtherInformation;