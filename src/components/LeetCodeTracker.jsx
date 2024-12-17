import React, { useState, useEffect } from 'react';
import { 
  Flame, Trophy, Calendar, CheckCircle, 
  Award, Target, Zap, Star, Clock
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import './LeetCodeTracker.css';

// Break periods definition
const BREAK_PERIODS = [
  { start: new Date('2024-12-24'), end: new Date('2025-01-03') }, // Year-end break
  { start: new Date('2025-02-08'), end: new Date('2025-02-20') }, // February break
  { start: new Date('2025-03-15'), end: new Date('2025-03-21') }  // March break
];

// All 150 LeetCode problems organized by days
const ALL_PROBLEMS = {
  // December 2024 (Starting with easier problems)
  0: [ // Dec 15
    { number: 217, name: "Contains Duplicate", difficulty: "Easy" },
    { number: 242, name: "Valid Anagram", difficulty: "Easy" }
  ],
  1: [ // Dec 16
    { number: 1, name: "Two Sum", difficulty: "Easy" },
    { number: 125, name: "Valid Palindrome", difficulty: "Easy" }
  ],
  2: [ // Dec 17
    { number: 20, name: "Valid Parentheses", difficulty: "Easy" },
    { number: 21, name: "Merge Two Sorted Lists", difficulty: "Easy" }
  ],
  3: [ // Dec 18
    { number: 141, name: "Linked List Cycle", difficulty: "Easy" },
    { number: 206, name: "Reverse Linked List", difficulty: "Easy" }
  ],
  4: [ // Dec 19
    { number: 704, name: "Binary Search", difficulty: "Easy" },
    { number: 121, name: "Best Time to Buy and Sell Stock", difficulty: "Easy" }
  ],
  5: [ // Dec 20
    { number: 226, name: "Invert Binary Tree", difficulty: "Easy" },
    { number: 543, name: "Diameter of Binary Tree", difficulty: "Easy" }
  ],
  6: [ // Dec 21
    { number: 100, name: "Same Tree", difficulty: "Easy" },
    { number: 572, name: "Subtree of Another Tree", difficulty: "Easy" }
  ],
  7: [ // Dec 22
    { number: 110, name: "Balanced Binary Tree", difficulty: "Easy" },
    { number: 338, name: "Counting Bits", difficulty: "Easy" }
  ],
  8: [ // Dec 23
    { number: 191, name: "Number of 1 Bits", difficulty: "Easy" },
    { number: 70, name: "Climbing Stairs", difficulty: "Easy" }
  ],
  // After Year-end Break (Starting medium problems)
  19: [ // Jan 4
    { number: 3, name: "Longest Substring Without Repeating Characters", difficulty: "Med." },
    { number: 424, name: "Longest Repeating Character Replacement", difficulty: "Med." }
  ],
  20: [ // Jan 5
    { number: 49, name: "Group Anagrams", difficulty: "Med." },
    { number: 347, name: "Top K Frequent Elements", difficulty: "Med." }
  ],
  21: [ // Jan 6
    { number: 271, name: "Encode and Decode Strings", difficulty: "Med." },
    { number: 238, name: "Product of Array Except Self", difficulty: "Med." }
  ],
  22: [ // Jan 7
    { number: 36, name: "Valid Sudoku", difficulty: "Med." },
    { number: 128, name: "Longest Consecutive Sequence", difficulty: "Med." }
  ],
  // Continue with more days and problems...
};

const LeetCodeTracker = () => {
  // Initialize state with localStorage if available
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

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Save to localStorage whenever completedProblems changes
  useEffect(() => {
    localStorage.setItem('leetcode-completed', JSON.stringify([...completedProblems]));
  }, [completedProblems]);

  useEffect(() => {
    localStorage.setItem('leetcode-streak', currentStreak.toString());
  }, [currentStreak]);

  // Check if a date is during a break period
  const isBreakDay = (date) => {
    return BREAK_PERIODS.some(period => 
      date >= period.start && date <= period.end
    );
  };

  // Get all problems up to selected date that aren't completed
  const getAccumulatedProblems = (date) => {
    const startDate = new Date('2024-12-15');
    const dayIndex = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
    
    let allProblems = [];
    for (let i = 0; i <= dayIndex; i++) {
      if (ALL_PROBLEMS[i]) {
        ALL_PROBLEMS[i].forEach(problem => {
          if (!completedProblems.has(problem.number)) {
            allProblems.push({
              ...problem,
              carriedOver: i !== dayIndex,
              originalDay: i
            });
          }
        });
      }
    }
    return allProblems;
  };

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Easy' ? 'text-green-600 bg-green-100' :
           difficulty === 'Med.' ? 'text-yellow-600 bg-yellow-100' :
           'text-red-600 bg-red-100';
  };

  // Calculate progress
  const totalCompleted = completedProblems.size;
  const progressPercentage = (totalCompleted / 150) * 100;
  const pendingProblems = getAccumulatedProblems(selectedDate);

  // Handle problem completion
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

    // Update streak (simplified version - could be made more sophisticated)
    if (!completedProblems.has(problemNumber)) {
      setCurrentStreak(prev => prev + 1);
    }
  };

  return (
    <div className="leetcode-tracker-container">
      {/* Stats Dashboard */}
      <div className="stats-grid">
        <Card className="stat-card streak">
          <div className="stat-content">
            <Flame className="stat-icon" />
            <div>
              <div className="stat-value">{currentStreak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
        </Card>

        <Card className="stat-card problems">
          <div className="stat-content">
            <Trophy className="stat-icon" />
            <div>
              <div className="stat-value">{totalCompleted}/150</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>
        </Card>

        <Card className="stat-card progress">
          <div className="stat-content">
            <Target className="stat-icon" />
            <div>
              <div className="stat-value">{Math.round(progressPercentage)}%</div>
              <div className="stat-label">Journey Complete</div>
            </div>
          </div>
        </Card>

        <Card className="stat-card remaining">
          <div className="stat-content">
            <Zap className="stat-icon" />
            <div>
              <div className="stat-value">
                {100 - Math.floor((new Date() - new Date('2024-12-15')) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="stat-label">Days Remaining</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Problems Section */}
      <Card className="problems-section">
        <h2 className="section-title">
          <Calendar className="section-icon" />
          Outstanding Problems
        </h2>
        
        <div className="problems-grid">
          {pendingProblems.map(problem => (
            <div 
              key={problem.number}
              className={`problem-card ${problem.carriedOver ? 'carried-over' : ''}`}
              onClick={() => toggleProblem(problem.number)}
            >
              <div className="problem-header">
                <div className="problem-info">
                  <span className="problem-number">#{problem.number}</span>
                  <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                  {problem.carriedOver && (
                    <span className="carried-over-badge">
                      <Clock className="carried-over-icon" />
                      Carried over from Day {problem.originalDay + 1}
                    </span>
                  )}
                </div>
              </div>
              <div className="problem-name">{problem.name}</div>
            </div>
          ))}

          {pendingProblems.length === 0 && (
            <div className="no-problems-message">
              All caught up! Great job! 🎉
            </div>
          )}
        </div>
      </Card>

      {/* Warning for accumulated problems */}
      {pendingProblems.length > 2 && (
        <Card className="warning-card">
          <div className="warning-content">
            <Clock className="warning-icon" />
            <span className="warning-text">
              You have {pendingProblems.length} outstanding problems. 
              Try to catch up to maintain your learning momentum!
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LeetCodeTracker;
