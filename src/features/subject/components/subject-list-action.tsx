import { DeleteOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { styles } from "~/common/styles";
import CustomDropdown from "~/components/ui/custom-dropdown";
import SecondaryButton from "~/components/ui/secondary-button";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import { useDeleteSubjectMutation } from "../subject.api";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { ModifiedErrorType } from "~/common/types/response.type";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import { setEditId, setModalName } from "~/redux/slice";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant"; 

const SubjectListAction: FC<{ id:string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [deleteSubject, { isError, isSuccess, error }] =
    useDeleteSubjectMutation();

  const handleDelete = (id: string) => {
    deleteSubject(id);
  };

  const handleOpenEditModal = (id: string) => {
    dispatch(setEditId(id));
    dispatch(setModalName(MODEL_CONSTANT.EDIT_SUBJECT));
  };

  useShowToastMessage({
    isError,
    isSuccess,
    error: error as ModifiedErrorType,
    successMessage: "Subject deleted successfully",
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
              <div style={styles.item} onClick={() => handleOpenEditModal(id)}>
                <TbEditCircle style={styles.icon} />
                <span>Edit</span>
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

export default SubjectListAction;
