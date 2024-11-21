/*
 * External Dependencies
 */ 
import { DeleteOutlined } from "@ant-design/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import React, { FC } from "react";
/*
 * Internal Dependencies
 */ 
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { ModifiedErrorType } from "~/common/types/response.type";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomDropdown from "~/components/ui/custom-dropdown";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { EDU_MANAGER_TOKENS } from "~/styles/token"; 
import { useDeleteExamMutation } from "../exam.api";
import { styles } from "~/common/styles";


const ExamListAction:FC<{id:string}> = ({id}) => {
const [deleteExam, res] = useDeleteExamMutation();
  const handleDelete = (id: string) => {
    deleteExam(id);
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
    successMessage: "exam deleted successfully",
  });

  return (
    <>
      <CustomDropdown
        placement="bottomLeft"
        items={[
          {
            key: "delete",
            label: (
              <div style={styles.item} onClick={() => handleDelete(id)}>
                <DeleteOutlined
                  style={{
                    ...styles.icon,
                    color: EDU_MANAGER_TOKENS.colors["edu-danger"],
                  }}
                />
                <span>Delete</span>
              </div>
            ),
          },
          {
            key: "edit",
            label: (
              <div style={styles.item}>
                <TbEditCircle style={styles.icon} />
                <span>Edit</span>
              </div>
            ),
          },
          {
            key: "view details",
            label: ( 
              <div style={styles.item}>
                <MdOutlineRemoveRedEye style={styles.icon} /> 
                {/* think about modal to shown the detail of an exam */}
                <span>View Details</span>
              </div> 
            ),
          },
        ]}
      >
        <SecondaryButton>
          <BsThreeDotsVertical />
        </SecondaryButton>
      </CustomDropdown>
    </>
  );
};

export default ExamListAction;
