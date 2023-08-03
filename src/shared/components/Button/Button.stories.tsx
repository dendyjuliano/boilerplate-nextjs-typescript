import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import {
  PlusCircleOutlined,
  PlusCircleFilled,
  EyeFilled,
} from "@ant-design/icons";

const meta: Meta<typeof Button> = {
  title: "Button Component",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Press Here!!",
    type: "button",
    variant: "solid",
    color: "primary",
  },
};

export const LeftIconPrimary: Story = {
  args: {
    ...Primary.args,
    leftIcon: <PlusCircleOutlined />,
  },
};

export const RightIconPrimary: Story = {
  args: {
    ...Primary.args,
    rightIcon: <PlusCircleFilled />,
  },
};

export const IconOnly: Story = {
  args: {
    variant: "solid",
    color: "primary",
    children: <EyeFilled />,
  },
};
