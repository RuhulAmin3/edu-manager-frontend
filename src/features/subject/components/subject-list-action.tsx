/**
 * External Dependencies
*/
import React, { FC, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { TbEditCircle } from "react-icons/tb";

/**
 * Internal Dependencies
*/
import { setEditId, setFormInitialValues, setModalName } from "~/redux/slice";
import { useDeleteSubjectMutation, useGetSubjectQuery } from "../subject.api";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { ModifiedErrorType } from "~/common/types/response.type";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomDropdown from "~/components/ui/custom-dropdown";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import { styles } from "~/common/styles";

const SubjectListAction: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);

  const [deleteSubject, res] = useDeleteSubjectMutation();
  const { data, isSuccess, isFetching, refetch } = useGetSubjectQuery(id, {
    skip: skip,
  });

  // Edit functinality
  const handleGetData = () => {
    dispatch(setEditId(id));
    setSkip(false);
    if (!skip) refetch();
  };

  const handleOpenEditModal = (id: string) => {
    dispatch(setEditId(id));
    dispatch(setModalName(MODEL_CONSTANT.EDIT_SUBJECT));
  };

  // set into redux store 
  useEffect(() => {
    if (isSuccess && !isFetching) {
      dispatch(setFormInitialValues(data?.data));
    }
  }, [isSuccess, isFetching, dispatch, data]);

  // delete functinality
  const handleDelete = (id: string) => {
    deleteSubject(id);
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
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
        <SecondaryButton onClick={handleGetData}>
          <BsThreeDotsVertical />
        </SecondaryButton>
      </CustomDropdown>
    </>
  );
};

export default SubjectListAction;
