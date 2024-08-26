import {ItemType} from 'antd/lib/menu/hooks/useItems';

export type TMenu = {
  [key: string]: {
    key?: React.Key;
    children?: ItemType[];
    theme?: 'dark' | 'light';
    danger?: boolean;
    dashed?: boolean;
    icon?: React.ReactNode;
    label?: string;
    role?: string;
    src?: string;
  }[];
};
