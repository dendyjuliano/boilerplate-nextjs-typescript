import React from "react";
import styles from "./Button.module.css";
import cx from "classnames";
import { Button as ButtonAntd } from "antd";
import { ColorsType } from "@src/shared/interface/general.interface";

export interface ButtonPropsCustom extends ColorsType {
  label?: React.ReactNode;
  className?: string;
  size?: "small" | "middle" | "large";
  variant?: "solid" | "clear" | "border";
  type?: "submit" | "button";
  disabled?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  label,
  className,
  type = "button",
  size = "middle",
  color = "primary",
  variant = "solid",
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick = () => undefined,
}: ButtonPropsCustom) {
  return (
    <ButtonAntd
      className={cx(className, styles.button, {
        [styles.iconOnly]: !!children,
        [styles.solidPrimary]: variant === "solid" && color === "primary",
        [styles.borderPrimary]: variant === "border" && color === "primary",
      })}
      htmlType={type}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        {!!leftIcon && <div>{leftIcon}</div>}
        {!!children && !label && children}
        {!children && label}
        {!!rightIcon && <div>{rightIcon}</div>}
      </div>
    </ButtonAntd>
  );
}
