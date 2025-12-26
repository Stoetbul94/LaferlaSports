# GitHub Repository Setup Guide

Your code has been committed locally. Follow these steps to push it to GitHub:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `laferla-sports` (or your preferred name)
5. Description: "Professional e-commerce website for Laferla Sports - Official Capapie dealer in South Africa"
6. Choose **Public** or **Private** (your preference)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```powershell
# Navigate to your project directory
cd "C:\Users\User\Desktop\Laferla Sports"

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/laferla-sports.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```powershell
git remote add origin git@github.com:YOUR_USERNAME/laferla-sports.git
git branch -M main
git push -u origin main
```

## Step 3: Verify

After pushing, refresh your GitHub repository page. You should see all your files there!

## Future Updates

To push future changes:

```powershell
cd "C:\Users\User\Desktop\Laferla Sports"
git add .
git commit -m "Your commit message"
git push
```

## Important Notes

- **Never commit `.env.local`** - It's already in `.gitignore` to protect your secrets
- **Add product images** to `public/images/products/` before deploying
- **Set up environment variables** on your hosting platform (Vercel, Netlify, etc.)

## Next Steps After GitHub Setup

1. Consider setting up CI/CD with Vercel or Netlify for automatic deployments
2. Add product images to the repository
3. Configure environment variables on your hosting platform
4. Set up a custom domain (optional)


