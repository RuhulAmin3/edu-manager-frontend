import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { Upload, Image, message, Flex, UploadProps } from "antd";
import SecondaryButton from "../ui/secondary-button";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../ui/primary-button"; 
import { RiImageAddLine } from "react-icons/ri";

interface CustomUploadProps extends UploadProps {
  initialFileList?: UploadFile[];
  onRemoveFile?: () => void; // Callback to inform parent of file removal
}

const UploadFile: React.FC<CustomUploadProps> = ({ initialFileList, onRemoveFile, ...props }) => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList || []);

  useEffect(() => {
    if (initialFileList && initialFileList.length) {
      setFileList(initialFileList);
      setFile(initialFileList[0]);
      setPreview(initialFileList[0].url || null);
    }
  }, [initialFileList]);

  const beforeUpload = (file: RcFile) => {
    const isValidSize = file.size / 1024 / 1024 < 4;
    const isValidType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml";

    if (!isValidType) {
      message.error("You can only upload JPG, PNG, or SVG files!");
      return Upload.LIST_IGNORE;
    }

    if (!isValidSize) {
      message.error("Image must be smaller than 4MB!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);

    setFile({
      uid: file.uid,
      name: file.name,
      status: "done",
      url: URL.createObjectURL(file),
    });

    return false;
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setFileList([]);
    if (onRemoveFile) onRemoveFile(); 
  };

  return (
    <Flex gap={10}>
      <div
        style={{
          maxWidth: "130px",
          maxHeight: "130px",
          border: "1px dashed #d9d9d9",
          borderRadius: "5px",
        }}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            style={{
              height: "120px",
              width: "120px",
            }}
          />
        ) : (
          <Flex
            align="center"
            justify="center"
            style={{
              width: "120px",
              height: "120px",
            }}
          >
            <RiImageAddLine style={{ height: "25px", width: "25px" }} />
          </Flex>
        )}
      </div>

      <Upload
        beforeUpload={beforeUpload}
        showUploadList={false}
        fileList={fileList}
        accept=".jpg,.png,.svg"
        {...props}
      >
        <PrimaryButton
          icon={<UploadOutlined />}
          style={{ marginRight: "10px" }}
          disabled={!!file}
        >
          Upload
        </PrimaryButton>
      </Upload>
      <SecondaryButton icon={<DeleteOutlined />} onClick={handleRemove}>
        Remove
      </SecondaryButton>
    </Flex>
  );
};

export default UploadFile;
