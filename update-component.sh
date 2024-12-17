#!/bin/bash

cat > src/components/LeetCodeTracker.jsx << 'EOL'
import React, { useState, useEffect } from 'react';
import { 
  Flame, Trophy, Calendar, CheckCircle, 
  Award, Target, Zap, Star, Clock
} from 'lucide-react';
import './LeetCodeTracker.css';

const LeetCodeTracker = () => {
  const [completedProblems, setCompletedProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('leetcode-completed');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  const [currentStreak, setCurrentStreak] = useState(() => {
    try {
      return parseInt(localStorage.getItem('leetcode-streak') || '0');
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('leetcode-completed', JSON.stringify([...completedProblems]));
  }, [completedProblems]);

  useEffect(() => {
    localStorage.setItem('leetcode-streak', currentStreak.toString());
  }, [currentStreak]);

  const toggleProblem = (problemNumber) => {
    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemNumber)) {
        newSet.delete(problemNumber);
      } else {
        newSet.add(problemNumber);
      }
      return newSet;
    });

    if (!completedProblems.has(problemNumber)) {
      setCurrentStreak(prev => prev + 1);
    }
  };

  const totalCompleted = completedProblems.size;
  const progressPercentage = (totalCompleted / 150) * 100;

  return (
    <div className="container">
      <div className="stats-grid">
        <div className="stat-card streak">
          <div className="stat-content">
            <Flame />
            <div>
              <div className="stat-value">{currentStreak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-content">
            <Trophy />
            <div>
              <div className="stat-value">{totalCompleted}/150</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>
        </div>

        <div className="stat-card progress">
          <div className="stat-content">
            <Target />
            <div>
              <div className="stat-value">{Math.round(progressPercentage)}%</div>
              <div className="stat-label">Complete</div>
            </div>
          </div>
        </div>

        <div className="stat-card remaining">
          <div className="stat-content">
            <Zap />
            <div>
              <div className="stat-value">
                {100 - Math.floor((new Date() - new Date('2024-12-15')) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="stat-label">Days Left</div>
            </div>
          </div>
        </div>
      </div>

      <div className="problems-section">
        <h2 className="section-title">
          <Calendar className="section-icon" />
          Today's Problems
        </h2>
        
        <div className="problems-grid">
          {/* Add your problem cards here */}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeTracker;
EOL

cat > src/components/LeetCodeTracker.css << 'EOL'
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
}

.problems-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.problems-grid {
  display: grid;
  gap: 1rem;
}
EOL

git add src/components/LeetCodeTracker.*
git commit -m "Remove external UI dependencies"
git push
