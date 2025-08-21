
import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, User, Lock, Bell, Database } from 'lucide-react';

const Settings = () => {
  return (
    <DashboardLayout activeTab="settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="User" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@leadhub.com" />
                </div>
                
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Lead Distributor Hub" />
                </div>
                
                <Button className="btn-primary">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <Button className="btn-primary">Update Password</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Lead Distribution Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="maxLeadsPerAgent">Maximum Leads per Agent</Label>
                  <Input id="maxLeadsPerAgent" type="number" defaultValue="100" />
                  <p className="text-sm text-gray-500 mt-1">Set the maximum number of leads that can be assigned to a single agent</p>
                </div>
                
                <div>
                  <Label htmlFor="distributionMethod">Distribution Method</Label>
                  <select className="input-field">
                    <option value="equal">Equal Distribution</option>
                    <option value="performance">Performance Based</option>
                    <option value="random">Random Distribution</option>
                  </select>
                </div>
                
                <Button className="btn-primary">Save Settings</Button>
              </div>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Lead Uploads</p>
                    <p className="text-sm text-gray-500">Notify when new leads are uploaded</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Agent Performance</p>
                    <p className="text-sm text-gray-500">Weekly performance reports</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <SettingsIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">System Info</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Agents:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Leads:</span>
                  <span className="font-medium">1,247</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
