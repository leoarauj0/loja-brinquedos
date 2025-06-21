import { ButtonShape, ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { CSSProperties, MouseEventHandler } from "react";

export interface IButtonProps {
  href?: string;
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  htmlType?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?:
    | boolean
    | {
        delay?: number;
      };
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  onClick?: (MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>) | undefined;
  style?: CSSProperties | undefined;
  texto?: string;
  largura?: string;
  altura?: string;
}
