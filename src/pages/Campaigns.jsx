import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import CampaignCard from '../components/campaigns/CampaignCard';
import CreateCampaign from '../components/campaigns/CreateCampaign';
import { useCampaigns } from '../contexts/CampaignContext';

const Campaigns = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { campaigns, loading, loadCampaigns, deleteCampaign } = useCampaigns();

  useEffect(() => {
    loadCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Campaigns
          </h1>
          <p className="text-gray-400">
            Manage your music promotion campaigns
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setShowCreateModal(true)}
        >
          New Campaign
        </Button>
      </div>

      {/* Campaign Grid */}
      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDelete={deleteCampaign}
              onEdit={(c) => {
                console.log('Edit campaign:', c);
              }}
              onSelect={(c) => {
                console.log('Select campaign:', c);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            No campaigns yet. Create your first campaign to get started!
          </p>
          <Button
            icon={Plus}
            onClick={() => setShowCreateModal(true)}
          >
            Create Your First Campaign
          </Button>
        </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaign
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Campaigns;

