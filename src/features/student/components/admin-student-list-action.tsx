/**
 * External Dependencies
*/
import { TiLocationArrowOutline } from "react-icons/ti";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { TbEditCircle } from "react-icons/tb";
import { Link } from "react-router-dom";
import React, { FC } from "react";

/**
 * Internal Dependencies
*/
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { ModifiedErrorType } from "~/common/types/response.type";
import { USER } from "~/common/constants/local-storage.constant";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomDropdown from "~/components/ui/custom-dropdown";
import { useDeleteStudentMutation } from "../student.api";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import { styles } from "~/common/styles";

const AdminStudentListAction: FC<{ id: string }> = ({ id }) => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const [deleteStudent, res] = useDeleteStudentMutation();

  const handleDelete = (id: string) => {
    deleteStudent(id);
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
    successMessage: "Student deleted successfully",
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
              <Link to={`/${role?.toLocaleLowerCase()}/update-student/${id}`}>
                <div style={styles.item}>
                  <TbEditCircle style={styles.icon} />
                  <span>Edit</span>
                </div>
              </Link>
            ),
          },
          {
            key: "view details",
            label: (
              <Link to={`/${role?.toLocaleLowerCase()}/students/${id}`}>
                <div style={styles.item}>
                  <MdOutlineRemoveRedEye style={styles.icon} />
                  <span>View Details</span>
                </div>
              </Link>
            ),
          },
          {
            key: "Student Promotion",
            label: (
              <Link to={`/${role?.toLocaleLowerCase()}/student-promotion/${id}`}>
                <div style={styles.item}>
                  <TiLocationArrowOutline style={styles.icon} />
                  <span>Student Promotion</span>
                </div>
              </Link>
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

export default AdminStudentListAction;
