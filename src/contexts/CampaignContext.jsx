import React, { createContext, useState, useEffect, useContext } from 'react';
import { campaignService } from '../services/campaigns';

const CampaignContext = createContext(null);

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load selected campaign from localStorage
    const savedCampaignId = localStorage.getItem('selectedCampaignId');
    if (savedCampaignId) {
      const campaign = campaigns.find(c => c.id === parseInt(savedCampaignId));
      if (campaign) {
        setSelectedCampaign(campaign);
      }
    }
  }, [campaigns]);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await campaignService.getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    if (campaign) {
      localStorage.setItem('selectedCampaignId', campaign.id.toString());
    } else {
      localStorage.removeItem('selectedCampaignId');
    }
  };

  const createCampaign = async (data) => {
    const newCampaign = await campaignService.createCampaign(data);
    setCampaigns([...campaigns, newCampaign]);
    return newCampaign;
  };

  const updateCampaign = async (campaignId, updates) => {
    const updated = await campaignService.updateCampaign(campaignId, updates);
    setCampaigns(campaigns.map(c => c.id === campaignId ? updated : c));
    if (selectedCampaign?.id === campaignId) {
      setSelectedCampaign(updated);
    }
    return updated;
  };

  const deleteCampaign = async (campaignId) => {
    await campaignService.deleteCampaign(campaignId);
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
    if (selectedCampaign?.id === campaignId) {
      setSelectedCampaign(null);
    }
  };

  return (
    <CampaignContext.Provider value={{
      campaigns,
      selectedCampaign,
      loading,
      loadCampaigns,
      selectCampaign,
      createCampaign,
      updateCampaign,
      deleteCampaign
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns must be used within CampaignProvider');
  }
  return context;
};

