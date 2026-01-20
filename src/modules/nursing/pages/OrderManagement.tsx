import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Package, DollarSign, Calendar } from 'lucide-react';
import { Order } from '../types';

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD202312001',
      productId: 'P001',
      productName: '智能防跌倒监测系统',
      quantity: 5,
      unitPrice: 2999.00,
      totalPrice: 14995.00,
      status: 'pending',
      orderDate: '2023-12-01',
      expectedDelivery: '2023-12-10'
    },
    {
      id: 'ORD202311028',
      productId: 'P002',
      productName: '电子血压计',
      quantity: 10,
      unitPrice: 299.00,
      totalPrice: 2990.00,
      status: 'confirmed',
      orderDate: '2023-11-28',
      expectedDelivery: '2023-12-05',
      trackingNumber: 'SF123456789'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesQuery = searchQuery === '' ||
                         order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = searchStatus === 'all' || order.status === searchStatus;

    return matchesQuery && matchesStatus;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '待确认';
      case 'confirmed': return '已确认';
      case 'shipped': return '已发货';
      case 'delivered': return '已交付';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">订单管理</h2>
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
                placeholder="订单号或产品名称"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">订单状态</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="all">全部状态</option>
              <option value="pending">待确认</option>
              <option value="confirmed">已确认</option>
              <option value="shipped">已发货</option>
              <option value="delivered">已交付</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={() => {
              setSearchQuery('');
              setSearchStatus('all');
            }}
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">单价</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总价</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">下单时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  没有符合条件的订单数据
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ¥{order.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ¥{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="查看详情"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {order.status === 'pending' && (
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="确认订单"
                        >
                          <CheckCircle className="h-5 w-5" />
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