// 长护机构模块的类型定义
export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  specifications: string;
  supplier: string;
  status: 'available' | 'unavailable';
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery?: string;
  trackingNumber?: string;
}

export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  type: 'suggestion' | 'complaint' | 'question';
  status: 'pending' | 'processing' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  submitter: string;
  submitTime: string;
  contactInfo: string;
}