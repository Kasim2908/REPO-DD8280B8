# Git Advanced Notes — Day 3

## Overview

Today I practiced advanced Git concepts using the internship repository.

The main goal was to understand how Git handles:

- Branches
- Merging
- Merge conflicts
- Conflict resolution
- `git revert`
- `git reset`
- `git stash`
- Git history visualization

---

## 1. Git Log

### View Commit History

```bash
git log --oneline
```

Displays commits in a compact format.

Example:

```
13b4943 docs: add revert demo
5bc1514 merge: resolve conflict demo
ac93e05 docs: add staging environment
```

### View Graphical Commit History

```bash
git log --oneline --graph --all
```

Useful for understanding:

- Branches
- Merges
- Merge commits
- Different development paths

Example:

```
*   5bc1514 merge: resolve conflict demo
|\
| * 0ea8198 docs: update environment to production
| * f0c1c02 docs: add conflict demo
* | ac93e05 docs: add staging environment
|/
* 9254b94 docs: add Git branch practice
```

---

## 2. Git Branching

A branch is an independent line of development.

**Create a Branch**

```bash
git branch git-practice
```

**Switch to a Branch**

```bash
git switch git-practice
```

**Create and Switch in One Command**

```bash
git switch -c new-branch
```

**List Branches**

```bash
git branch
```

**Show Branch Tracking Information**

```bash
git branch -vv
```

---

## 3. Fast-Forward Merge

A fast-forward merge happens when the target branch has not developed separately.

Example:

```
main
 |
 A
 |
 B
 |
 C
```

After merging:

```
main
 |
 A
 |
 B
 |
 C
```

Git simply moves the branch pointer forward.

Command:

```bash
git merge git-practice
```

Example output:

```
Fast-forward
```

---

## 4. Merge Conflicts

A merge conflict occurs when Git cannot automatically determine which changes should be kept.

This commonly happens when different branches modify the same part of a file.

**Example Conflict**

```
<<<<<<< HEAD
Environment: staging
=======
Environment: production
>>>>>>> conflict-demo
```

**Meaning**

| Marker | Meaning |
|---|---|
| `<<<<<<< HEAD` | Marks the current branch's version |
| `=======` | Separates the two versions |
| `>>>>>>> conflict-demo` | Marks the incoming branch's version |

---

## 5. Resolving a Merge Conflict

The basic workflow is:

```
Create branches
      ↓
Make different changes
      ↓
Merge
      ↓
CONFLICT
      ↓
Inspect the file
      ↓
Choose the correct content
      ↓
Remove conflict markers
      ↓
git add
      ↓
git commit
```

**Check Conflict Status**

```bash
git status
```

Example:

```
You have unmerged paths.
```

**Inspect the Conflicted File**

```bash
cat Week1/conflict-demo.md
```

**After Resolving**

Stage the file:

```bash
git add Week1/conflict-demo.md
```

Check status:

```bash
git status
```

Then complete the merge:

```bash
git commit -m "merge: resolve conflict demo"
```

---

## 6. Merge Commit

After resolving the conflict, Git created a merge commit.

Example:

```
5bc1514 merge: resolve conflict demo
```

The history looked like:

```
*   5bc1514 merge: resolve conflict demo
|\
| * 0ea8198 docs: update environment to production
| * f0c1c02 docs: add conflict demo
* | ac93e05 docs: add staging environment
|/
```

The `|\` structure shows that two development paths were merged together.

---

## 7. Git Revert

`git revert` is used to undo the effect of a commit without removing the original commit from history.

**Command**

```bash
git revert <commit-id>
```

Example:

```bash
git revert 13b4943
```

This created:

```
4d226a2 Revert "docs: add revert demo"
```

The history became:

```
13b4943 docs: add revert demo
        ↓
4d226a2 Revert "docs: add revert demo"
```

The original commit remains in Git history.

**Why Use Revert?**

`git revert` is generally safer when a commit has already been pushed or shared with other developers.

---

## 8. Git Reset

`git reset` moves the current branch's HEAD to another commit.

There are three important modes:

- `--soft`
- `--mixed`
- `--hard`

---

## 9. Git Reset --soft

Command:

```bash
git reset --soft HEAD~1
```

This moves HEAD back one commit but keeps the changes staged.

```
Commit removed from current history
        ↓
Changes preserved
        ↓
Changes remain STAGED
```

Example:

Before:

```
ee2508d docs: add reset demo
    ↑
   HEAD
```

After:

```bash
git reset --soft HEAD~1
```

The commit disappears from the current branch history, but its changes remain staged.

**Remember**

| `--soft` |
|---|
| Commit removed |
| Changes kept |
| Changes STAGED |

---

## 10. Git Reset --mixed

Command:

```bash
git reset --mixed HEAD~1
```

`--mixed` is also Git's default reset mode.

It moves HEAD backward and keeps the changes in the working directory, but does not keep them staged.

For a file introduced entirely by the removed commit, Git may show it as untracked.

```
--mixed

Commit removed
      ↓
Changes kept
      ↓
Changes UNSTAGED
```

**Remember**

| `--mixed` |
|---|
| Commit removed |
| Changes kept |
| Changes UNSTAGED |

---

## 11. Git Reset --hard

Command:

```bash
git reset --hard HEAD~1
```

This moves HEAD backward and also resets the staging area and working directory.

⚠️ It can discard uncommitted changes.

Conceptually:

```
--hard

Commit removed
      ↓
Working changes reset
      ↓
Uncommitted work can be DISCARDED
```

**Important Warning**

Be very careful with:

```bash
git reset --hard
```

Never use it casually when you have work that you may need.

---

## 12. Revert vs Reset

| Command | Commit History | Changes |
|---|---|---|
| `git revert` | Original commit remains | Creates a new undo commit |
| `git reset --soft` | Moves HEAD backward | Changes remain staged |
| `git reset --mixed` | Moves HEAD backward | Changes remain unstaged |
| `git reset --hard` | Moves HEAD backward | Changes can be discarded |

**Practical Rule**

For a commit that has already been pushed/shared:

```bash
git revert <commit-id>
```

is generally the safer approach.

For your own local history:

```bash
git reset
```

can be useful when you intentionally want to rewrite history.

---

## 13. Git Stash

`git stash` temporarily stores uncommitted changes so that the working directory can become clean.

Typical situation:

```
Working on Feature A
       ↓
Changes are unfinished
       ↓
Need to switch branches
       ↓
Don't want to commit yet
       ↓
git stash
       ↓
Working tree becomes clean
```

---

## 14. Basic Git Stash

Command:

```bash
git stash
```

By default, `git stash` does not include untracked files.

During practice, an untracked file produced:

```
Untracked files:
    Week1/stash-demo.md
```

Running:

```bash
git stash
```

returned:

```
No local changes to save
```

This happened because the file was untracked.

---

## 15. Stash Untracked Files

Use:

```bash
git stash -u
```

The `-u` option includes untracked files.

Example:

```bash
git stash -u
```

Output:

```
Saved working directory and index state WIP on main: ...
```

Afterwards:

```bash
git status
```

showed:

```
nothing to commit, working tree clean
```

---

## 16. View Stashes

Command:

```bash
git stash list
```

Example:

```
stash@{0}: WIP on main: 4d226a2 Revert "docs: add revert demo"
```

Each stash receives an identifier such as `stash@{0}`.

---

## 17. Restore Stashed Changes

Command:

```bash
git stash pop
```

This:

- Applies the latest stash.
- Removes the stash entry if the application succeeds.

Example:

```bash
git stash pop
```

Output included:

```
Dropped refs/stash@{0}
```

The previously stashed file was restored.

---

## 18. Git Stash Workflow

```
Uncommitted work
       ↓
git stash -u
       ↓
Work temporarily stored
       ↓
Working tree clean
       ↓
git stash list
       ↓
git stash pop
       ↓
Work restored
```

---

## 19. Important Git Commands Learned Today

```bash
# History
git log --oneline
git log --oneline --graph --all

# Branches
git branch
git branch -vv
git switch <branch>
git switch -c <branch>

# Merge
git merge <branch>

# Conflict resolution
git status
git add <file>
git commit

# Revert
git revert <commit-id>

# Reset
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1

# Stash
git stash
git stash -u
git stash list
git stash pop

# Repository status
git status
```

---

## 20. DevOps Best Practices

**Prefer Revert for Shared History**

If a bad commit has already been pushed:

```bash
git revert <commit-id>
```

Avoid rewriting shared history unless there is a specific reason.

**Check Status Frequently**

```bash
git status
```

Before important Git operations, check the current state of the repository.

**Inspect History**

```bash
git log --oneline --graph --all
```

Understanding history helps when troubleshooting merges and deployments.

**Be Careful With Reset**

Especially:

```bash
git reset --hard
```

It can discard work.

**Use Stash for Temporary Work**

When unfinished work needs to be temporarily put aside:

```bash
git stash -u
```

---

## 21. Key Takeaways

| Concept | Description |
|---|---|
| **Merge Conflict** | Git cannot automatically decide which changes to keep |
| **Revert** | Creates a new commit that undoes an earlier commit |
| **Reset** | Moves the branch pointer and can rewrite local history |
| **Soft Reset** | Removes the commit but keeps changes staged |
| **Mixed Reset** | Removes the commit but keeps changes unstaged |
| **Hard Reset** | Removes the commit and can discard working changes |
| **Stash** | Temporarily stores uncommitted work |
| **Stash -u** | Temporarily stores uncommitted work including untracked files |

---

## 22. Today's Practical Learning

Today I successfully practiced a complete Git conflict workflow:

```
Branch
  ↓
Make changes
  ↓
Merge
  ↓
Conflict
  ↓
Inspect conflict
  ↓
Resolve conflict
  ↓
Stage resolution
  ↓
Merge commit
```

I also practiced:

```
git revert
      ↓
git reset --soft
      ↓
git reset --mixed
      ↓
git stash -u
      ↓
git stash pop
```
