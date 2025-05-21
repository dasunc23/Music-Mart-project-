import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ProfileCard from '../components/productCard';

const Profile = () => {
  const { isAuthenticated } = useAuth();

  // In a real app, you might redirect to login if not authenticated
  // For demo purposes, we'll show the profile page with a "not logged in" state

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        <div className="max-w-4xl mx-auto">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
