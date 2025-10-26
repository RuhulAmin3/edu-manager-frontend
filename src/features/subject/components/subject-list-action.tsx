/**
 * External Dependencies
*/
import { FC } from "react";
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
import { SubjectDataType } from "../subject.type";

const SubjectListAction: FC<{ record: SubjectDataType }> = ({ record }) => {
  const dispatch = useAppDispatch();

  const [deleteSubject, res] = useDeleteSubjectMutation();

  const handleEdit = () => {
    if (record) {
      dispatch(setEditId(record.id));
      dispatch(setFormInitialValues({
        title: record.title,
        code: record.code,
      }));
      dispatch(setModalName(MODEL_CONSTANT.EDIT_SUBJECT));
    }
  };

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
              <div style={styles.item}>
                <TbEditCircle style={styles.icon} />
                <span>Edit</span>
              </div>
            ),
            onClick: handleEdit,
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
