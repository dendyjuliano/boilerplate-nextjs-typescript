import React from "react";
import cx from "classnames";
import { Modal } from "antd";

interface ModalStatusProps {
  status: "success" | "error" | "warning";
  title: string;
  content?: string;
  handleOke?: () => void;
}

const ModalStatus = ({
  status,
  title,
  content,
  handleOke = () => undefined,
}: ModalStatusProps) => {
  return Modal[status]({
    title: (
      <p
        className={cx({
          ["tw-text-primary-main"]: status === "success",
          ["tw-text-danger-main"]: status === "error",
          ["tw-text-warning-main"]: status === "warning",
        })}
      >
        {title}
      </p>
    ),
    content: <div>{content}</div>,
    onOk() {
      handleOke();
    },
    okButtonProps: {
      className: "tw-bg-primary",
    },
  });
};

export default ModalStatus;
