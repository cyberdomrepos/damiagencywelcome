# Git sync & workflow guide

This document contains practical, copy-paste Git commands and safe workflows for syncing your local workspace with the remote repository (origin/main), creating branches, pushing changes, handling conflicts, and common recovery tasks.

Intended audience: developers working on this repository using a Bash-compatible shell on Windows (e.g. Git Bash, WSL).

---

## Safety first — simple rules

- Prefer creating a branch for your work. Don't commit directly to `main` unless it's an emergency or you are the repo owner and understand the impact.
- Don't run `--hard` reset unless you understand it erases local changes. Back up work with `git stash` or create a patch before destructive commands.
- When collaborating, favor `git pull --rebase` or `git fetch && git rebase origin/main` to keep history linear.

---

## Common tasks & commands

Note: run commands from the repo root (where `.git` is). Replace `origin` and `main` if your remote or branch names differ.

### 1) Clone the repository (fresh)

```bash
git clone git@github.com:cyberdomrepos/damiagencywelcome.git
cd damiagencywelcome
```

or using HTTPS:

```bash
git clone https://github.com/cyberdomrepos/damiagencywelcome.git
cd damiagencywelcome
```

### 2) Get the latest from remote without changing your working tree

```bash
git fetch origin
```

This updates the remote refs (like `origin/main`) but doesn't change your checked-out branch.

### 3) Inspect differences between local branch and remote

```bash
# Show commits local has and remote doesn't
git log --oneline --left-right --graph origin/main...main

# Show file-level diff
git diff origin/main..main
```

### 4) Keep local `main` up-to-date (non-destructive)

If you want to sync your local `main` using rebase (recommended):

```bash
git checkout main
git fetch origin
git pull --rebase origin main
```

If you want a fast-forward-only update (fails if non-fast-forward):

```bash
git checkout main
git fetch origin
git pull --ff-only origin main
```

### 5) Force-reset your local main to match remote (destructive)

Use this when you want your local `main` to be exactly what `origin/main` currently is (WARNING: local commits or working files will be lost):

```bash
git fetch origin
git checkout main
# Remove local commits and changes — irrecoverable unless stashed or backed up
git reset --hard origin/main
```

If you have uncommitted changes you want to save first:

```bash
git stash push -m "WIP before hard reset"
# perform reset
git reset --hard origin/main
# if you want to re-apply the stash
git stash pop
```

### 6) Create a feature branch and push it upstream

```bash
# Create branch from main
git fetch origin
git checkout main
git pull --rebase origin main
git checkout -b feat/describe-your-change

# make changes, then stage & commit
git add .
git commit -m "feat: short description"

# Push and set upstream
git push -u origin feat/describe-your-change
```

Create a PR from that branch using GitHub UI or your Git provider.

### 7) Update your feature branch with the latest main

Option A — rebase (keeps a linear history):

```bash
git checkout feat/describe-your-change
git fetch origin
git rebase origin/main
# resolve conflicts if necessary, then continue
git rebase --continue
# finally push (force-push because history changed)
git push --force-with-lease
```

Option B — merge (keeps merge commits):

```bash
git checkout feat/describe-your-change
git fetch origin
git merge origin/main
# fix conflicts if any, commit merge, then push normally
git push
```

### 8) Stashing and recovering local WIP

```bash
# Save changes
git stash push -m "WIP: short note"
# See stash list
git stash list
# Apply last stash (keep stash copy)
git stash apply
# OR apply and remove from stash
git stash pop
# Create a branch from stash content
git stash branch wip-branch
```

### 9) Recovering accidental commits / undoing local commits

- Undo the last local commit but keep changes staged:

```bash
git reset --soft HEAD~1
```

- Undo last commit and unstage (keep changes in working tree):

```bash
git reset --mixed HEAD~1
```

- Revert a specific commit safely (creates a new commit that undoes it):

```bash
git revert <commit-hash>
```

### 10) Resolving conflicts (general flow)

When rebase or merge reports conflicts:

1. Open conflicting files and resolve the markers (`<<<<<<<`, `=======`, `>>>>>>>`).
2. Stage resolved files:

```bash
git add path/to/resolved-file
```

3. Continue the operation:

- For merge:

```bash
git commit  # finish the merge
```

- For rebase:

```bash
git rebase --continue
```

4. If you need to abort the rebase or merge:

```bash
git rebase --abort
# or
git merge --abort
```

### 11) Push after rebasing — use safe force

After a rebase you must update the remote branch. Use `--force-with-lease` to avoid clobbering remote work:

```bash
git push --force-with-lease origin feat/describe-your-change
```

`--force-with-lease` ensures you don't overwrite upstream changes you don't have locally.

### 12) Inspect repo state & history

```bash
# show branch/status
git status -sb

# see branch graph
git log --oneline --graph --decorate --all --boundary -n 200

# see remote branches
git branch -r
```

### 13) Tagging and pushing tags

```bash
# create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0"
# push this tag
git push origin v1.2.0
# or push all tags
git push --tags
```

### 14) Force overwrite remote branch with local (use with caution)

If you truly need to replace `origin/main` with your local `main` (rare and dangerous), run as repo admin:

```bash
# Only when absolutely necessary and you understand consequences
git push --force-with-lease origin main:main
```

Prefer opening a PR and merging instead.

### 15) Verifying build & tests before pushing (recommended)

Run local checks before creating PRs:

```bash
# install or ensure deps up-to-date
npm install
# run lint
npm run lint
# run tests
npm test
# or run the Next build to validate TypeScript/production compilation
npm run build
```

If `npm run build` fails locally, fix the errors before pushing.

---

## Example conservative workflow to align local to remote (safe)

1. Save local WIP:

```bash
git stash push -m "WIP before sync"
```

2. Update `main`:

```bash
git fetch origin
git checkout main
git pull --rebase origin main
```

3. Create a working branch from up-to-date main:

```bash
git checkout -b feat/some-change
```

4. Re-apply WIP if needed:

```bash
git stash pop
```

5. Work, commit, push, create PR.

---

## Troubleshooting & tips

- "I don't see the new modal or UI change" — check localStorage for dismissal keys (for this repo the modal uses `inprogress:dismissed`):

```bash
# in browser console
localStorage.removeItem('inprogress:dismissed')
window.location.reload()
```

- If you accidentally commit to `main` and want to move history to a branch:

```bash
# create branch from current HEAD
git branch fix/saved-main
# reset main to remote
git fetch origin
git checkout main
git reset --hard origin/main
# push the new branch
git push -u origin fix/saved-main
```

- Use `git status` and `git log --oneline --graph` frequently.

## Recommended Git aliases (optional)

Add helpful aliases to `~/.gitconfig`:

```ini
[alias]
  st = status -sb
  lg = log --oneline --graph --decorate --all
  co = checkout
  br = branch
  unstage = reset HEAD --
```

---

## Summary & best-practices

- Always create a branch for work.
- Pull/rebase frequently to reduce conflicts.
- Use `--force-with-lease` when pushing rebased branches.
- Use `git stash` to save WIP before destructive operations.
- Verify the project builds locally (`npm run build`) before pushing PRs.

---

If you want, I can:

- Add a short `README.md` at the repo root pointing to this `docs/GIT_SYNC.md`.
- Create a small script (e.g. `scripts/sync-main.sh`) with safe wrappers for common tasks.
- Create a branch and open a PR with these docs.

Tell me which of those you'd like next.
