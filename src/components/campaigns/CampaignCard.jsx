import React from 'react';
import { Calendar, DollarSign, Users, Edit, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { format } from 'date-fns';

const CampaignCard = ({ campaign, onEdit, onDelete, onSelect }) => {
  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-700 text-gray-300 border-gray-600',
      active: 'bg-success/10 text-success border-success/20',
      paused: 'bg-warning/10 text-warning border-warning/20',
      completed: 'bg-info/10 text-info border-info/20'
    };
    return colors[status] || colors.draft;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Card hover onClick={() => onSelect?.(campaign)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-100 mb-1">
            {campaign.name}
          </h3>
          {campaign.description && (
            <p className="text-sm text-gray-400 line-clamp-2">
              {campaign.description}
            </p>
          )}
        </div>
        <Badge className={getStatusColor(campaign.status)}>
          {campaign.status}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-700">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs">Budget</span>
          </div>
          <p className="text-lg font-semibold text-gray-100">
            {campaign.budget ? `$${parseFloat(campaign.budget).toLocaleString()}` : 'N/A'}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs">Creators</span>
          </div>
          <p className="text-lg font-semibold text-gray-100">
            {campaign.creator_count || 0}
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">Duration</span>
          </div>
          <p className="text-xs text-gray-300">
            {campaign.start_date ? (
              <>
                {formatDate(campaign.start_date)}
                {campaign.end_date && ` - ${formatDate(campaign.end_date)}`}
              </>
            ) : (
              'Not scheduled'
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(campaign);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this campaign?')) {
              onDelete?.(campaign.id);
            }
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-error hover:text-red-400 hover:bg-error/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </Card>
  );
};

export default CampaignCard;

