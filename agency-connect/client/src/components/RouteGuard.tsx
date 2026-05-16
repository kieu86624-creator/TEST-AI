import { Navigate } from 'react-router-dom';import { useAuth } from '../context/AuthContext';
export function RouteGuard({children}:{children:React.ReactNode}){const {user,loading}=useAuth(); if(loading)return <div className="grid min-h-screen place-items-center bg-mist font-bold text-navy">Đang kiểm tra phiên đăng nhập...</div>; return user?children:<Navigate to="/login" replace/>}
