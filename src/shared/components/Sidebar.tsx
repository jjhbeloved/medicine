import React, { useState } from 'react';
import { Home, FolderPlus, Package, ClipboardCheck, Eye, MessageSquare, User, LayoutDashboard, ShoppingCart, Truck, Box, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { UserType } from '../types';

interface SidebarProps {
  userType: UserType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ userType, activeTab, setActiveTab }: SidebarProps) {
  const isAdmin = userType === '经办机构';
  const isNursingHome = userType === '长护机构';
  const isVendor = userType === '生产/代理企业';

  const [expandedAdminProductMaintenance, setExpandedAdminProductMaintenance] = useState(false);
  const [expandedNursingHomeTrade, setExpandedNursingHomeTrade] = useState(false);
  const [expandedAdminTrade, setExpandedAdminTrade] = useState(false);

  const getMenuItems = () => {
    if (isNursingHome) {
      return [
        { id: 'dashboard', label: '首页', icon: <Home className="h-5 w-5" /> },
        {
          id: 'trade',
          label: '交易管理',
          icon: <ShoppingCart className="h-5 w-5" />,
          subItems: [
            { id: 'trade-product-query', label: '目录产品查询' },
            { id: 'trade-order-management', label: '订单管理' },
            { id: 'trade-shipping-management', label: '发货退货管理' },
            { id: 'trade-receiving-management', label: '收货退货管理' },
            { id: 'trade-feedback', label: '需求反馈' }
          ]
        }
      ];
    } else if (isVendor) {
      return [
        { id: 'dashboard', label: '首页', icon: <Home className="h-5 w-5" /> },
        { id: 'products', label: '产品管理', icon: <Package className="h-5 w-5" /> },
        { id: 'disclosure', label: '公示公布', icon: <Eye className="h-5 w-5" /> },
        { id: 'complaints', label: '申投诉管理', icon: <MessageSquare className="h-5 w-5" /> }
      ];
    } else if (isAdmin) {
      return [
        { id: 'dashboard', label: '首页', icon: <Home className="h-5 w-5" /> },
        { id: 'categories', label: '类目管理', icon: <FolderPlus className="h-5 w-5" /> },
        {
          id: 'product-maintenance',
          label: '器具产品维护',
          icon: <Package className="h-5 w-5" />,
          subItems: [
            { id: 'product-maintenance-directory', label: '目录管理' },
            { id: 'product-maintenance-products', label: '产品管理' },
            { id: 'product-maintenance-qualification', label: '资质审核' },
            { id: 'product-maintenance-disclosure', label: '公示公布' },
            { id: 'product-maintenance-complaints', label: '申投诉管理' }
          ]
        },
        {
          id: 'admin-trade',
          label: '交易管理',
          icon: <ShoppingCart className="h-5 w-5" />,
          subItems: [
            { id: 'admin-trade-feedback', label: '需求反馈' }
          ]
        }
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  const getUserId = () => {
    if (isAdmin) return 'ADMIN-2023';
    if (isNursingHome) return 'NURSING-2023';
    return 'VENDOR-5678';
  };

  return (
    <aside className="bg-gray-100 w-64 min-h-screen hidden md:block">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center mb-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium">{userType}</h3>
            <p className="text-sm text-gray-500">ID: {getUserId()}</p>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              if (item.subItems) {
                const isExpanded = (item.id === 'trade' && expandedNursingHomeTrade) ||
                                 (item.id === 'product-maintenance' && expandedAdminProductMaintenance) ||
                                 (item.id === 'admin-trade' && expandedAdminTrade);

                const toggleExpand = () => {
                  if (item.id === 'trade') setExpandedNursingHomeTrade(!expandedNursingHomeTrade);
                  else if (item.id === 'product-maintenance') setExpandedAdminProductMaintenance(!expandedAdminProductMaintenance);
                  else if (item.id === 'admin-trade') setExpandedAdminTrade(!expandedAdminTrade);
                };

                const handleClick = () => {
                  toggleExpand();
                  if (!isExpanded) {
                    // Set default active tab for expanded menu
                    if (item.id === 'trade') setActiveTab('trade-product-query');
                    else if (item.id === 'product-maintenance') setActiveTab('product-maintenance-directory');
                    else if (item.id === 'admin-trade') setActiveTab('admin-trade-feedback');
                  }
                };

                return (
                  <div key={item.id}>
                    <button
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                        activeTab.startsWith(item.id)
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-200'
                      }`}
                      onClick={handleClick}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                    {isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            className={`w-full flex items-center px-3 py-1 rounded-md text-left text-sm ${
                              activeTab === subItem.id
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-300'
                            }`}
                            onClick={() => setActiveTab(subItem.id)}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}