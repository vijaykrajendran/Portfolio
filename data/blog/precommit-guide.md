---
title: 'Automate Your Code Checks with pre-commit: A Beginners Guide'
date: '2025-11-17'
tags: ['pre-commit', 'Git Hooks', 'DevOps', 'Code Quality', 'CI/CD', 'Best Practices']
draft: false
summary: 'Learn how to set up pre-commit to automatically catch code issues, enforce quality standards, and prevent common mistakes before they enter your repository. Perfect for teams moving fast without sacrificing code quality.'
images: ['/static/blogs/blog-precommit.webp']
authors: ['default']
---

## Introduction

Modern development teams move fast—but fast commits can mean inconsistent formatting, sneaky bugs, and even leaked secrets. That's where **pre-commit** comes in. This guide walks you through setting up automatic code checks that run before every commit, helping you maintain clean, quality code across your entire project.

## What Is pre-commit?

`pre-commit` is a **framework for managing Git hooks**—scripts that run at specific points in the Git lifecycle. Instead of writing custom scripts in `.git/hooks`, the pre-commit framework gives you:

- A single config file: `.pre-commit-config.yaml`
- A standard way to install hooks across your team
- Easy access to a huge ecosystem of reusable checks (formatters, linters, security scanners, etc.)

Once configured, **every time you run `git commit`, pre-commit automatically runs your checks first.** If something fails, the commit is blocked until you fix it.

## How pre-commit Fits Into Your Git Workflow

### Without pre-commit:

```bash
git add .
git commit -m "Add feature"
# ✅ Commit succeeds (but maybe your code has issues?)
```

### With pre-commit:

```bash
git add .
git commit -m "Add feature"
# 🛑 pre-commit runs automatically:
# ✓ Checks formatting
# ✓ Looks for syntax errors
# ✓ Scans for security issues
# ✓ Runs validation
# If all pass ✅ → commit goes through
# If any fail ❌ → commit rejected, fix first!
```

The key: **Code is cleaned and validated before it enters your repository.**

## Installing pre-commit

You'll need Python installed on your system. Then install pre-commit:

```bash
pip install pre-commit
```

Verify installation:

```bash
pre-commit --version
```

## Creating .pre-commit-config.yaml

In the root of your Git repository (where `.git` lives), create a file named:

```
.pre-commit-config.yaml
```

Here's a solid starter configuration:

```yaml
repos:
  # Basic, high-value checks
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-toml
      - id: check-json
      - id: mixed-line-ending

  # Python code formatter
  - repo: https://github.com/psf/black
    rev: 24.4.2
    hooks:
      - id: black
        language_version: python3

  # Python linter
  - repo: https://github.com/pycqa/flake8
    rev: 7.0.0
    hooks:
      - id: flake8

  # Secret scanning
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.5.0
    hooks:
      - id: detect-secrets
```

### What This Configuration Gives You

- **Whitespace hygiene**: Trims trailing spaces, fixes missing newlines
- **Config sanity**: Validates YAML, TOML, and JSON files
- **Consistent formatting**: Black formats Python code automatically
- **Linting**: Flake8 catches Python style issues and potential bugs
- **Security**: Detects-secrets prevents committing API keys and passwords

## Installing the Git Hook

Once your `.pre-commit-config.yaml` is in place, run:

```bash
pre-commit install
```

This command:

- Creates `.git/hooks/pre-commit`
- Wires it to run the pre-commit framework every commit
- Only needs to be run once per repo clone

## Running pre-commit for the First Time

Before relying on it at commit time, test all hooks against your entire codebase:

```bash
pre-commit run --all-files
```

What happens:

- Each configured hook runs on all tracked files
- Some hooks auto-fix issues (e.g., whitespace, EOF)
- Others report errors/warnings for you to fix manually

### Typical Workflow

1. Run `pre-commit run --all-files`
2. Let hooks auto-fix what they can
3. Manually fix remaining issues
4. Re-run if needed
5. Commit once everything passes

## Example: Your First Commit with pre-commit

```bash
# Edit files
vim app.py
vim config.yaml

# Stage changes
git add app.py config.yaml

# Try to commit
git commit -m "Add new feature"

# Behind the scenes:
# - black reformats your Python file
# - flake8 spots missing imports or unused variables
# - yamllint validates your config
# - detect-secrets scans for credentials

# If all pass ✅ → commit succeeds
# If any fail ❌ → commit blocked, fix issues first
```

If the commit fails, fix the reported issues, stage again, and retry:

```bash
# Fix issues
vim app.py

# Stage fixes
git add app.py

# Retry commit
git commit -m "Add new feature"

# Now it should pass! ✅
```

## Useful Hooks for Different Tech Stacks

### Python Projects

```yaml
- repo: https://github.com/psf/black
  rev: 24.4.2
  hooks:
    - id: black
      language_version: python3

- repo: https://github.com/pycqa/isort
  rev: 5.13.2
  hooks:
    - id: isort

- repo: https://github.com/pycqa/flake8
  rev: 7.0.0
  hooks:
    - id: flake8
```

### YAML / GitOps / Kubernetes

```yaml
- repo: https://github.com/adrienverge/yamllint.git
  rev: v1.35.1
  hooks:
    - id: yamllint
```

### Terraform

```yaml
- repo: https://github.com/antonbabenko/pre-commit-terraform
  rev: v1.91.0
  hooks:
    - id: terraform_fmt
    - id: terraform_validate
```

### Shell Script Validation

```yaml
- repo: https://github.com/shellcheck-py/shellcheck-py
  rev: v0.9.0.5
  hooks:
    - id: shellcheck
```

## Running pre-commit in CI (GitHub Actions)

To enforce the same checks in CI/CD, create `.github/workflows/pre-commit.yml`:

```yaml
name: pre-commit

on: [push, pull_request]

jobs:
  pre-commit:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install pre-commit
        run: pip install pre-commit

      - name: Run pre-commit
        run: pre-commit run --all-files
```

Now every push and pull request runs the same hooks. If someone skips local checks, CI will catch it.

## Troubleshooting Common Issues

### Hooks Not Running at Commit Time

Check:

- Did you run `pre-commit install`?
- Is `.pre-commit-config.yaml` in the repo root?
- Is `pre-commit` in your PATH?

Run manually anytime with:

```bash
pre-commit run --all-files
```

### Authentication Issues

If hooks ask for username/password:

- One of your repos uses HTTPS and requires credentials
- Solution: Use SSH URLs for private repos or configure a credentials helper

### Bypassing Hooks (Emergency Only!)

```bash
git commit -m "Emergency fix" --no-verify
```

⚠️ **Use sparingly!** You're skipping important quality checks.

## Common pre-commit Commands

```bash
# Installation
pip install pre-commit

# Setup (once per project)
pre-commit install

# Testing
pre-commit run --all-files          # Test all files
pre-commit run                       # Test staged files only
pre-commit run <hook-id>             # Test specific hook

# Updating
pre-commit autoupdate                # Update all hooks to latest versions

# Maintenance
pre-commit clean                     # Clean cached environments
pre-commit uninstall                 # Remove hooks from Git
```

## Key Benefits

- **Automated code quality**: Checks run before every commit
- **Reduces code review noise**: No more "fix formatting" comments
- **Consistent team standards**: Everyone follows the same rules
- **Prevents common mistakes**: Catches syntax errors, secrets, formatting issues
- **Educational**: Teaches best practices as developers commit
- **CI/CD integration**: Same checks everywhere (local and pipeline)

## Next Steps

1. **Start simple**: Use basic hooks from `pre-commit-hooks`
2. **Add gradually**: Add language-specific hooks as you get comfortable
3. **Explore more**: Check the [full hooks registry](https://pre-commit.com/hooks.html)
4. **Share with team**: Help teammates set it up
5. **Integrate with CI**: Add pre-commit to your GitHub Actions or CI/CD pipeline

## Conclusion

pre-commit is a powerful yet simple tool that elevates code quality across your entire team. It catches mistakes early, maintains consistency, and lets developers focus on logic rather than formatting. By implementing pre-commit today, you're investing in cleaner, safer, more professional code for tomorrow.

**Start using pre-commit in your next project—your future self will thank you!**

---

**Happy committing! 🔁✨**
