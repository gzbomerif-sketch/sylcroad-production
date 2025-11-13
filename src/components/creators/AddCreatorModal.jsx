import React, { useState } from 'react';
import { X, Link as LinkIcon, Users, TrendingUp, Eye } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import Card from '../ui/Card';
import { campaignService } from '../../services/campaigns';

const AddCreatorModal = ({ isOpen, onClose, campaignId, onCreatorAdded }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState('');

  const handleFetchCreator = async () => {
    if (!url) return;
    
    setLoading(true);
    setError('');
    setCreator(null);
    
    try {
      const data = await campaignService.addCreator(url, campaignId);
      setCreator(data);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch creator data');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUrl('');
    setCreator(null);
    setError('');
    onClose();
  };

  const handleDone = () => {
    if (onCreatorAdded && creator) {
      onCreatorAdded(creator);
    }
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            Add Creator
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-100 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* URL Input */}
        <div className="space-y-4 mb-6">
          <Input
            label="Instagram or TikTok URL"
            icon={LinkIcon}
            placeholder="https://instagram.com/username or https://tiktok.com/@username"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error}
          />
          
          <Button
            onClick={handleFetchCreator}
            disabled={!url || loading}
            className="w-full"
          >
            {loading ? 'Fetching Creator Data...' : 'Fetch Creator Data'}
          </Button>
        </div>

        {/* Creator Preview */}
        {creator && (
          <Card className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              {creator.avatar_url && (
                <img
                  src={creator.avatar_url}
                  alt={creator.username}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-100 mb-1">
                  @{creator.username}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {creator.platform === 'instagram' ? 'Instagram' : 'TikTok'}
                </p>
                {creator.bio && (
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {creator.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Followers</span>
                </div>
                <p className="text-lg font-semibold text-gray-100">
                  {creator.followers?.toLocaleString() || 'N/A'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs">Median View Rate</span>
                </div>
                <p className="text-lg font-semibold text-gray-100">
                  {creator.median_view_rate ? `${creator.median_view_rate}%` : 'N/A'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">Mean View Rate</span>
                </div>
                <p className="text-lg font-semibold text-gray-100">
                  {creator.mean_view_rate ? `${creator.mean_view_rate}%` : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleDone}
            disabled={!creator}
          >
            {creator ? 'Done' : 'Add Creator to Campaign'}
          </Button>
          <Button
            variant="ghost"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCreatorModal;

