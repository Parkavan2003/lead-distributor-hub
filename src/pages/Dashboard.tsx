
import React from 'react';
import ModernDashboardLayout from '../components/Layout/ModernDashboardLayout';
import { Card } from '@/components/ui/card';
import { Users, Upload, FileText, TrendingUp, Clock, CheckCircle, ArrowUp, Activity } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: 'Total Agents',
      value: '12',
      icon: Users,
      change: '+2 this month',
      trend: 'up',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Leads Uploaded',
      value: '1,247',
      icon: Upload,
      change: '+156 this week',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Active Campaigns',
      value: '8',
      icon: FileText,
      change: '3 pending',
      trend: 'neutral',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Conversion Rate',
      value: '23.4%',
      icon: TrendingUp,
      change: '+2.1% vs last month',
      trend: 'up',
      gradient: 'from-orange-500 to-red-500'
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
    <ModernDashboardLayout activeTab="dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h1>
          <p className="text-lg text-gray-600">Here's what's happening with your lead distribution today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center text-sm">
                      {stat.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500 mr-1" />}
                      <span className={`font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Uploads */}
          <div className="xl:col-span-2">
            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Uploads</h3>
                  <p className="text-sm text-gray-500 mt-1">Latest lead files processed</p>
                </div>
                <a 
                  href="/upload" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </a>
              </div>
              <div className="space-y-4">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full shadow-sm ${
                        upload.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {upload.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{upload.filename}</p>
                        <p className="text-sm text-gray-500">{upload.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{upload.totalLeads} leads</p>
                      <p className="text-sm text-gray-500">
                        {upload.status === 'completed' 
                          ? `→ ${upload.distributedTo} agents`
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
            <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
                  <p className="text-sm text-gray-500 mt-1">Best conversion rates</p>
                </div>
                <a 
                  href="/agents" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All 
                  <ArrowUp className="w-4 h-4 ml-1 rotate-45" />
                </a>
              </div>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-yellow-800">★</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{agent.name}</p>
                        <p className="text-xs text-gray-500">{agent.leads} leads</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-sm">{agent.rate}</p>
                      <p className="text-xs text-gray-500">{agent.converted} converted</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
};

export default Dashboard;
