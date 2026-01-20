import { useState } from 'react';
import { Search, Eye, MessageSquare, Calendar, Clock, AlertTriangle, Tag } from 'lucide-react';
import { FeedbackItem } from '../types';

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 'FB001',
      title: '产品质量改进建议',
      content: '建议在辅助器具的设计中更加注重老年人的使用便捷性，特别是对于行动不便的老年人。',
      type: 'suggestion',
      status: 'pending',
      priority: 'high',
      submitter: '王医生',
      submitTime: '2023-12-01 10:30',
      contactInfo: 'wang@example.com'
    },
    {
      id: 'FB002',
      title: '配送服务反馈',
      content: '最近几次配送服务存在延迟现象，希望能够改善配送效率，提升服务质量。',
      type: 'complaint',
      status: 'processing',
      priority: 'medium',
      submitter: '李护士',
      submitTime: '2023-11-28 14:20',
      contactInfo: 'li@example.com'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesQuery = searchQuery === '' ||
                         feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.submitter.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = searchType === 'all' || feedback.type === searchType;
    const matchesStatus = searchStatus === 'all' || feedback.status === searchStatus;

    return matchesQuery && matchesType && matchesStatus;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'suggestion': return '建议';
      case 'complaint': return '投诉';
      case 'question': return '咨询';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'question': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'processing': return '处理中';
      case 'resolved': return '已解决';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return '低';
      case 'medium': return '中';
      case 'high': return '高';
      default: return priority;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">需求反馈</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="标题、内容或提交人"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">反馈类型</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">全部类型</option>
              <option value="suggestion">建议</option>
              <option value="complaint">投诉</option>
              <option value="question">咨询</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">处理状态</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="all">全部状态</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="resolved">已解决</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchType('all');
              setSearchStatus('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Feedbacks Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">反馈编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">优先级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的反馈数据
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feedback.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={feedback.title}>
                      {feedback.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                      {getTypeLabel(feedback.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                      {getPriorityLabel(feedback.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                      {getStatusLabel(feedback.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.submitter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {feedback.submitTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="查看详情"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {feedback.status !== 'resolved' && (
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="提交反馈"
                        >
                          <MessageSquare className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}