import { classNames } from '@/shared/lib/classNames';
import type { DropDownProps, MenuProps } from 'antd';
import { Dropdown } from 'antd';

import { type FC, type ReactNode } from 'react';

interface CustomDropdownProps extends DropDownProps {
  items: MenuProps['items'];
  children: ReactNode;
  className?: string;
  onClick?: (value?: any) => void;
}

export const DropDown: FC<CustomDropdownProps> = (props) => {
  const { items, children, className, onClick, ...rest } = props;

  return (
    <Dropdown
      menu={{ items, onClick }}
      trigger={['click']}
      className={classNames('dropdown', {}, [])}
      {...rest}
    >
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </a>
    </Dropdown>
  );
};
