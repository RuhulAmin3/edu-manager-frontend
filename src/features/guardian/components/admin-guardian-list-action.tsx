/**
 * External dependencies 
 */ 
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { TbEditCircle } from "react-icons/tb";
import { Link } from "react-router-dom";
import React, { FC } from "react";

/**
 * Internal dependencies 
 */ 

import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message"; 
import { ModifiedErrorType } from "~/common/types/response.type";
import { USER } from "~/common/constants/local-storage.constant"; 
import SecondaryButton from "~/components/ui/secondary-button";
import CustomDropdown from "~/components/ui/custom-dropdown";
import { useDeleteGuardianMutation } from "../guardian.api";
import {MdOutlineRemoveRedEye} from "react-icons/md"; ;
import { EDU_MANAGER_TOKENS } from "~/styles/token"; 
import { styles } from "~/common/styles";


const AdminGuardianListAction:FC<{id:string}> = ({id}) => {
const {role}:Record<string, string> = getFromLocalStorage(USER) || {};

const [deleteGuardian, res] = useDeleteGuardianMutation();

  const handleDelete = (id: string) => {
    deleteGuardian(id);
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
    successMessage: "Guardian deleted successfully",
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
             <Link to={`/${role?.toLocaleLowerCase()}/guardians/${id}`}> 
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

export default AdminGuardianListAction;
