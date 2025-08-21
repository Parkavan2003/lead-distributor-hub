import React, { useState } from 'react';
import ModernDashboardLayout from '../components/Layout/ModernDashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Mail, Phone, Eye, EyeOff, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface Agent {
  id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  leadsAssigned: number;
  leadsConverted: number;
  status: 'active' | 'inactive';
}

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      mobile: '+1 (555) 123-4567',
      createdAt: '2024-01-10',
      leadsAssigned: 45,
      leadsConverted: 12,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      mobile: '+1 (555) 234-5678',
      createdAt: '2024-01-08',
      leadsAssigned: 52,
      leadsConverted: 15,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      mobile: '+1 (555) 345-6789',
      createdAt: '2024-01-05',
      leadsAssigned: 38,
      leadsConverted: 8,
      status: 'active'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile || (!editingAgent && !formData.password)) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingAgent) {
      // Update existing agent
      setAgents(agents.map(agent => 
        agent.id === editingAgent.id 
          ? { ...agent, ...formData }
          : agent
      ));
      toast.success('Agent updated successfully');
    } else {
      // Create new agent
      const newAgent: Agent = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        createdAt: new Date().toISOString().split('T')[0],
        leadsAssigned: 0,
        leadsConverted: 0,
        status: 'active'
      };
      setAgents([...agents, newAgent]);
      toast.success('Agent created successfully');
    }

    // Reset form
    setFormData({ name: '', email: '', mobile: '', password: '' });
    setEditingAgent(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      password: ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (agentId: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter(agent => agent.id !== agentId));
      toast.success('Agent deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', mobile: '', password: '' });
    setEditingAgent(null);
    setShowPassword(false);
  };

  return (
    <ModernDashboardLayout activeTab="agents">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Agent Management</h2>
            <p className="text-muted-foreground mt-1">Manage your sales agents and their performance</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {editingAgent ? 'Edit Agent' : 'Add New Agent'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password {editingAgent ? '(leave blank to keep current)' : '*'}
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      required={!editingAgent}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {editingAgent ? 'Update Agent' : 'Create Agent'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-700">Total Agents</p>
                <p className="text-2xl font-bold text-blue-900">{agents.length}</p>
                <p className="text-sm text-blue-600">+2 this month</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-700">Active Agents</p>
                <p className="text-2xl font-bold text-green-900">
                  {agents.filter(a => a.status === 'active').length}
                </p>
                <p className="text-sm text-green-600">All active</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-700">Total Leads</p>
                <p className="text-2xl font-bold text-purple-900">
                  {agents.reduce((sum, agent) => sum + agent.leadsAssigned, 0)}
                </p>
                <p className="text-sm text-purple-600">Distributed</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Agents Table */}
        <Card className="overflow-hidden shadow-lg">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <h3 className="text-lg font-semibold text-gray-900">All Agents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents.map((agent, index) => (
                  <tr key={agent.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">Joined {agent.createdAt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{agent.email}</div>
                      <div className="text-sm text-gray-500">{agent.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{agent.leadsAssigned} leads assigned</div>
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600 font-medium">{agent.leadsConverted} converted</span> ({agent.leadsAssigned > 0 ? Math.round((agent.leadsConverted / agent.leadsAssigned) * 100) : 0}%)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        agent.status === 'active' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(agent)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(agent.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </ModernDashboardLayout>
  );
};

export default Agents;
