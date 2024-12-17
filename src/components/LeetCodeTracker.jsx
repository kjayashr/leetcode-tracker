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
  // December 2024 - Easy Problems Foundation
  0: [ // Dec 15
    { number: 217, name: "Contains Duplicate", difficulty: "Easy" },
    { number: 242, name: "Valid Anagram", difficulty: "Easy" }
  ],
  1: [ // Dec 16
    { number: 1, name: "Two Sum", difficulty: "Easy" },
    { number: 704, name: "Binary Search", difficulty: "Easy" }
  ],
  2: [ // Dec 17
    { number: 20, name: "Valid Parentheses", difficulty: "Easy" },
    { number: 21, name: "Merge Two Sorted Lists", difficulty: "Easy" }
  ],
  3: [ // Dec 18
    { number: 121, name: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
    { number: 125, name: "Valid Palindrome", difficulty: "Easy" }
  ],
  4: [ // Dec 19
    { number: 226, name: "Invert Binary Tree", difficulty: "Easy" },
    { number: 543, name: "Diameter of Binary Tree", difficulty: "Easy" }
  ],
  5: [ // Dec 20
    { number: 104, name: "Maximum Depth of Binary Tree", difficulty: "Easy" },
    { number: 110, name: "Balanced Binary Tree", difficulty: "Easy" }
  ],
  6: [ // Dec 21
    { number: 141, name: "Linked List Cycle", difficulty: "Easy" },
    { number: 206, name: "Reverse Linked List", difficulty: "Easy" }
  ],
  7: [ // Dec 22
    { number: 70, name: "Climbing Stairs", difficulty: "Easy" },
    { number: 191, name: "Number of 1 Bits", difficulty: "Easy" }
  ],
  8: [ // Dec 23
    { number: 338, name: "Counting Bits", difficulty: "Easy" },
    { number: 268, name: "Missing Number", difficulty: "Easy" }
  ],
  // Dec 24 - Jan 3: BREAK

  // January 2025 - Medium Problems Introduction
  19: [ // Jan 4
    { number: 3, name: "Longest Substring Without Repeating Characters", difficulty: "Med." },
    { number: 424, name: "Longest Repeating Character Replacement", difficulty: "Med." }
  ],
  20: [ // Jan 5
    { number: 49, name: "Group Anagrams", difficulty: "Med." },
    { number: 347, name: "Top K Frequent Elements", difficulty: "Med." }
  ],
  21: [ // Jan 6
    { number: 238, name: "Product of Array Except Self", difficulty: "Med." },
    { number: 567, name: "Permutation in String", difficulty: "Med." }
  ],
  22: [ // Jan 7
    { number: 15, name: "3Sum", difficulty: "Med." },
    { number: 11, name: "Container With Most Water", difficulty: "Med." }
  ],
  23: [ // Jan 8
    { number: 36, name: "Valid Sudoku", difficulty: "Med." },
    { number: 128, name: "Longest Consecutive Sequence", difficulty: "Med." }
  ],
  24: [ // Jan 9
    { number: 167, name: "Two Sum II - Input Array Is Sorted", difficulty: "Med." },
    { number: 994, name: "Rotting Oranges", difficulty: "Med." }
  ],
  25: [ // Jan 10
    { number: 200, name: "Number of Islands", difficulty: "Med." },
    { number: 39, name: "Combination Sum", difficulty: "Med." }
  ],
  26: [ // Jan 11
    { number: 40, name: "Combination Sum II", difficulty: "Med." },
    { number: 46, name: "Permutations", difficulty: "Med." }
  ],
  27: [ // Jan 12
    { number: 78, name: "Subsets", difficulty: "Med." },
    { number: 90, name: "Subsets II", difficulty: "Med." }
  ],
  28: [ // Jan 13
    { number: 79, name: "Word Search", difficulty: "Med." },
    { number: 33, name: "Search in Rotated Sorted Array", difficulty: "Med." }
  ],
  29: [ // Jan 14
    { number: 153, name: "Find Minimum in Rotated Sorted Array", difficulty: "Med." },
    { number: 647, name: "Palindromic Substrings", difficulty: "Med." }
  ],
  30: [ // Jan 15
    { number: 417, name: "Pacific Atlantic Water Flow", difficulty: "Med." },
    { number: 207, name: "Course Schedule", difficulty: "Med." }
  ],
  31: [ // Jan 16
    { number: 208, name: "Implement Trie (Prefix Tree)", difficulty: "Med." },
    { number: 210, name: "Course Schedule II", difficulty: "Med." }
  ],
  32: [ // Jan 17
    { number: 211, name: "Design Add and Search Words Data Structure", difficulty: "Med." },
    { number: 198, name: "House Robber", difficulty: "Med." }
  ],
  33: [ // Jan 18
    { number: 213, name: "House Robber II", difficulty: "Med." },
    { number: 322, name: "Coin Change", difficulty: "Med." }
  ],
  34: [ // Jan 19
    { number: 518, name: "Coin Change II", difficulty: "Med." },
    { number: 739, name: "Daily Temperatures", difficulty: "Med." }
  ],
  35: [ // Jan 20
    { number: 2013, name: "Detect Squares", difficulty: "Med." },
    { number: 143, name: "Reorder List", difficulty: "Med." }
  ],
  // Continue through February...

  // February 1-7: Harder Medium Problems
  47: [ // Feb 1
    { number: 146, name: "LRU Cache", difficulty: "Med." },
    { number: 150, name: "Evaluate Reverse Polish Notation", difficulty: "Med." }
  ],
  48: [ // Feb 2
    { number: 152, name: "Maximum Product Subarray", difficulty: "Med." },
    { number: 155, name: "Min Stack", difficulty: "Med." }
  ],
  49: [ // Feb 3
    { number: 199, name: "Binary Tree Right Side View", difficulty: "Med." },
    { number: 287, name: "Find the Duplicate Number", difficulty: "Med." }
  ],
  50: [ // Feb 4
    { number: 300, name: "Longest Increasing Subsequence", difficulty: "Med." },
    { number: 309, name: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Med." }
  ],
  51: [ // Feb 5
    { number: 416, name: "Partition Equal Subset Sum", difficulty: "Med." },
    { number: 494, name: "Target Sum", difficulty: "Med." }
  ],
  52: [ // Feb 6
    { number: 621, name: "Task Scheduler", difficulty: "Med." },
    { number: 763, name: "Partition Labels", difficulty: "Med." }
  ],
  53: [ // Feb 7
    { number: 853, name: "Car Fleet", difficulty: "Med." },
    { number: 875, name: "Koko Eating Bananas", difficulty: "Med." }
  ],
  // Feb 8-20: BREAK

  // February 21-28: Hard Problems Introduction
  66: [ // Feb 21
    { number: 4, name: "Median of Two Sorted Arrays", difficulty: "Hard" }
  ],
  67: [ // Feb 22
    { number: 23, name: "Merge k Sorted Lists", difficulty: "Hard" },
    { number: 25, name: "Reverse Nodes in k-Group", difficulty: "Hard" }
  ],
  68: [ // Feb 23
    { number: 42, name: "Trapping Rain Water", difficulty: "Hard" },
    { number: 76, name: "Minimum Window Substring", difficulty: "Hard" }
  ],
  69: [ // Feb 24
    { number: 84, name: "Largest Rectangle in Histogram", difficulty: "Hard" },
    { number: 124, name: "Binary Tree Maximum Path Sum", difficulty: "Hard" }
  ],
  70: [ // Feb 25
    { number: 127, name: "Word Ladder", difficulty: "Hard" },
    { number: 212, name: "Word Search II", difficulty: "Hard" }
  ],
  71: [ // Feb 26
    { number: 239, name: "Sliding Window Maximum", difficulty: "Hard" },
    { number: 295, name: "Find Median from Data Stream", difficulty: "Hard" }
  ],
  72: [ // Feb 27
    { number: 269, name: "Alien Dictionary", difficulty: "Hard" },
    { number: 297, name: "Serialize and Deserialize Binary Tree", difficulty: "Hard" }
  ],
  73: [ // Feb 28
    { number: 312, name: "Burst Balloons", difficulty: "Hard" },
    { number: 329, name: "Longest Increasing Path in a Matrix", difficulty: "Hard" }
  ],

  // March 1-14: Mixed Difficulty and Review
  74: [ // Mar 1
    { number: 332, name: "Reconstruct Itinerary", difficulty: "Hard" },
    { number: 778, name: "Swim in Rising Water", difficulty: "Hard" }
  ],
  75: [ // Mar 2
    { number: 355, name: "Design Twitter", difficulty: "Med." },
    { number: 371, name: "Sum of Two Integers", difficulty: "Med." }
  ],
  76: [ // Mar 3
    { number: 435, name: "Non-overlapping Intervals", difficulty: "Med." },
    { number: 973, name: "K Closest Points to Origin", difficulty: "Med." }
  ],
  77: [ // Mar 4
    { number: 981, name: "Time Based Key-Value Store", difficulty: "Med." },
    { number: 1143, name: "Longest Common Subsequence", difficulty: "Med." }
  ],
  78: [ // Mar 5
    { number: 1584, name: "Min Cost to Connect All Points", difficulty: "Med." },
    { number: 1899, name: "Merge Triplets to Form Target Triplet", difficulty: "Med." }
  ],
  // Mar 15-21: BREAK

  // March 22 - April 15: Final Sprint and Review
  85: [ // Mar 22
    { number: 1851, name: "Minimum Interval to Include Each Query", difficulty: "Hard" },
    { number: 115, name: "Distinct Subsequences", difficulty: "Hard" }
  ],
  // ... Remaining days focus on review and practice of completed problems
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
