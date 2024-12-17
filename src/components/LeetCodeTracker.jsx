import React, { useState, useEffect } from 'react';
import { 
  Flame, Trophy, Calendar, CheckCircle, 
  Award, Target, Zap
} from 'lucide-react';
import './LeetCodeTracker.css';

// Keep break periods definition concise
const BREAK_PERIODS = [
  { start: new Date('2024-12-24'), end: new Date('2025-01-03') },
  { start: new Date('2025-02-08'), end: new Date('2025-02-20') },
  { start: new Date('2025-03-15'), end: new Date('2025-03-21') }
];

// Start with a small subset of problems to test
const DAILY_PROBLEMS = {
  0: [
    { number: 217, name: "Contains Duplicate", difficulty: "Easy" },
    { number: 242, name: "Valid Anagram", difficulty: "Easy" }
  ],
  1: [
    { number: 1, name: "Two Sum", difficulty: "Easy" },
    { number: 704, name: "Binary Search", difficulty: "Easy" }
  ]
};

const LeetCodeTracker = () => {
  const [completedProblems, setCompletedProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('leetcode-completed');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('leetcode-completed', JSON.stringify([...completedProblems]));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [completedProblems]);

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
  };

  const totalCompleted = completedProblems.size;
  const progressPercentage = (totalCompleted / 150) * 100;

  return (
    <div className="container">
      {/* Stats Dashboard */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <Flame className="stat-icon" />
            <div>
              <div className="stat-value">{currentStreak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <Trophy className="stat-icon" />
            <div>
              <div className="stat-value">{totalCompleted}/150</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <Target className="stat-icon" />
            <div>
              <div className="stat-value">{Math.round(progressPercentage)}%</div>
              <div className="stat-label">Complete</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <Zap className="stat-icon" />
            <div>
              <div className="stat-value">
                {100 - Math.floor((new Date() - new Date('2024-12-15')) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="stat-label">Days Left</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="problems-section">
        <h2 className="section-title">
          <Calendar className="section-icon" />
          Today's Problems
        </h2>
        
        <div className="problems-grid">
          {Object.values(DAILY_PROBLEMS)[0].map(problem => (
            <div 
              key={problem.number}
              className={`problem-card ${completedProblems.has(problem.number) ? 'completed' : ''}`}
              onClick={() => toggleProblem(problem.number)}
            >
              <div className="problem-header">
                <span className="problem-number">#{problem.number}</span>
                <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="problem-name">{problem.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeTracker;
