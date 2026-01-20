import { useState, useEffect } from 'react';
import Header from './shared/components/Header';
import Sidebar from './shared/components/Sidebar';
import { UserType } from './shared/types';

// 动态导入各个模块
const loadAdminModule = () => import('./modules/admin');
const loadVendorModule = () => import('./modules/vendor');
const loadNursingModule = () => import('./modules/nursing');

export default function LongTermCareInsurancePlatform() {
  const [userType, setUserType] = useState<UserType>('经办机构');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentModule, setCurrentModule] = useState<any>(null);

  // 根据用户类型动态加载模块
  const loadModule = async (type: UserType) => {
    try {
      let module;
      switch (type) {
        case '经办机构':
          module = await loadAdminModule();
          break;
        case '生产/代理企业':
          module = await loadVendorModule();
          break;
        case '长护机构':
          module = await loadNursingModule();
          break;
      }
      setCurrentModule(module);
    } catch (error) {
      console.error('Failed to load module:', error);
    }
  };

  // 当用户类型改变时，加载对应模块
  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setActiveTab('dashboard');
    loadModule(type);
  };

  // 初始化加载默认模块
  useEffect(() => {
    loadModule(userType);
  }, []);

  const renderContent = () => {
    if (!currentModule) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">正在加载模块...</p>
          </div>
        </div>
      );
    }

    const { AdminDashboard, CategoryManagement, DirectoryManagement, QualificationReview, ProductManagement: AdminProductManagement, AdminPublicDisclosure, ComplaintManagement: AdminComplaintManagement, AdminFeedback } = currentModule;
    const { VendorDashboard, ProductManagement, PublicDisclosure, ComplaintManagement } = currentModule;
    const { NursingDashboard, ProductQuery, OrderManagement, ShippingManagement, ReceivingManagement, NursingFeedback } = currentModule;

    if (userType === '长护机构') {
      switch (activeTab) {
        case 'dashboard':
          return NursingDashboard ? <NursingDashboard userType={userType} /> : null;
        case 'trade-product-query':
          return <ProductQuery />;
        case 'trade-order-management':
          return <OrderManagement />;
        case 'trade-shipping-management':
          return <ShippingManagement />;
        case 'trade-receiving-management':
          return <ReceivingManagement />;
        case 'trade-feedback':
          return NursingFeedback ? <NursingFeedback /> : null;
        default:
          return NursingDashboard ? <NursingDashboard userType={userType} /> : null;
      }
    } else if (userType === '经办机构') {
      switch (activeTab) {
        case 'dashboard':
          return AdminDashboard ? <AdminDashboard userType={userType} /> : null;
        case 'categories':
          return <CategoryManagement />;
        case 'product-maintenance-directory':
          return <DirectoryManagement />;
        case 'product-maintenance-products':
          return AdminProductManagement ? <AdminProductManagement userType={userType} /> : null;
        case 'product-maintenance-qualification':
          return <QualificationReview />;
        case 'product-maintenance-disclosure':
          return AdminPublicDisclosure ? <AdminPublicDisclosure /> : null;
        case 'product-maintenance-complaints':
          return AdminComplaintManagement ? <AdminComplaintManagement /> : null;
        case 'admin-trade-feedback':
          return AdminFeedback ? <AdminFeedback /> : null;
        default:
          return AdminDashboard ? <AdminDashboard userType={userType} /> : null;
      }
    } else {
      // 生产/代理企业
      switch (activeTab) {
        case 'dashboard':
          return VendorDashboard ? <VendorDashboard userType={userType} /> : null;
        case 'products':
          return <ProductManagement userType={userType} />;
        case 'disclosure':
          return <PublicDisclosure />;
        case 'complaints':
          return <ComplaintManagement />;
        default:
          return VendorDashboard ? <VendorDashboard userType={userType} /> : null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userType={userType} setUserType={handleUserTypeChange} />
      <div className="flex flex-1">
        <Sidebar
          userType={userType}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}