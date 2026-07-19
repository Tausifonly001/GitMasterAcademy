export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  commands?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const modules: Module[] = [
  {
    id: 'git-basics',
    title: 'Git Basics',
    description: 'Learn the fundamentals of Git version control',
    icon: 'git-branch',
    difficulty: 'beginner',
    lessons: [
      {
        id: 'what-is-git',
        title: 'What is Git?',
        description: 'Understanding version control and Git',
        duration: '5 min',
        content: `# What is Git?

Git is a **distributed version control system** created by Linus Torvalds in 2005.

## Why Git?
- Track changes in your code
- Collaborate with teams
- Revert to previous versions
- Branch and merge features

## Key Concepts
- **Repository**: Your project folder tracked by Git
- **Commit**: A snapshot of your changes
- **Branch**: A parallel version of your code
- **Remote**: A repository hosted on a server

\`\`\`bash
# Check Git version
git --version

# Initialize a new Git repository
git init
\`\`\`
`,
        commands: ['git --version', 'git init'],
      },
      {
        id: 'git-config',
        title: 'Git Configuration',
        description: 'Setting up your Git identity',
        duration: '5 min',
        content: `# Git Configuration

Before using Git, set up your identity:

\`\`\`bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your@email.com"

# Check your configuration
git config --list
\`\`\`

## Configuration Levels
- **--local**: Current repository only
- **--global**: All repositories for your user
- **--system**: All users on this computer
`,
        commands: ['git config --global user.name', 'git config --global user.email'],
      },
      {
        id: 'git-add-commit',
        title: 'Add & Commit',
        description: 'Staging and saving your changes',
        duration: '8 min',
        content: `# Git Add & Commit

## The Git Workflow
1. **Edit** files in your working directory
2. **Stage** changes with \`git add\`
3. **Commit** with \`git commit\`

\`\`\`bash
# Stage a specific file
git add filename.txt

# Stage all changes
git add .

# Commit with a message
git commit -m "Your commit message"

# View commit history
git log --oneline
\`\`\`

## Commit Message Best Practices
- Use present tense ("Add feature" not "Added feature")
- Keep it under 50 characters
- Use imperative mood
`,
        commands: ['git add .', 'git commit -m "message"', 'git log --oneline'],
      },
    ],
  },
  {
    id: 'git-branching',
    title: 'Branching & Merging',
    description: 'Master Git branches for parallel development',
    icon: 'git-merge',
    difficulty: 'beginner',
    lessons: [
      {
        id: 'creating-branches',
        title: 'Creating Branches',
        description: 'Learn to create and switch branches',
        duration: '6 min',
        content: `# Git Branches

Branches let you develop features in isolation.

\`\`\`bash
# List all branches
git branch

# Create a new branch
git branch feature-name

# Switch to a branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# Delete a branch
git branch -d feature-name
\`\`\`

## Best Practices
- Name branches descriptively: \`feature/login\`, \`fix/header-bug\`
- Keep main branch clean
- Delete merged branches
`,
        commands: ['git branch', 'git checkout -b feature', 'git branch -d feature'],
      },
      {
        id: 'merging',
        title: 'Merging Branches',
        description: 'Combine branches together',
        duration: '7 min',
        content: `# Git Merging

Merge combines changes from different branches.

\`\`\`bash
# Switch to the branch you want to merge INTO
git checkout main

# Merge the feature branch
git merge feature-branch

# Abort a merge (if conflicts)
git merge --abort
\`\`\`

## Merge Conflicts
Conflicts happen when changes overlap:
1. Open conflicted files
2. Look for \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`
3. Choose the correct code
4. Remove conflict markers
5. Commit the merge
`,
        commands: ['git merge feature-branch', 'git merge --abort'],
      },
    ],
  },
  {
    id: 'github-basics',
    title: 'GitHub Fundamentals',
    description: 'Working with GitHub remote repositories',
    icon: 'github',
    difficulty: 'beginner',
    lessons: [
      {
        id: 'remote-repos',
        title: 'Remote Repositories',
        description: 'Connect local to GitHub',
        duration: '6 min',
        content: `# Remote Repositories

Connect your local repo to GitHub:

\`\`\`bash
# Add a remote repository
git remote add origin https://github.com/user/repo.git

# Push your code
git push -u origin main

# Pull latest changes
git pull origin main

# Clone an existing repo
git clone https://github.com/user/repo.git
\`\`\`

## SSH vs HTTPS
- **HTTPS**: Easier setup, requires token for push
- **SSH**: More secure, no password prompts after setup
`,
        commands: ['git remote add origin URL', 'git push -u origin main', 'git pull'],
      },
      {
        id: 'fork-and-pull',
        title: 'Fork & Pull Request',
        description: 'Contribute to open source projects',
        duration: '8 min',
        content: `# Fork & Pull Request Workflow

## Forking a Repository
1. Click "Fork" on GitHub
2. Clone your fork locally
3. Add upstream remote

\`\`\`bash
# Clone your fork
git clone https://github.com/your-username/repo.git

# Add upstream
git remote add upstream https://github.com/original/repo.git

# Sync your fork
git fetch upstream
git merge upstream/main
\`\`\`

## Creating a Pull Request
1. Push your changes to your fork
2. Go to original repository
3. Click "New Pull Request"
4. Describe your changes
5. Submit for review
`,
        commands: ['git clone URL', 'git remote add upstream URL', 'git fetch upstream'],
      },
    ],
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions & CI/CD',
    description: 'Automate your workflow with GitHub Actions',
    icon: 'zap',
    difficulty: 'advanced',
    lessons: [
      {
        id: 'actions-intro',
        title: 'Introduction to GitHub Actions',
        description: 'Understanding CI/CD automation',
        duration: '8 min',
        content: `# GitHub Actions

GitHub Actions automates your development workflow.

## Key Concepts
- **Workflow**: Automated process (.github/workflows/)
- **Job**: A set of steps
- **Step**: Individual task
- **Action**: Reusable workflow unit

\`\`\`yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
\`\`\`
`,
        commands: [],
      },
      {
        id: 'deployment',
        title: 'Deployment Workflows',
        description: 'Deploy apps automatically',
        duration: '10 min',
        content: `# Deployment with GitHub Actions

## Deploy to VPS Example

\`\`\`yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/app
            git pull origin main
            npm install
            npm run build
            pm2 restart all
\`\`\`

## Deploy to Vercel/Netlify
Use their official GitHub Actions for one-click deployment.
`,
        commands: [],
      },
    ],
  },
];

export const gitCommands = [
  { command: 'git init', description: 'Initialize a new Git repository', category: 'Setup' },
  { command: 'git clone <url>', description: 'Clone a remote repository', category: 'Setup' },
  { command: 'git add <file>', description: 'Stage changes for commit', category: 'Staging' },
  { command: 'git add .', description: 'Stage all changes', category: 'Staging' },
  { command: 'git commit -m "message"', description: 'Commit staged changes', category: 'Commit' },
  { command: 'git status', description: 'Check working tree status', category: 'Info' },
  { command: 'git log', description: 'View commit history', category: 'Info' },
  { command: 'git log --oneline', description: 'Compact commit history', category: 'Info' },
  { command: 'git diff', description: 'Show unstaged changes', category: 'Info' },
  { command: 'git branch', description: 'List, create, or delete branches', category: 'Branching' },
  { command: 'git checkout <branch>', description: 'Switch to a branch', category: 'Branching' },
  { command: 'git checkout -b <branch>', description: 'Create and switch to new branch', category: 'Branching' },
  { command: 'git merge <branch>', description: 'Merge a branch into current', category: 'Branching' },
  { command: 'git pull', description: 'Fetch and merge remote changes', category: 'Remote' },
  { command: 'git push', description: 'Push commits to remote', category: 'Remote' },
  { command: 'git remote add origin <url>', description: 'Add remote repository', category: 'Remote' },
  { command: 'git stash', description: 'Temporarily save changes', category: 'Advanced' },
  { command: 'git stash pop', description: 'Apply stashed changes', category: 'Advanced' },
  { command: 'git reset HEAD~1', description: 'Undo last commit (keep changes)', category: 'Advanced' },
  { command: 'git revert <commit>', description: 'Create new commit undoing changes', category: 'Advanced' },
];

export const quizzes: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What command initializes a new Git repository?',
    options: ['git start', 'git init', 'git new', 'git create'],
    correctAnswer: 1,
    explanation: 'git init creates a new Git repository in the current directory.',
  },
  {
    id: 'q2',
    question: 'What does "git add ." do?',
    options: ['Deletes all files', 'Stages all changes', 'Commits all changes', 'Shows all files'],
    correctAnswer: 1,
    explanation: 'git add . stages all new, modified, and deleted files for the next commit.',
  },
  {
    id: 'q3',
    question: 'Which command creates a new branch?',
    options: ['git branch new', 'git new branch', 'git create branch', 'git branch --new'],
    correctAnswer: 0,
    explanation: 'git branch <name> creates a new branch without switching to it.',
  },
  {
    id: 'q4',
    question: 'What is a pull request?',
    options: [
      'A command to pull code',
      'A request to merge changes',
      'A way to delete branches',
      'A type of commit'
    ],
    correctAnswer: 1,
    explanation: 'A pull request proposes changes and requests review before merging.',
  },
  {
    id: 'q5',
    question: 'What does "git stash" do?',
    options: [
      'Deletes changes permanently',
      'Temporarily saves uncommitted changes',
      'Commits changes automatically',
      'Creates a new branch'
    ],
    correctAnswer: 1,
    explanation: 'git stash temporarily stores modified and staged changes for later use.',
  },
];
