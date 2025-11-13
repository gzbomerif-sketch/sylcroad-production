import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://sylcroad.com/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const campaignService = {
  // Get all campaigns
  getCampaigns: async () => {
    const response = await axios.get(
      `${API_URL}/campaigns.php`,
      getAuthHeaders()
    );
    return response.data.campaigns;
  },

  // Create campaign
  createCampaign: async (campaignData) => {
    const response = await axios.post(
      `${API_URL}/campaigns.php`,
      campaignData,
      getAuthHeaders()
    );
    return response.data.campaign;
  },

  // Update campaign
  updateCampaign: async (campaignId, updates) => {
    const response = await axios.put(
      `${API_URL}/campaigns.php`,
      { id: campaignId, ...updates },
      getAuthHeaders()
    );
    return response.data.campaign;
  },

  // Delete campaign
  deleteCampaign: async (campaignId) => {
    await axios.delete(
      `${API_URL}/campaigns.php?id=${campaignId}`,
      getAuthHeaders()
    );
  },

  // Add creator to campaign
  addCreator: async (url, campaignId) => {
    const response = await axios.post(
      `${API_URL}/creators.php?add=1`,
      { url, campaign_id: campaignId },
      getAuthHeaders()
    );
    return response.data.creator;
  },

  // Get creators for campaign
  getCreators: async (campaignId) => {
    const response = await axios.get(
      `${API_URL}/creators.php?campaign_id=${campaignId}`,
      getAuthHeaders()
    );
    return response.data.creators;
  },

  // Remove creator from campaign
  removeCreator: async (campaignId, creatorId) => {
    await axios.delete(
      `${API_URL}/creators.php?campaign_id=${campaignId}&creator_id=${creatorId}`,
      getAuthHeaders()
    );
  }
};

