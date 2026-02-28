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
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import { setEditId, setFormInitialValues, setModalName } from "~/redux/slice";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";

const ExamListAction: FC<{ record: Record<string, unknown> }> = ({ record }) => {
  const { id } = record;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteExam, res] = useDeleteExamMutation();

  const handleEdit = () => {
    if (record) {
      dispatch(setEditId(record.id as string));
      dispatch(setFormInitialValues({
        ...record,
        date: record.date ? dayjs(record.date as string | number | Date | dayjs.Dayjs) : null,
      }));
      dispatch(setModalName(MODEL_CONSTANT.EDIT_EXAM));
    }
  };

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
              <div style={styles.item} onClick={() => handleDelete(id as string)}>
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
          {
            key: "view details",
            label: (
              <div style={styles.item}>
                <MdOutlineRemoveRedEye style={styles.icon} />
                {/* think about modal to shown the detail of an exam */}
                <span>View Details</span>
              </div>
            ),
            onClick: () => navigate(`/admin/exams/${id}`),
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
