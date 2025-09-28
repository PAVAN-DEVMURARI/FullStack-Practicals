import React from 'react';
import './Stats.css';

const Stats = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total || 0,
      icon: '📊',
      color: '#3742fa',
      gradient: 'linear-gradient(135deg, #3742fa, #2f3542)'
    },
    {
      title: 'Completed',
      value: stats.completed || 0,
      icon: '✅',
      color: '#26de81',
      gradient: 'linear-gradient(135deg, #26de81, #20bf6b)'
    },
    {
      title: 'In Progress',
      value: stats.inProgress || 0,
      icon: '⚡',
      color: '#ffa502',
      gradient: 'linear-gradient(135deg, #ffa502, #ff6348)'
    },
    {
      title: 'Pending',
      value: stats.pending || 0,
      icon: '📋',
      color: '#747d8c',
      gradient: 'linear-gradient(135deg, #747d8c, #57606f)'
    },
    {
      title: 'High Priority',
      value: stats.highPriority || 0,
      icon: '🔥',
      color: '#ff4757',
      gradient: 'linear-gradient(135deg, #ff4757, #c44569)'
    },
    {
      title: 'Overdue',
      value: stats.overdue || 0,
      icon: '⚠️',
      color: '#ff3838',
      gradient: 'linear-gradient(135deg, #ff3838, #ff2f2f)'
    }
  ];

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>📈 Task Overview</h2>
        <div className="completion-badge">
          <div className="completion-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${completionRate}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">{completionRate}%</text>
            </svg>
          </div>
          <span className="completion-label">Completion Rate</span>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={{ '--card-gradient': stat.gradient }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
            </div>
            <div className="stat-background"></div>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <div className="progress-summary">
          <div className="progress-bar-container">
            <div className="progress-label">
              <span>Overall Progress</span>
              <span>{stats.completed}/{stats.total} tasks completed</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;