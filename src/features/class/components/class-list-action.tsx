import { DeleteOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { styles } from "~/common/styles";
import CustomDropdown from "~/components/ui/custom-dropdown";
import SecondaryButton from "~/components/ui/secondary-button";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import { useDeleteClassMutation } from "../class.api";
import { ModifiedErrorType } from "~/common/types/response.type";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { setEditId, setFormInitialValues, setModalName } from "~/redux/slice";
import { SubjectDataType } from "~/features/subject/subject.type";
import { ClassDataType } from "../class.type";

const ClassListAction:FC<{record:ClassDataType}> = ({record}) => {
  const dispatch = useAppDispatch();
  const [deleteClass, res] = useDeleteClassMutation();

  const handleDelete = (id: string) => {
    deleteClass(id);
  };

  const handleEdit = () => {
    if (record) {
      dispatch(setEditId(record.id));
      dispatch(setFormInitialValues({
        className: record.className,
        subjectIds: record.subjects?.map((subject: SubjectDataType) => subject.id ?? "") || []
      }));
      dispatch(setModalName(MODEL_CONSTANT.EDIT_CLASS));
    }
  };
  
  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
    successMessage: "Class deleted successfully",
  });

  return (
    <>
      <CustomDropdown
        placement="bottomLeft"
        items={[
          {
            key: "delete",
            label: (
              <div style={styles.item} onClick={() => handleDelete(record.id)}>
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
              <div style={styles.item} onClick={handleEdit}>
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

export default ClassListAction;
