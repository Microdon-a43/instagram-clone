import { type IconType } from '@/shared/ui/Icon/IconName';

export interface INavMenuItem {
  href?: string;
  type: IconType;
  onClick?: (value: any) => void;
}
