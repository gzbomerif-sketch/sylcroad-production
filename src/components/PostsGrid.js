import React from 'react';
import './PostsGrid.css';

const PostsGrid = () => {
  // Mock post data
  const posts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    platform: i % 4 === 0 ? 'twitter' : 'instagram',
    timestamp: i < 5 ? '20 days ago' : i < 10 ? '13 days ago' : i < 15 ? 'a month ago' : '3 months ago',
    thumbnail: `https://via.placeholder.com/300x400/1a1a1a/666?text=Post+${i + 1}`
  }));

  return (
    <div className="posts-container">
      <div className="posts-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
        </div>

        <div className="posts-filters">
          <button className="filter-btn">Hide Filters</button>
          <select className="sort-select">
            <option>Sort by Views</option>
            <option>Sort by Date</option>
            <option>Sort by Engagement</option>
          </select>
          <div className="view-toggle">
            <button className="view-btn active">
              <span>⊞</span>
            </button>
            <button className="view-btn">
              <span>☰</span>
            </button>
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-thumbnail">
              <img src={post.thumbnail} alt={`Post ${post.id + 1}`} />
              <div className="post-platform-icon">
                {post.platform === 'instagram' ? (
                  <span className="platform-badge">📸</span>
                ) : (
                  <span className="platform-badge">🐦</span>
                )}
              </div>
            </div>
            <div className="post-info">
              <span className="post-timestamp">{post.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;

