
import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Users, Upload, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: 'Total Agents',
      value: '12',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+2 this month'
    },
    {
      title: 'Leads Uploaded',
      value: '1,247',
      icon: Upload,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+156 this week'
    },
    {
      title: 'Active Campaigns',
      value: '8',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '3 pending'
    },
    {
      title: 'Conversion Rate',
      value: '23.4%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+2.1% vs last month'
    }
  ];

  const recentUploads = [
    {
      id: 1,
      filename: 'leads_january_2024.csv',
      uploadedAt: '2024-01-15 10:30 AM',
      status: 'completed',
      totalLeads: 250,
      distributedTo: 5
    },
    {
      id: 2,
      filename: 'prospects_december.xlsx',
      uploadedAt: '2024-01-14 2:45 PM',
      status: 'completed',
      totalLeads: 180,
      distributedTo: 5
    },
    {
      id: 3,
      filename: 'new_leads_batch.csv',
      uploadedAt: '2024-01-14 9:15 AM',
      status: 'processing',
      totalLeads: 320,
      distributedTo: 0
    }
  ];

  const agentPerformance = [
    { name: 'John Smith', leads: 45, converted: 12, rate: '26.7%' },
    { name: 'Sarah Johnson', leads: 52, converted: 15, rate: '28.8%' },
    { name: 'Mike Wilson', leads: 38, converted: 8, rate: '21.1%' },
    { name: 'Lisa Brown', leads: 41, converted: 11, rate: '26.8%' },
    { name: 'David Lee', leads: 47, converted: 13, rate: '27.7%' }
  ];

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Uploads */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
                <a href="/upload" className="text-primary hover:text-primary-hover text-sm font-medium">
                  Upload New →
                </a>
              </div>
              <div className="space-y-4">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        upload.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {upload.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{upload.filename}</p>
                        <p className="text-sm text-gray-500">{upload.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{upload.totalLeads} leads</p>
                      <p className="text-sm text-gray-500">
                        {upload.status === 'completed' 
                          ? `Distributed to ${upload.distributedTo} agents`
                          : 'Processing...'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Agent Performance */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
                <a href="/agents" className="text-primary hover:text-primary-hover text-sm font-medium">
                  View All →
                </a>
              </div>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.leads} leads</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{agent.rate}</p>
                      <p className="text-sm text-gray-500">{agent.converted} converted</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
