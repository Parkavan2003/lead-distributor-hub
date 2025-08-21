
import React, { useState, useCallback } from 'react';
import ModernDashboardLayout from '../components/Layout/ModernDashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Users, CheckCircle2, AlertCircle, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface LeadData {
  firstName: string;
  phone: string;
  notes: string;
}

interface DistributedLead extends LeadData {
  id: string;
  agentId: string;
  agentName: string;
  uploadDate: string;
}

interface UploadHistory {
  id: string;
  filename: string;
  uploadDate: string;
  totalLeads: number;
  status: 'completed' | 'processing' | 'error';
}

const UploadLeads = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [distributedLeads, setDistributedLeads] = useState<DistributedLead[]>([]);
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>([
    {
      id: '1',
      filename: 'leads_january_2024.csv',
      uploadDate: '2024-01-15',
      totalLeads: 250,
      status: 'completed'
    },
    {
      id: '2',
      filename: 'prospects_december.xlsx',
      uploadDate: '2024-01-14',
      totalLeads: 180,
      status: 'completed'
    }
  ]);

  // Mock agents for distribution
  const agents = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Wilson' },
    { id: '4', name: 'Lisa Brown' },
    { id: '5', name: 'David Lee' }
  ];

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload only CSV, XLS, or XLSX files');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      toast.success('File selected successfully');
    }
  }, []);

  const distributeLeads = (leads: LeadData[]): DistributedLead[] => {
    const distributed: DistributedLead[] = [];
    const leadsPerAgent = Math.floor(leads.length / agents.length);
    const remainder = leads.length % agents.length;

    let currentIndex = 0;

    agents.forEach((agent, agentIndex) => {
      const leadsForThisAgent = leadsPerAgent + (agentIndex < remainder ? 1 : 0);
      
      for (let i = 0; i < leadsForThisAgent; i++) {
        const lead = leads[currentIndex];
        if (lead) {
          distributed.push({
            ...lead,
            id: `lead_${currentIndex}_${Date.now()}`,
            agentId: agent.id,
            agentName: agent.name,
            uploadDate: new Date().toISOString().split('T')[0]
          });
        }
        currentIndex++;
      }
    });

    return distributed;
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    if (agents.length === 0) {
      toast.error('No agents available for distribution');
      return;
    }

    setUploading(true);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock CSV parsing - in real app, use csv-parser or xlsx
      const mockLeads: LeadData[] = Array.from({ length: 25 }, (_, i) => ({
        firstName: `Lead ${i + 1}`,
        phone: `+1555${String(i + 1).padStart(4, '0')}`,
        notes: `Notes for lead ${i + 1}`
      }));

      // Distribute leads among agents
      const distributed = distributeLeads(mockLeads);
      setDistributedLeads(prev => [...prev, ...distributed]);

      // Add to upload history
      const newUpload: UploadHistory = {
        id: Date.now().toString(),
        filename: selectedFile.name,
        uploadDate: new Date().toISOString().split('T')[0],
        totalLeads: mockLeads.length,
        status: 'completed'
      };
      setUploadHistory(prev => [newUpload, ...prev]);

      toast.success(`Successfully uploaded and distributed ${mockLeads.length} leads to ${agents.length} agents`);
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      toast.error('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const getAgentLeadCount = (agentId: string) => {
    return distributedLeads.filter(lead => lead.agentId === agentId).length;
  };

  return (
    <ModernDashboardLayout activeTab="upload">
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload & Distribute Leads</h1>
          <p className="text-lg text-gray-600">Upload CSV/Excel files and automatically distribute leads to agents</p>
        </div>

        {/* Upload Section */}
        <Card className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upload Lead File</h2>
            
            {/* Drag & Drop Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600">File selected</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">
                    Drop your CSV/Excel file here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: .csv, .xlsx, .xls (Max 10MB)
                  </p>
                </div>
              )}
              
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* File Requirements */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800">File Requirements</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Your file should contain columns: <strong>FirstName</strong>, <strong>Phone</strong>, and <strong>Notes</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Distribute
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Distribution Overview */}
        {distributedLeads.length > 0 && (
          <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Distribution Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {agents.map((agent) => {
                const leadCount = getAgentLeadCount(agent.id);
                return (
                  <div key={agent.id} className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{agent.name}</p>
                        <p className="text-lg font-bold text-blue-600">{leadCount} leads</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Upload History */}
        <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <h3 className="text-xl font-bold text-gray-900">Upload History</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {uploadHistory.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full shadow-sm ${
                      upload.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : upload.status === 'error'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {upload.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : upload.status === 'error' ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{upload.filename}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {upload.uploadDate} • {upload.totalLeads} leads
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      upload.status === 'completed'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : upload.status === 'error'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                      {upload.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </ModernDashboardLayout>
  );
};

export default UploadLeads;
