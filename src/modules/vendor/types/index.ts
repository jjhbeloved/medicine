// 生产/代理企业模块的类型定义
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  description: string;
  createdAt: string;
  specifications?: string;
  images?: string[];
}

export interface Complaint {
  id: string;
  productId: string;
  productName: string;
  complainant: string;
  complaintType: string;
  description: string;
  status: 'pending' | 'processing' | 'resolved';
  createdAt: string;
  response?: string;
}

export interface Disclosure {
  id: string;
  productName: string;
  category: string;
  price: number;
  specifications: string;
  objectionPeriod: {
    start: string;
    end: string;
  };
  status: 'active' | 'expired';
}