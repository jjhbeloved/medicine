import { useState } from 'react';
import { Users, Package, FileText, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { UserType } from '../../shared/types';

interface DashboardProps {
  userType: UserType;
}

export default function Dashboard({ userType }: DashboardProps) {
  const [stats] = useState({
    totalCategories: 4,
    activeCategories: 3,
    totalDirectories: 2,
    publishedDirectories: 1,
    pendingReviews: 5,
    resolvedComplaints: 12,
    pendingFeedback: 3
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">经办机构管理平台</h2>
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
              <p className="text-sm text-gray-500">类目总数</p>
              <p className="text-2xl font-bold">{stats.totalCategories}</p>
              <p className="text-xs text-green-600">活跃 {stats.activeCategories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">目录总数</p>
              <p className="text-2xl font-bold">{stats.totalDirectories}</p>
              <p className="text-xs text-blue-600">已发布 {stats.publishedDirectories}</p>
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
              <p className="text-2xl font-bold">{stats.pendingReviews}</p>
              <p className="text-xs text-orange-600">需要处理</p>
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
              <p className="text-xs text-red-600">需及时回复</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-600" />
            近期待审核产品
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">智能防跌倒监测系统</p>
                <p className="text-sm text-gray-500">提交时间: 2023-12-01</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                待审核
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">电子血压计</p>
                <p className="text-sm text-gray-500">提交时间: 2023-11-28</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                待审核
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">智能轮椅</p>
                <p className="text-sm text-gray-500">提交时间: 2023-11-25</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                待审核
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
                <p className="font-medium">关于产品质量的建议</p>
                <p className="text-sm text-gray-500">张三 · 2023-12-01</p>
              </div>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                高优先级
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">配送服务投诉</p>
                <p className="text-sm text-gray-500">李四 · 2023-11-28</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                中优先级
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">政策咨询</p>
                <p className="text-sm text-gray-500">王五 · 2023-11-25</p>
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
              <p className="font-medium text-gray-900">新增类目</p>
              <p className="text-sm text-gray-500">添加新的辅助器具类目</p>
            </div>
          </button>

          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <FileText className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">创建目录</p>
              <p className="text-sm text-gray-500">制定新的采购目录</p>
            </div>
          </button>

          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <MessageSquare className="h-8 w-8 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">处理反馈</p>
              <p className="text-sm text-gray-500">回复用户反馈和投诉</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}