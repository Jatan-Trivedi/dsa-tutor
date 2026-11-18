// The fixed question set. Each question has a reference solution that only the tutor sees.
export const questions = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    description:
      'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.\nEach input has exactly one solution, and you may not use the same element twice.',
    examples: 'nums = [2, 7, 11, 15], target = 9  ->  [0, 1]\nnums = [3, 2, 4], target = 6  ->  [1, 2]',
    hints: [
      "Start by describing the brute-force way. How many pairs does it check, and what is the time cost?",
      "For each number, you already know exactly which other number you need. How could you look that up without scanning the array again?",
      "Think about a structure with fast lookups. What would you store in it, and when would you add each number?",
    ],
    solution: `Approach: one pass with a hash map from value to index.
For each number, check whether (target - number) is already in the map. If yes, return both indices. Otherwise store the number.
Time O(n), space O(n). Brute force with two loops is O(n^2).
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}`,
  },
  {
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description:
      'Given a string s containing only the characters ( ) { } [ ], determine whether it is valid.\nA string is valid if every opening bracket is closed by the same type of bracket, in the correct order.',
    examples: 's = "()[]{}"  ->  true\ns = "(]"  ->  false\ns = "([)]"  ->  false',
    hints: [
      "Try a few strings by hand, like \"([)]\". What do you have to remember as you read left to right?",
      "The most recent opening bracket must be closed first. Which structure gives you the most recent item first?",
      "What should happen when you see a closing bracket, and what must be true when the string ends?",
    ],
    solution: `Approach: a stack.
Push each opening bracket. For a closing bracket, the top of the stack must be its matching opener, otherwise return false. At the end the stack must be empty.
Time O(n), space O(n).
function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    } else stack.push(ch);
  }
  return stack.length === 0;
}`,
  },
  {
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description:
      'Given an integer array nums, find the contiguous subarray (at least one element) with the largest sum, and return that sum.',
    examples: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]  ->  6  (subarray [4, -1, 2, 1])\nnums = [5]  ->  5',
    hints: [
      "Try the brute force: check every subarray. How many are there, and can you avoid recomputing sums?",
      "Think about the best subarray that ends at index i. How does it relate to the best one ending at i - 1?",
      "At each element you have two choices: extend the previous subarray or start a new one. What decides between them?",
    ],
    solution: `Approach: Kadane's algorithm.
Track the best sum of a subarray ending at the current index: either extend the previous subarray or start fresh at the current number. Keep the maximum seen overall.
Time O(n), space O(1).
function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
  },
];
