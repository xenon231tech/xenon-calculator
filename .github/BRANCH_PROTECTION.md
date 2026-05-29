# Branch Protection Rules

## Setup Instructions

To enable branch protection for the `main` branch:

1. Go to Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require code reviews before merging (1 approval)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Include administrators in restrictions

## Benefits

- Prevents accidental direct pushes to main
- Requires code review for all changes
- Ensures tests pass before merge
- Maintains code quality
- Protects production branch
