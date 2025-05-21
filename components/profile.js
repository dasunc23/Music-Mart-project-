import React, { useState } from 'react';
import { UserIcon, SettingsIcon, LogOutIcon, ShoppingBagIcon, HeartIcon } from 'lucide-react';
import { useAuth } from '../context/authContext';
import Button from './button';

const ProfileTab = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 text-left ${active
        ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700'
        : 'text-gray-700 hover:bg-gray-50'
        }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
};

const ProfileCard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="mb-4">
          <UserIcon className="h-16 w-16 mx-auto text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Not Logged In</h2>
        <p className="text-gray-600 mb-4">Please log in to view your profile</p>
        <Button variant="primary">Log In</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="md:flex">
        {/* Sidebar */}
        <div className="md:w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-indigo-600" />
                </div>
              )}
              <div className="ml-3">
                <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="py-4">
            <ProfileTab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<UserIcon className="h-5 w-5" />} label="My Profile" />
            <ProfileTab active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<ShoppingBagIcon className="h-5 w-5" />} label="Order History" />
            <ProfileTab active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} icon={<HeartIcon className="h-5 w-5" />} label="Wishlist" />
            <ProfileTab active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<SettingsIcon className="h-5 w-5" />} label="Account Settings" />
            <div className="px-4 mt-6">
              <Button variant="outline" fullWidth onClick={logout} className="flex items-center justify-center">
                <LogOutIcon className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Profile</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                  <p className="mt-1 text-lg text-gray-900">January 2023</p>
                </div>
                <div className="pt-4">
                  <Button>Edit Profile</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              <div className="text-center py-10">
                <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                <p className="text-gray-500 mb-4">When you place an order, it will appear here.</p>
                <Button variant="outline" onClick={() => (window.location.href = '/products')}>
                  Start Shopping
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
              <div className="text-center py-10">
                <HeartIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-4">Save items you're interested in for later.</p>
                <Button variant="outline" onClick={() => (window.location.href = '/products')}>
                  Browse Products
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Password</h3>
                  <Button>Change Password</Button>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-3">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order updates</h4>
                        <p className="text-sm text-gray-500">Receive notifications about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Promotions and deals</h4>
                        <p className="text-sm text-gray-500">Receive notifications about sales and special offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
