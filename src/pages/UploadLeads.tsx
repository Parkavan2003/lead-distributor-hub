
import React, { useState, useRef } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Users } from 'lucide-react';
import { toast } from 'sonner';

interface ParsedLead {
  firstName: string;
  phone: string;
  notes: string;
}

interface DistributedLead extends ParsedLead {
  assignedAgent: string;
}

const UploadLeads = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedLeads, setParsedLeads] = useState<ParsedLead[]>([]);
  const [distributedLeads, setDistributedLeads] = useState<DistributedLead[]>([]);
  const [step, setStep] = useState<'upload' | 'preview' | 'distributed'>('upload');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock agents data
  const agents = [
    'John Smith',
    'Sarah Johnson', 
    'Mike Wilson',
    'Lisa Brown',
    'David Lee'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      toast.error('Please upload only CSV, XLSX, or XLS files');
      return;
    }

    setUploadedFile(file);
    parseFile(file);
  };

  const parseFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Simulate file parsing - in real app, use csv-parser or xlsx package
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed data
      const mockLeads: ParsedLead[] = [
        { firstName: 'Alice Cooper', phone: '+1-555-0101', notes: 'Interested in premium package' },
        { firstName: 'Bob Johnson', phone: '+1-555-0102', notes: 'Follow up next week' },
        { firstName: 'Carol Davis', phone: '+1-555-0103', notes: 'Budget constraint, offer discount' },
        { firstName: 'David Wilson', phone: '+1-555-0104', notes: 'Decision maker, ready to buy' },
        { firstName: 'Emma Brown', phone: '+1-555-0105', notes: 'Compare with competitors' },
        { firstName: 'Frank Miller', phone: '+1-555-0106', notes: 'Technical questions pending' },
        { firstName: 'Grace Lee', phone: '+1-555-0107', notes: 'Interested in trial version' },
        { firstName: 'Henry Taylor', phone: '+1-555-0108', notes: 'Contact after Q1' },
        { firstName: 'Ivy Anderson', phone: '+1-555-0109', notes: 'High potential lead' },
        { firstName: 'Jack Thompson', phone: '+1-555-0110', notes: 'Needs approval from team' },
        { firstName: 'Kate White', phone: '+1-555-0111', notes: 'Price sensitive customer' },
        { firstName: 'Liam Garcia', phone: '+1-555-0112', notes: 'Looking for enterprise solution' },
        { firstName: 'Maya Rodriguez', phone: '+1-555-0113', notes: 'Urgent requirement' },
        { firstName: 'Noah Martinez', phone: '+1-555-0114', notes: 'Warm lead from referral' },
        { firstName: 'Olivia Clark', phone: '+1-555-0115', notes: 'Schedule demo next month' }
      ];
      
      setParsedLeads(mockLeads);
      setStep('preview');
      toast.success(`Successfully parsed ${mockLeads.length} leads from ${file.name}`);
    } catch (error) {
      console.error('Error parsing file:', error);
      toast.error('Error parsing file. Please check the format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const distributeLeads = () => {
    if (parsedLeads.length === 0) return;

    const leadsPerAgent = Math.floor(parsedLeads.length / agents.length);
    const remainder = parsedLeads.length % agents.length;
    
    const distributed: DistributedLead[] = [];
    let currentIndex = 0;

    agents.forEach((agent, agentIndex) => {
      const numberOfLeads = leadsPerAgent + (agentIndex < remainder ? 1 : 0);
      
      for (let i = 0; i < numberOfLeads; i++) {
        if (currentIndex < parsedLeads.length) {
          distributed.push({
            ...parsedLeads[currentIndex],
            assignedAgent: agent
          });
          currentIndex++;
        }
      }
    });

    setDistributedLeads(distributed);
    setStep('distributed');
    toast.success(`Successfully distributed ${distributed.length} leads among ${agents.length} agents`);
  };

  const downloadSample = () => {
    const csvContent = `FirstName,Phone,Notes
John Doe,+1-555-0001,Interested in our services
Jane Smith,+1-555-0002,Follow up required
Mike Johnson,+1-555-0003,High priority lead`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setParsedLeads([]);
    setDistributedLeads([]);
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAgentDistribution = () => {
    const distribution: { [key: string]: number } = {};
    distributedLeads.forEach(lead => {
      distribution[lead.assignedAgent] = (distribution[lead.assignedAgent] || 0) + 1;
    });
    return distribution;
  };

  return (
    <DashboardLayout activeTab="upload">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload & Distribute Leads</h2>
            <p className="text-gray-600">Upload CSV/Excel files and distribute leads to agents</p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={downloadSample}>
              <Download className="w-4 h-4 mr-2" />
              Download Sample
            </Button>
            {step !== 'upload' && (
              <Button variant="outline" onClick={resetUpload}>
                Upload New File
              </Button>
            )}
          </div>
        </div>

        {/* Upload Step */}
        {step === 'upload' && (
          <Card className="p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-primary/5'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isProcessing ? 'Processing file...' : 'Upload your leads file'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Drag and drop your CSV, XLSX, or XLS file here, or click to browse
                  </p>
                </div>

                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    <span className="text-sm text-gray-600">Parsing leads...</span>
                  </div>
                ) : (
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-primary"
                  >
                    Choose File
                  </Button>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">File Format Requirements:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Column 1: FirstName (text)</li>
                <li>• Column 2: Phone (number with country code)</li>
                <li>• Column 3: Notes (text)</li>
                <li>• Supported formats: CSV, XLSX, XLS</li>
              </ul>
            </div>
          </Card>
        )}

        {/* Preview Step */}
        {step === 'preview' && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">File Parsed Successfully</h3>
                    <p className="text-gray-600">Found {parsedLeads.length} leads in {uploadedFile?.name}</p>
                  </div>
                </div>
                
                <Button onClick={distributeLeads} className="btn-primary">
                  <Users className="w-4 h-4 mr-2" />
                  Distribute to {agents.length} Agents
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Preview Leads</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        First Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {parsedLeads.slice(0, 10).map((lead, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.firstName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{lead.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{lead.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedLeads.length > 10 && (
                <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
                  Showing first 10 of {parsedLeads.length} leads
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Distributed Step */}
        {step === 'distributed' && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Leads Distributed Successfully</h3>
                  <p className="text-gray-600">
                    {distributedLeads.length} leads have been distributed among {agents.length} agents
                  </p>
                </div>
              </div>
            </Card>

            {/* Distribution Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(getAgentDistribution()).map(([agent, count]) => (
                <Card key={agent} className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {agent.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{agent}</p>
                      <p className="text-sm text-gray-600">{count} leads assigned</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Detailed Distribution */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Distributed Leads</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Lead
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Assigned Agent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {distributedLeads.map((lead, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.firstName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{lead.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{lead.notes}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {lead.assignedAgent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadLeads;
