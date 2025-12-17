# Editor Workflow Guide

A simple step-by-step process for creating content, testing locally, and publishing to the live website.

## Quick Workflow Overview

1. **Create** → Edit content online (GitHub web editor)
2. **Test** → Preview changes locally 
3. **Merge** → Integrate with main branch
4. **Release** → Publish to live website

## Step 1: Create Content Online

### Using GitHub Web Editor

1. **Navigate to Repository**
   - Go to the EDT website repository on GitHub
   - Browse to the content folder you need: `src/content/`

2. **Create New File**
   - Click "Add file" → "Create new file"
   - Follow naming conventions from [Quick Reference](quick-reference.md)
   - Add both English and French versions

3. **Edit Content**
   - Use the GitHub web editor
   - Add frontmatter (copy from templates)
   - Write your content in Markdown/MDX
   - Use "Preview" tab to check formatting

4. **Save as Draft**
   - Commit to a new branch (not main)
   - Use descriptive commit message
   - Branch name: `content/your-content-name`

### Example Branch Names
```
content/job-offer-pc1-postdoc
content/news-models2024-conference  
content/publication-digital-twins-survey
content/page-about-update
```

## Step 2: Test Locally

### Prerequisites
- Node.js installed on your computer
- Git repository cloned locally
- Basic terminal/command line knowledge

### Local Testing Process

1. **Switch to Your Branch**
   ```bash
   git checkout content/your-content-name
   git pull origin content/your-content-name
   ```

2. **Install Dependencies** (first time only)
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Preview Your Changes**
   - Open browser to `http://localhost:4321`
   - Navigate to your new content
   - Check both English and French versions
   - Verify images, links, and formatting

5. **Fix Issues**
   - Edit files locally if needed
   - Save changes (auto-reloads in browser)
   - Test again until satisfied

6. **Validate Content**
   ```bash
   npm run astro check
   ```
   - Fix any validation errors
   - Ensure no build errors

## Step 3: Merge with Main

### Create Pull Request

1. **Push Final Changes**
   ```bash
   git add .
   git commit -m "Add: [description of your content]"
   git push origin content/your-content-name
   ```

2. **Open Pull Request**
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Fill in description:
     ```
     ## Content Added
     - [x] English version
     - [x] French version
     - [x] Tested locally
     - [x] No validation errors
     
     ## Description
     Brief description of the content added/modified
     ```

3. **Review Process**
   - Wait for team review
   - Address any feedback
   - Make additional commits if needed

4. **Merge**
   - Once approved, merge pull request
   - Delete feature branch after merge

## Step 4: Create Release

### Prepare Release

1. **Verify Main Branch**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Final Build Test**
   ```bash
   npm run build
   npm run preview
   ```
   - Ensure production build works
   - Test your content in production mode

### Create GitHub Release

1. **Go to Releases**
   - Navigate to repository "Releases" section
   - Click "Create a new release"

2. **Tag Version**
   - Use semantic versioning: `v1.2.3`
   - Increment appropriately:
     - Major: Breaking changes
     - Minor: New content/features
     - Patch: Bug fixes/small updates

3. **Release Notes**
   ```markdown
   ## Content Updates
   
   ### Added
   - New job offer: PhD position in PC1
   - Event announcement: MODELS 2024 conference
   
   ### Updated
   - About page with latest team information
   - Publications list with recent papers
   
   ### Fixed
   - Broken links in resources section
   - Image optimization issues
   ```

4. **Publish Release**
   - Click "Publish release"
   - This triggers automatic deployment

## Deployment Process

### Automatic Deployment
- Release triggers GitHub Actions
- Website builds automatically
- Deploys to production server
- Usually takes 2-3 minutes

### Verify Deployment
1. **Check Live Website**
   - Visit the live EDT website
   - Navigate to your new content
   - Test both languages
   - Verify all links and images work

2. **Monitor for Issues**
   - Check for any broken functionality
   - Verify mobile responsiveness
   - Test social media sharing

## Quick Troubleshooting

### Common Issues

**Build Fails**
```bash
# Check for errors
npm run astro check

# Common fixes
- Fix frontmatter syntax
- Check image paths
- Verify required fields
```

**Content Not Showing**
```bash
# Clear cache and rebuild
rm -rf dist/
npm run build
```

**Images Not Loading**
- Check image exists in `src/assets/images/`
- Verify filename spelling in frontmatter
- Ensure image format is supported (JPG, PNG, SVG)

### Getting Help

**Before Asking for Help:**
1. Check validation errors: `npm run astro check`
2. Review your frontmatter against templates
3. Verify file naming conventions
4. Test locally first

**When to Ask for Help:**
- Build errors you can't resolve
- Complex content requiring custom components
- Issues with deployment or releases
- Questions about content strategy

## Best Practices

### Content Creation
- **Start Small**: Create simple content first
- **Test Early**: Preview locally before requesting review
- **Follow Conventions**: Use established patterns and naming
- **Both Languages**: Always create English and French versions

### Version Control
- **Descriptive Commits**: Clear commit messages
- **Small Changes**: One content piece per branch
- **Clean History**: Squash commits if needed
- **Delete Branches**: Clean up after merging

### Quality Assurance
- **Spell Check**: Review content before committing
- **Link Testing**: Verify all links work
- **Image Optimization**: Compress images before adding
- **Mobile Testing**: Check responsive design

## Workflow Checklist

### Before Starting
- [ ] Know what content you're creating
- [ ] Have necessary images and information
- [ ] Understand the target audience
- [ ] Check existing similar content for patterns

### During Creation
- [ ] Follow naming conventions
- [ ] Create both language versions
- [ ] Use proper frontmatter
- [ ] Optimize images before adding
- [ ] Write descriptive commit messages

### Before Merging
- [ ] Test locally with `npm run dev`
- [ ] Validate with `npm run astro check`
- [ ] Check both English and French versions
- [ ] Verify all links and images work
- [ ] Review content for accuracy

### After Release
- [ ] Verify content appears on live site
- [ ] Test functionality in production
- [ ] Monitor for any issues
- [ ] Update team on new content

## Resources

- [Quick Reference](quick-reference.md) - Cheat sheet for common tasks
- [Content Guides](README.md) - Detailed creation instructions
- [GitHub Workflow](https://docs.github.com/en/get-started/quickstart/github-flow) - Git workflow basics
- [Semantic Versioning](https://semver.org/) - Version numbering guidelines