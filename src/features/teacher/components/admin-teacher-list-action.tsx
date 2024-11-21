
import { DeleteOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { styles } from "~/common/styles";
import CustomDropdown from "~/components/ui/custom-dropdown";
import SecondaryButton from "~/components/ui/secondary-button";
import { EDU_MANAGER_TOKENS } from "~/styles/token"; 
import { ModifiedErrorType } from "~/common/types/response.type";
import useShowToastMessage from "~/common/hooks/use-show-toast-message"; 
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant"; 
import {MdOutlineRemoveRedEye} from "react-icons/md";
import { useDeleteTeacherMutation } from "../teacher.api";


const AdminTeacherListAction:FC<{id:string}> = ({id}) => {
const {role}:Record<string, string> = getFromLocalStorage(USER) || {};

const [deleteTeacher, res] = useDeleteTeacherMutation();
  const handleDelete = (id: string) => {
    deleteTeacher(id);
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
    successMessage: "Teacher deleted successfully",
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
             <Link to={`/${role?.toLocaleLowerCase()}/teachers/${id}`}> 
              <div style={styles.item}>
                <MdOutlineRemoveRedEye style={styles.icon} />
                <span>View Details</span>
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

export default AdminTeacherListAction;
