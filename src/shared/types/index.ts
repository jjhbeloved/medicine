// 共享类型定义
export type UserType = '经办机构' | '生产/代理企业' | '长护机构';

export interface BaseProps {
  userType: UserType;
}

// 菜单项类型
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}