import { useState } from 'react';
import { Eye, Calendar, Clock, CheckCircle, AlertTriangle, Tag, DollarSign, XCircle, MessageSquare, Search } from 'lucide-react';
import { Disclosure } from '../types';

export default function PublicDisclosure() {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([
    {
      id: 'D001',
      productName: '智能防跌倒监测系统',
      category: '智慧监测类',
      price: 2999.00,
      specifications: '传感器精度: ±0.1°, 电池续航: 7天, 防水等级: IP67',
      objectionPeriod: {
        start: '2023-12-01',
        end: '2023-12-15'
      },
      status: 'active'
    },
    {
      id: 'D002',
      productName: '电子血压计',
      category: '医疗护理类',
      price: 299.00,
      specifications: '测量范围: 0-300mmHg, 精度: ±3mmHg, 电源: 4节AA电池',
      objectionPeriod: {
        start: '2023-11-15',
        end: '2023-11-29'
      },
      status: 'expired'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  const filteredDisclosures = disclosures.filter(disclosure => {
    const matchesQuery = searchQuery === '' ||
                         disclosure.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         disclosure.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = searchCategory === 'all' || disclosure.category === searchCategory;

    return matchesQuery && matchesCategory;
  });

  const isInObjectionPeriod = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    return today <= end;
  };

  const getDaysLeft = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">公示公布</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="产品名称或编号"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
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
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchCategory('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Disclosures List */}
      <div className="space-y-6">
        {filteredDisclosures.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            没有符合条件的公示数据
          </div>
        ) : (
          filteredDisclosures.map((disclosure) => (
            <div key={disclosure.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{disclosure.productName}</h3>
                  <p className="text-sm text-gray-500 mt-1">公示编号: {disclosure.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    disclosure.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {disclosure.status === 'active' ? '公示中' : '公示结束'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">分类</span>
                  </div>
                  <p className="text-gray-900">{disclosure.category}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">价格</span>
                  </div>
                  <p className="text-gray-900">¥{disclosure.price.toFixed(2)}</p>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">产品规格</span>
                  </div>
                  <p className="text-gray-900">{disclosure.specifications}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>公示期: {disclosure.objectionPeriod.start} 至 {disclosure.objectionPeriod.end}</span>
                    </div>

                    {disclosure.status === 'active' && isInObjectionPeriod(disclosure.objectionPeriod.end) && (
                      <div className="flex items-center text-sm">
                        {getDaysLeft(disclosure.objectionPeriod.end) > 0 ? (
                          <Clock className="h-4 w-4 text-orange-500 mr-1" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={getDaysLeft(disclosure.objectionPeriod.end) > 0 ? 'text-orange-600' : 'text-red-600'}>
                          还剩 {Math.max(0, getDaysLeft(disclosure.objectionPeriod.end))} 天
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                      查看详情
                    </button>
                    {disclosure.status === 'active' && isInObjectionPeriod(disclosure.objectionPeriod.end) && (
                      <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        提出异议
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}