import { useState } from 'react';
import { Package, ShoppingCart, Truck, Box, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { UserType } from '../../shared/types';

interface DashboardProps {
  userType: UserType;
}

export default function Dashboard({ userType }: DashboardProps) {
  const [stats] = useState({
    totalOrders: 45,
    pendingOrders: 8,
    shippingOrders: 12,
    completedOrders: 25,
    totalProducts: 156,
    activeProducts: 142,
    pendingFeedback: 3,
    resolvedFeedback: 12
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">长护机构管理平台</h2>
        <p className="text-gray-600 mt-1">欢迎使用长护险辅助器具采购平台管理系统</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">订单总数</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
              <p className="text-xs text-green-600">已完成 {stats.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">待处理订单</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              <p className="text-xs text-orange-600">需确认</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">配送中订单</p>
              <p className="text-2xl font-bold">{stats.shippingOrders}</p>
              <p className="text-xs text-blue-600">运输中</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">待处理反馈</p>
              <p className="text-2xl font-bold">{stats.pendingFeedback}</p>
              <p className="text-xs text-red-600">需回复</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
            最近订单
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">智能防跌倒监测系统</p>
                <p className="text-sm text-gray-500">订单号: ORD202312001 · 2023-12-01</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                待确认
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">电子血压计</p>
                <p className="text-sm text-gray-500">订单号: ORD202311028 · 2023-11-28</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                配送中
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">手动轮椅</p>
                <p className="text-sm text-gray-500">订单号: ORD202311025 · 2023-11-25</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                已完成
              </span>
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
            最新反馈
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">产品质量改进建议</p>
                <p className="text-sm text-gray-500">提交人: 王医生 · 2023-12-01</p>
              </div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                高优先级
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">配送服务反馈</p>
                <p className="text-sm text-gray-500">提交人: 李护士 · 2023-11-28</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                处理中
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">使用咨询</p>
                <p className="text-sm text-gray-500">提交人: 张主任 · 2023-11-25</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                已解决
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">快捷操作</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Package className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">浏览目录</p>
              <p className="text-sm text-gray-500">查看可用产品目录</p>
            </div>
          </button>

          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <ShoppingCart className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">提交订单</p>
              <p className="text-sm text-gray-500">快速下单采购产品</p>
            </div>
          </button>

          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <MessageSquare className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">提交反馈</p>
              <p className="text-sm text-gray-500">提出建议或投诉</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}