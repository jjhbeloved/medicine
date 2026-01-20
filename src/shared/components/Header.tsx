import { Bell, User } from 'lucide-react';
import { UserType } from '../types';

interface HeaderProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export default function Header({ userType, setUserType }: HeaderProps) {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">长护险辅助器具采购平台</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-5 w-5 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">{userType}</span>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
              className="bg-blue-600 border border-blue-500 rounded px-2 py-1 text-sm"
            >
              <option value="经办机构">经办机构</option>
              <option value="生产/代理企业">生产/代理企业</option>
              <option value="长护机构">长护机构</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}