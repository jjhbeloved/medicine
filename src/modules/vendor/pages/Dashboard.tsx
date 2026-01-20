import { useState } from 'react';
import { Package, FileText, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { UserType } from '../../shared/types';

interface DashboardProps {
  userType: UserType;
}

export default function Dashboard({ userType }: DashboardProps) {
  const [stats] = useState({
    totalProducts: 15,
    approvedProducts: 12,
    pendingProducts: 2,
    rejectedProducts: 1,
    activeDisclosures: 8,
    pendingComplaints: 3,
    resolvedComplaints: 7
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">生产/代理企业管理平台</h2>
        <p className="text-gray-600 mt-1">欢迎使用长护险辅助器具采购平台管理系统</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">产品总数</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
              <p className="text-xs text-green-600">已通过 {stats.approvedProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">待审核产品</p>
              <p className="text-2xl font-bold">{stats.pendingProducts}</p>
              <p className="text-xs text-orange-600">审核中</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">公示中产品</p>
              <p className="text-2xl font-bold">{stats.activeDisclosures}</p>
              <p className="text-xs text-blue-600">可异议</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">投诉处理</p>
              <p className="text-2xl font-bold">{stats.pendingComplaints}</p>
              <p className="text-xs text-red-600">待回复</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            最新产品状态
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">智能防跌倒监测系统</p>
                <p className="text-sm text-gray-500">提交时间: 2023-12-01</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                审核中
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">电子血压计</p>
                <p className="text-sm text-gray-500">提交时间: 2023-11-28</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                已通过
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">智能轮椅</p>
                <p className="text-sm text-gray-500">提交时间: 2023-11-25</p>
              </div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                已驳回
              </span>
            </div>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
            最新投诉
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">产品质量问题</p>
                <p className="text-sm text-gray-500">投诉人: 张三 · 2023-12-01</p>
              </div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                待回复
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">配送延迟</p>
                <p className="text-sm text-gray-500">投诉人: 李四 · 2023-11-28</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                处理中
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">售后服务</p>
                <p className="text-sm text-gray-500">投诉人: 王五 · 2023-11-25</p>
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
              <p className="font-medium text-gray-900">提交新产品</p>
              <p className="text-sm text-gray-500">添加新的辅助器具产品</p>
            </div>
          </button>

          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <FileText className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">查看公示</p>
              <p className="text-sm text-gray-500">查看产品公示和异议期</p>
            </div>
          </button>

          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <MessageSquare className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">处理投诉</p>
              <p className="text-sm text-gray-500">回复用户投诉和建议</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}