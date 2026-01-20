import { useState } from 'react';
import { Eye, Calendar, Clock, CheckCircle, AlertTriangle, Tag, DollarSign, XCircle, MessageSquare, Search, X } from 'lucide-react';

interface Objection {
  id: string;
  complainant: string;
  content: string;
  createdAt: string;
}

interface DisclosureItem {
  id: string;
  productName: string;
  category: string;
  price: number;
  specifications: string;
  supplier: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  submittedAt: string;
  publishedAt?: string;
  objectionPeriod?: {
    start: string;
    end: string;
  };
  objections?: Objection[];
  description: string;
}

export default function PublicDisclosure() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [disclosures, setDisclosures] = useState<DisclosureItem[]>([
    {
      id: 'D001',
      productName: '智能防跌倒监测系统',
      category: '智慧监测类',
      price: 2999.00,
      specifications: '传感器精度: ±0.1°, 电池续航: 7天, 防水等级: IP67',
      supplier: '科技有限公司A',
      status: 'pending',
      submittedAt: '2023-12-01',
      description: '基于AI技术的防跌倒监测系统，能够实时监测用户状态，预防跌倒风险。'
    },
    {
      id: 'D002',
      productName: '电子血压计',
      category: '医疗护理类',
      price: 299.00,
      specifications: '测量范围: 0-300mmHg, 精度: ±3mmHg, 电源: 4节AA电池',
      supplier: '医疗器械公司B',
      status: 'active',
      submittedAt: '2023-11-28',
      publishedAt: '2023-11-30',
      objectionPeriod: { start: '2023-11-30', end: '2023-12-14' },
      objections: [
        { id: 'OBJ001', complainant: '张三', content: '价格过高，超出市场平均水平', createdAt: '2023-12-02' },
        { id: 'OBJ002', complainant: '李四', content: '产品精度与宣传不符', createdAt: '2023-12-03' }
      ],
      description: '数字显示电子血压计，测量准确，操作简便，适用于家庭和医疗机构使用。'
    },
    {
      id: 'D003',
      productName: '手动轮椅',
      category: '康复训练类',
      price: 1200.00,
      specifications: '材质: 航空铝合金, 承重: 120kg, 折叠尺寸: 90x40x30cm',
      supplier: '康复设备公司C',
      status: 'completed',
      submittedAt: '2023-11-25',
      publishedAt: '2023-11-27',
      objectionPeriod: { start: '2023-11-27', end: '2023-12-11' },
      objections: [
        { id: 'OBJ003', complainant: '王五', content: '折叠功能不稳定', createdAt: '2023-11-28' },
        { id: 'OBJ004', complainant: '赵六', content: '材质质量有疑虑', createdAt: '2023-11-29' }
      ],
      description: '适用于行动不便者使用的轻便手动轮椅，具有折叠功能，便于携带和存放。'
    },
    {
      id: 'D004',
      productName: '智能手环',
      category: '智慧监测类',
      price: 899.00,
      specifications: '心率监测、睡眠分析、跌倒检测、续航7天',
      supplier: '智能科技公司D',
      status: 'cancelled',
      submittedAt: '2023-12-02',
      publishedAt: '2023-12-03',
      description: '多功能智能手环，专为老年人设计，具有健康监测和紧急报警功能。'
    },
    {
      id: 'D005',
      productName: '医用血糖仪',
      category: '医疗护理类',
      price: 450.00,
      specifications: '测量范围: 1.1-33.3mmol/L, 精度: ±10%, 试纸盒装',
      supplier: '医疗器械公司E',
      status: 'completed',
      submittedAt: '2023-12-03',
      publishedAt: '2023-12-04',
      objectionPeriod: { start: '2023-12-04', end: '2023-12-18' },
      objections: [
        { id: 'OBJ005', complainant: '孙七', content: '试纸过期问题', createdAt: '2023-12-05' },
        { id: 'OBJ006', complainant: '周八', content: '测量结果不准', createdAt: '2023-12-06' },
        { id: 'OBJ007', complainant: '吴九', content: '售后服务差', createdAt: '2023-12-07' }
      ],
      description: '专业医用血糖仪，快速准确，适合糖尿病患者日常监测。'
    },
    {
      id: 'D006',
      productName: '老人助行器',
      category: '康复训练类',
      price: 680.00,
      specifications: '材质: 铝合金, 承重: 150kg, 可折叠, 带座椅',
      supplier: '康复设备公司F',
      status: 'completed',
      submittedAt: '2023-12-05',
      publishedAt: '2023-12-06',
      objectionPeriod: { start: '2023-12-06', end: '2023-12-20' },
      objections: [
        { id: 'OBJ008', complainant: '郑十', content: '座椅舒适度不够', createdAt: '2023-12-08' }
      ],
      description: '轻便耐用的老人助行器，具有座椅功能，方便老年人休息。'
    },
    {
      id: 'D007',
      productName: '智能血压计',
      category: '医疗护理类',
      price: 380.00,
      specifications: '蓝牙连接, 心率监测, 自动充气, 语音播报',
      supplier: '医疗器械公司G',
      status: 'completed',
      submittedAt: '2023-12-06',
      publishedAt: '2023-12-07',
      objectionPeriod: { start: '2023-12-07', end: '2023-12-21' },
      description: '智能语音血压计，具有数据上传功能，方便医生查看。'
    },
    {
      id: 'D008',
      productName: '防褥疮气垫床',
      category: '生活护理类',
      price: 2500.00,
      specifications: '尺寸: 200x90cm, 气囊数量: 18个, 自动调节, 防水面料',
      supplier: '护理设备公司H',
      status: 'active',
      submittedAt: '2023-12-08',
      publishedAt: '2023-12-09',
      objectionPeriod: { start: '2023-12-09', end: '2023-12-23' },
      objections: [
        { id: 'OBJ009', complainant: '钱十一', content: '气囊易漏气', createdAt: '2023-12-10' }
      ],
      description: '专业防褥疮气垫床，有效预防和治疗褥疮，适合长期卧床患者。'
    },
    {
      id: 'D009',
      productName: '制氧机',
      category: '医疗护理类',
      price: 3200.00,
      specifications: '氧气浓度: 90%-96%, 流量: 1-5L/min, 噪音: ≤45dB',
      supplier: '医疗器械公司I',
      status: 'pending',
      submittedAt: '2023-12-10',
      description: '家用医疗制氧机，适合老年人及呼吸系统疾病患者使用。'
    },
    {
      id: 'D010',
      productName: '康复训练床',
      category: '康复训练类',
      price: 8500.00,
      specifications: '尺寸: 220x100cm, 电动调节, 承重: 200kg, 带护栏',
      supplier: '康复设备公司J',
      status: 'completed',
      submittedAt: '2023-11-20',
      publishedAt: '2023-11-22',
      objectionPeriod: { start: '2023-11-22', end: '2023-12-06' },
      description: '多功能电动康复训练床，支持多角度调节，适用于术后康复训练。'
    },
    {
      id: 'D011',
      productName: '老年人GPS定位器',
      category: '智慧监测类',
      price: 299.00,
      specifications: 'GPS+北斗双模定位, 续航7天, 一键SOS',
      supplier: '智能科技公司K',
      status: 'completed',
      submittedAt: '2023-11-18',
      publishedAt: '2023-11-20',
      objectionPeriod: { start: '2023-11-20', end: '2023-12-04' },
      objections: [
        { id: 'OBJ010', complainant: '冯十二', content: '室内定位不准', createdAt: '2023-11-22' },
        { id: 'OBJ011', complainant: '陈十三', content: '电池续航不达标', createdAt: '2023-11-23' }
      ],
      description: '专为老年人设计的GPS定位设备，支持实时位置追踪和紧急求助。'
    },
    {
      id: 'D012',
      productName: '护理床垫',
      category: '生活护理类',
      price: 1200.00,
      specifications: '材质: 高密度海绵, 尺寸: 200x90x10cm, 防水透气',
      supplier: '护理设备公司L',
      status: 'cancelled',
      submittedAt: '2023-11-15',
      publishedAt: '2023-11-17',
      description: '专业护理床垫，具有防水透气功能，适合长期卧床者使用。'
    }
  ]);

  const [selectedDisclosure, setSelectedDisclosure] = useState<DisclosureItem | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showObjectionSelect, setShowObjectionSelect] = useState(false);
  const [selectedObjections, setSelectedObjections] = useState<Objection[]>([]);

  const getFilteredDisclosures = () => {
    return disclosures.filter(disclosure => {
      const matchesQuery = searchQuery === '' ||
                           disclosure.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           disclosure.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           disclosure.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = searchCategory === 'all' || disclosure.category === searchCategory;

      let matchesStatus = true;
      if (activeTab === 'pending') {
        // 未完成包括待公示和公示中
        matchesStatus = disclosure.status === 'pending' || disclosure.status === 'active';
      } else if (activeTab === 'completed') {
        matchesStatus = disclosure.status === 'completed' || disclosure.status === 'cancelled';
      }

      if (searchStatus !== 'all') {
        matchesStatus = matchesStatus && disclosure.status === searchStatus;
      }

      return matchesQuery && matchesCategory && matchesStatus;
    });
  };

  const handleCancelDisclosure = () => {
    if (selectedDisclosure && cancelReason.trim()) {
      setDisclosures(disclosures.map(disclosure =>
        disclosure.id === selectedDisclosure.id
          ? { ...disclosure, status: 'cancelled' }
          : disclosure
      ));
      setShowCancelModal(false);
      setCancelReason('');
      setSelectedDisclosure(null);
    }
  };

  const isInObjectionPeriod = (endDate?: string) => {
    if (!endDate) return false;
    const today = new Date();
    const end = new Date(endDate);
    return today <= end;
  };

  const getDaysLeft = (endDate?: string) => {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '待公示';
      case 'active': return '公示中';
      case 'completed': return '已挂完';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDisclosures = getFilteredDisclosures();

  // Pagination
  const totalPages = Math.ceil(filteredDisclosures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDisclosures = filteredDisclosures.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">公示公布</h2>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'pending', label: '未完成', count: disclosures.filter(d => d.status === 'pending' || d.status === 'active').length },
              { id: 'completed', label: '已完成', count: disclosures.filter(d => d.status === 'completed' || d.status === 'cancelled').length }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
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
                placeholder="产品名称、供应商或编号"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品分类</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="all">全部分类</option>
              <option value="生活护理类">生活护理类</option>
              <option value="康复训练类">康复训练类</option>
              <option value="医疗护理类">医疗护理类</option>
              <option value="智慧监测类">智慧监测类</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公示状态</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="all">全部状态</option>
              {activeTab === 'pending' ? (
                <>
                  <option value="pending">待公示</option>
                  <option value="active">公示中</option>
                </>
              ) : (
                <>
                  <option value="completed">已挂完</option>
                  <option value="cancelled">已取消</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchCategory('all');
              setSearchStatus('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Disclosures Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品信息</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">供应商</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">公示状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">公示时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">异议</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDisclosures.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的公示数据
                </td>
              </tr>
            ) : (
              currentDisclosures.map((disclosure) => (
                <tr key={disclosure.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{disclosure.productName}</div>
                        <div className="text-sm text-gray-500">{disclosure.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {disclosure.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ¥{disclosure.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(disclosure.status)}`}>
                      {getStatusLabel(disclosure.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {disclosure.publishedAt || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {disclosure.objections && disclosure.objections.length > 0 ? (
                      <button
                        className="text-orange-600 hover:text-orange-900 underline font-medium"
                        onClick={() => {
                          setSelectedDisclosure(disclosure);
                          setSelectedObjections(disclosure.objections || []);
                          setShowObjectionSelect(true);
                        }}
                      >
                        {disclosure.objections.length} 条
                      </button>
                    ) : (
                      <span className="text-gray-400">0 条</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedDisclosure(disclosure);
                          setShowDetail(true);
                        }}
                        title="查看详情"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {activeTab === 'pending' && disclosure.status === 'active' && (
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setSelectedDisclosure(disclosure);
                            setShowCancelModal(true);
                          }}
                          title="取消公示"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredDisclosures.length > itemsPerPage && (
          <div className="px-6 py-3 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              显示 {startIndex + 1} 至 {Math.min(endIndex, filteredDisclosures.length)} 条，共 {filteredDisclosures.length} 条
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                上一页
              </button>

              {/* Page numbers */}
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

              {/* Jump to page */}
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
      {showDetail && selectedDisclosure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">公示详情</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedDisclosure(null);
                  }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4">基本信息</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">公示编号</p>
                      <p className="font-medium">{selectedDisclosure.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">产品名称</p>
                      <p className="font-medium">{selectedDisclosure.productName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">产品分类</p>
                      <p className="font-medium">{selectedDisclosure.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">供应商</p>
                      <p className="font-medium">{selectedDisclosure.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">价格</p>
                      <p className="font-medium">¥{selectedDisclosure.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">公示状态</p>
                      <p className={`font-medium ${selectedDisclosure.status === 'completed' ? 'text-green-600' : selectedDisclosure.status === 'cancelled' ? 'text-red-600' : 'text-blue-600'}`}>
                        {getStatusLabel(selectedDisclosure.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">提交时间</p>
                      <p className="font-medium">{selectedDisclosure.submittedAt}</p>
                    </div>
                    {selectedDisclosure.publishedAt && (
                      <div>
                        <p className="text-sm text-gray-500">公示时间</p>
                        <p className="font-medium">{selectedDisclosure.publishedAt}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">产品规格</h4>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="text-sm">{selectedDisclosure.specifications}</p>
                  </div>

                  <h4 className="font-semibold text-lg mb-4">产品描述</h4>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="text-sm">{selectedDisclosure.description}</p>
                  </div>

                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedDisclosure(null);
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Objection Select Modal */}
      {showObjectionSelect && selectedDisclosure && selectedObjections.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">异议列表 - {selectedDisclosure.productName}</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowObjectionSelect(false);
                    setSelectedObjections([]);
                  }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-4">共 {selectedObjections.length} 条异议，点击可跳转到申投诉页面查看详情</p>

              <div className="space-y-3">
                {selectedObjections.map((objection, index) => (
                  <div
                    key={objection.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      // 这里可以跳转到申投诉页面，或者跳转到对应的投诉详情
                      console.log(`跳转到异议 ${objection.id} 详情`);
                      // 实际实现时可以使用 setActiveTab 或路由跳转
                      alert(`跳转到申投诉页面查看：${objection.content}`);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-900">异议 {index + 1}</span>
                      <span className="text-xs text-gray-500">{objection.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{objection.content}</p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>投诉人：{objection.complainant}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    setShowObjectionSelect(false);
                    setSelectedObjections([]);
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedDisclosure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">取消公示</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason('');
                    setSelectedDisclosure(null);
                  }}
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">产品信息</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">{selectedDisclosure.productName}</p>
                  <p className="text-sm text-gray-600">{selectedDisclosure.supplier}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  取消原因 <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="请输入取消公示的原因..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason('');
                    setSelectedDisclosure(null);
                  }}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={handleCancelDisclosure}
                  disabled={!cancelReason.trim()}
                >
                  确认取消公示
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}