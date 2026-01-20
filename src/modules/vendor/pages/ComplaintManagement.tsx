import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, MessageSquare, AlertTriangle, Calendar, Tag, Plus, ExternalLink, Package, Megaphone } from 'lucide-react';
import { Complaint } from '../types';

// 扩展Complaint类型，添加产品状态
interface ComplaintWithProductStatus extends Complaint {
  productStatus?: '公示中' | '已挂网';
}

export default function ComplaintManagement() {
  const [complaints, setComplaints] = useState<ComplaintWithProductStatus[]>([
    {
      id: 'C001',
      productId: 'P001',
      productName: '智能防跌倒监测系统',
      productStatus: '已挂网',
      complainant: '张三',
      complaintType: '产品质量',
      description: '产品在使用的过程中出现数据不准确的情况，希望能够改进产品质量。',
      status: 'pending',
      createdAt: '2023-12-01'
    },
    {
      id: 'C002',
      productId: 'P002',
      productName: '电子血压计',
      productStatus: '公示中',
      complainant: '李四',
      complaintType: '售后服务',
      description: '购买后没有收到使用说明书，打电话咨询也没有得到及时回复。',
      status: 'processing',
      createdAt: '2023-11-28',
      response: '正在处理您的问题，我们会在24小时内联系您。'
    },
    {
      id: 'C003',
      productId: 'P003',
      productName: '手动轮椅',
      productStatus: '已挂网',
      complainant: '王五',
      complaintType: '产品质量',
      description: '轮椅的折叠机构存在松动，使用起来有安全隐患。',
      status: 'pending',
      createdAt: '2023-12-03'
    },
    {
      id: 'C004',
      productId: 'P004',
      productName: '智能手环',
      productStatus: '公示中',
      complainant: '赵六',
      complaintType: '配送问题',
      description: '订单显示已发货但一周了还没有收到货物，物流信息也没有更新。',
      status: 'resolved',
      createdAt: '2023-11-25',
      response: '经核实，物流出现延误，已重新安排发货，预计3天内送达。'
    },
    {
      id: 'C005',
      productId: 'P005',
      productName: '医用血糖仪',
      productStatus: '已挂网',
      complainant: '孙七',
      complaintType: '产品质量',
      description: '血糖仪测量结果与医院检测结果差距较大，怀疑产品精度有问题。',
      status: 'processing',
      createdAt: '2023-12-05',
      response: '已安排技术人员进行检测，请将产品寄回指定地址。'
    },
    {
      id: 'C006',
      productId: 'P006',
      productName: '老人助行器',
      productStatus: '已挂网',
      complainant: '周八',
      complaintType: '售后服务',
      description: '产品保修期内出现问题，申请维修但迟迟没有回应。',
      status: 'pending',
      createdAt: '2023-12-07'
    },
    {
      id: 'C007',
      productId: 'P007',
      productName: '智能血压计',
      productStatus: '已挂网',
      complainant: '吴九',
      complaintType: '产品质量',
      description: '蓝牙连接不稳定，经常断开连接导致数据丢失。',
      status: 'resolved',
      createdAt: '2023-11-20',
      response: '已确认为固件问题，请更新至最新版本固件，问题已解决。'
    },
    {
      id: 'C008',
      productId: 'P008',
      productName: '防褥疮气垫床',
      productStatus: '公示中',
      complainant: '郑十',
      complaintType: '配送问题',
      description: '收到的产品外包装破损，担心内部产品受损。',
      status: 'pending',
      createdAt: '2023-12-09'
    },
    {
      id: 'C009',
      productId: 'P009',
      productName: '制氧机',
      productStatus: '已挂网',
      complainant: '钱十一',
      complaintType: '售后服务',
      description: '机器运行时噪音过大，超过产品标注的噪音标准。',
      status: 'processing',
      createdAt: '2023-12-10',
      response: '请提供产品序列号和购买凭证，我们将安排上门检测。'
    },
    {
      id: 'C010',
      productId: 'P010',
      productName: '康复训练床',
      productStatus: '已挂网',
      complainant: '冯十二',
      complaintType: '产品质量',
      description: '电动调节功能失灵，按钮按下后没有反应。',
      status: 'pending',
      createdAt: '2023-12-11'
    },
    {
      id: 'C011',
      productId: 'P011',
      productName: '老年人GPS定位器',
      productStatus: '已挂网',
      complainant: '陈十三',
      complaintType: '产品质量',
      description: '室内定位精度很差，经常显示错误位置。',
      status: 'resolved',
      createdAt: '2023-11-22',
      response: '已确认为信号问题，建议在空旷区域使用，室内可开启WiFi辅助定位。'
    },
    {
      id: 'C012',
      productId: 'P012',
      productName: '护理床垫',
      productStatus: '公示中',
      complainant: '杨十四',
      complaintType: '其他',
      description: '床垫尺寸与描述不符，实际比标注的小了5厘米。',
      status: 'pending',
      createdAt: '2023-12-12'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintWithProductStatus | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    productId: '',
    productName: '',
    complainant: '',
    complaintType: '产品质量',
    description: ''
  });

  // 模拟公示中和已挂网的产品数据
  const availableProducts = [
    { id: 'P001', name: '智能防跌倒监测系统', status: '公示中' },
    { id: 'P002', name: '电子血压计', status: '已挂网' },
    { id: 'P003', name: '手动轮椅', status: '已挂网' },
    { id: 'P004', name: '智能手环', status: '公示中' },
    { id: 'P005', name: '医用血糖仪', status: '公示中' }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesQuery = searchQuery === '' ||
                         complaint.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.complainant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = searchType === 'all' || complaint.complaintType === searchType;
    const matchesStatus = searchStatus === 'all' || complaint.status === searchStatus;

    return matchesQuery && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

  const handleReply = () => {
    if (selectedComplaint && replyContent.trim()) {
      setComplaints(complaints.map(complaint =>
        complaint.id === selectedComplaint.id
          ? { ...complaint, response: replyContent.trim(), status: 'resolved' }
          : complaint
      ));
      setShowReply(false);
      setReplyContent('');
      setSelectedComplaint(null);
    }
  };

  const handleCreateComplaint = () => {
    if (newComplaint.productId && newComplaint.complainant && newComplaint.description) {
      const selectedProduct = availableProducts.find(p => p.id === newComplaint.productId);
      const newId = `C${String(complaints.length + 1).padStart(3, '0')}`;

      const complaint: Complaint = {
        id: newId,
        productId: newComplaint.productId,
        productName: selectedProduct?.name || newComplaint.productName,
        complainant: newComplaint.complainant,
        complaintType: newComplaint.complaintType,
        description: newComplaint.description,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
      };

      setComplaints([...complaints, complaint]);
      setShowNewComplaint(false);
      setNewComplaint({
        productId: '',
        productName: '',
        complainant: '',
        complaintType: '产品质量',
        description: ''
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">申投诉管理</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          onClick={() => setShowNewComplaint(true)}
        >
          <Plus className="h-5 w-5" />
          <span>新建投诉</span>
        </button>
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
                placeholder="产品名称、投诉人或内容"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">投诉类型</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">全部类型</option>
              <option value="产品质量">产品质量</option>
              <option value="售后服务">售后服务</option>
              <option value="配送问题">配送问题</option>
              <option value="其他">其他</option>
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

      {/* Complaints Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">投诉编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">投诉人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">投诉类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">投诉时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentComplaints.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的投诉数据
                </td>
              </tr>
            ) : (
              currentComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {complaint.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{complaint.productName}</div>
                        {complaint.productStatus && (
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                            complaint.productStatus === '公示中' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {complaint.productStatus}
                          </span>
                        )}
                      </div>
                      {complaint.productStatus && (
                        <div className="relative group">
                          <button
                            className={`p-1 rounded hover:bg-gray-100 ${
                              complaint.productStatus === '公示中' 
                                ? 'text-blue-600 hover:text-blue-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            onClick={() => {
                              // 跳转到对应页面
                              if (complaint.productStatus === '公示中') {
                                alert(`跳转到公示公布页面，查看产品: ${complaint.productName}`);
                              } else {
                                alert(`跳转到产品管理页面，查看产品: ${complaint.productName}`);
                              }
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {complaint.productStatus === '公示中' ? '查看公示详情' : '查看产品详情'}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {complaint.complainant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {complaint.complaintType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {getStatusLabel(complaint.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {complaint.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <div className="relative group">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowDetail(true);
                          }}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          查看投诉详情
                        </span>
                      </div>
                      {complaint.status !== 'resolved' && (
                        <div className="relative group">
                          <button
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            onClick={() => {
                              setSelectedComplaint(complaint);
                              setReplyContent(complaint.response || '');
                              setShowReply(true);
                            }}
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            回复投诉
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredComplaints.length > itemsPerPage && (
          <div className="px-6 py-3 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              显示 {startIndex + 1} 至 {Math.min(endIndex, filteredComplaints.length)} 条，共 {filteredComplaints.length} 条
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                上一页
              </button>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
              </button>

              <div className="flex items-center ml-4">
                <span className="text-sm text-gray-500 mr-2">跳转到</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                />
                <span className="text-sm text-gray-500 ml-2">页</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">投诉详情</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedComplaint(null);
                  }}
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4">投诉信息</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">投诉编号</p>
                      <p className="font-medium">{selectedComplaint.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">产品名称</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{selectedComplaint.productName}</p>
                        {selectedComplaint.productStatus && (
                          <>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                              selectedComplaint.productStatus === '公示中' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {selectedComplaint.productStatus}
                            </span>
                            <button
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${
                                selectedComplaint.productStatus === '公示中' 
                                  ? 'border-blue-300 text-blue-600 hover:bg-blue-50' 
                                  : 'border-green-300 text-green-600 hover:bg-green-50'
                              }`}
                              onClick={() => {
                                if (selectedComplaint.productStatus === '公示中') {
                                  alert(`跳转到公示公布页面，查看产品: ${selectedComplaint.productName}`);
                                } else {
                                  alert(`跳转到产品管理页面，查看产品: ${selectedComplaint.productName}`);
                                }
                              }}
                            >
                              {selectedComplaint.productStatus === '公示中' ? (
                                <>
                                  <Megaphone className="h-3 w-3 mr-1" />
                                  查看公示
                                </>
                              ) : (
                                <>
                                  <Package className="h-3 w-3 mr-1" />
                                  查看产品
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">投诉人</p>
                      <p className="font-medium">{selectedComplaint.complainant}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">投诉类型</p>
                      <p className="font-medium">{selectedComplaint.complaintType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">处理状态</p>
                      <p className={`font-medium ${selectedComplaint.status === 'resolved' ? 'text-green-600' : selectedComplaint.status === 'processing' ? 'text-blue-600' : 'text-yellow-600'}`}>
                        {getStatusLabel(selectedComplaint.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">投诉时间</p>
                      <p className="font-medium">{selectedComplaint.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">投诉内容</h4>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="text-sm">{selectedComplaint.description}</p>
                  </div>

                  {selectedComplaint.response && (
                    <div>
                      <h4 className="font-semibold text-lg mb-4">回复内容</h4>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-sm">{selectedComplaint.response}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedComplaint(null);
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReply && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">回复投诉</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowReply(false);
                    setReplyContent('');
                    setSelectedComplaint(null);
                  }}
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">投诉内容</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm">{selectedComplaint.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">回复内容</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="请输入回复内容..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => {
                    setShowReply(false);
                    setReplyContent('');
                    setSelectedComplaint(null);
                  }}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={handleReply}
                  disabled={!replyContent.trim()}
                >
                  提交回复
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Complaint Modal */}
      {showNewComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">新建投诉</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowNewComplaint(false);
                    setNewComplaint({
                      productId: '',
                      productName: '',
                      complainant: '',
                      complaintType: '产品质量',
                      description: ''
                    });
                  }}
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    选择产品 <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newComplaint.productId}
                    onChange={(e) => {
                      const selectedProduct = availableProducts.find(p => p.id === e.target.value);
                      setNewComplaint({
                        ...newComplaint,
                        productId: e.target.value,
                        productName: selectedProduct?.name || ''
                      });
                    }}
                  >
                    <option value="">请选择产品</option>
                    {availableProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.status})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">可选择公示中的产品或已挂网的产品</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投诉人 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="请输入投诉人姓名"
                    value={newComplaint.complainant}
                    onChange={(e) => setNewComplaint({ ...newComplaint, complainant: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投诉类型 <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newComplaint.complaintType}
                    onChange={(e) => setNewComplaint({ ...newComplaint, complaintType: e.target.value })}
                  >
                    <option value="产品质量">产品质量</option>
                    <option value="售后服务">售后服务</option>
                    <option value="配送问题">配送问题</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投诉内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="请详细描述投诉内容..."
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => {
                    setShowNewComplaint(false);
                    setNewComplaint({
                      productId: '',
                      productName: '',
                      complainant: '',
                      complaintType: '产品质量',
                      description: ''
                    });
                  }}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={handleCreateComplaint}
                  disabled={!newComplaint.productId || !newComplaint.complainant || !newComplaint.description}
                >
                  提交投诉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}