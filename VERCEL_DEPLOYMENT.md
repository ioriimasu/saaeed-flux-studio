# 🚀 Vercel Deployment Guide

## Quick Deploy (Recommended)

### Option 1: GitHub Integration (Easiest)

1. **Go to [vercel.com](https://vercel.com) and sign in**
2. **Click "New Project"**
3. **Import your GitHub repository**: `ioriimasu/saaeed-flux-studio`
4. **Configure project settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm ci` (recommended)

5. **Environment Variables** (if needed):
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

6. **Click "Deploy"**

Your site will be live at: `https://saaeed-flux-studio-[random].vercel.app`

### Option 2: Vercel CLI with Token

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login with your token
vercel login

# Deploy from project root
cd saaeed-flux-studio
vercel --prod

# Follow the prompts:
# ? Set up and deploy "~/saaeed-flux-studio"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? saaeed-flux-studio
# ? In which directory is your code located? ./
```

## 🔧 Advanced Configuration

### Custom Domain Setup

1. **In Vercel Dashboard** → Your Project → Settings → Domains
2. **Add your custom domain**: `yourdomain.com`
3. **Configure DNS** with your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

### Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics (optional)

# Development (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build & Deploy Settings

Your `vercel.json` is already optimized with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm ci",
  "regions": ["iad1"],
  "functions": {
    "app/api/health/route.ts": {
      "maxDuration": 10
    }
  }
}
```

## 🛡️ Security & Performance

### Security Headers (Already Configured)

Your deployment includes these security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Performance Optimizations

- **Static Generation**: All pages are statically generated
- **Image Optimization**: Next.js Image component with Vercel's image optimization
- **Bundle Analysis**: Run `npm run analyze` to check bundle size
- **Edge Functions**: API routes run on Vercel's Edge Runtime

## 🔍 Monitoring & Health Checks

### Health Endpoint

Your deployment includes a health check endpoint:
- **URL**: `https://yourdomain.com/api/health`
- **Response**: `{"ok": true, "timestamp": "2024-01-01T00:00:00.000Z"}`
- **Alias**: `https://yourdomain.com/health` (redirects to API)

### Monitoring Setup

1. **Vercel Analytics** (Built-in):
   - Go to Project → Analytics tab
   - View real-time performance metrics

2. **External Monitoring** (Optional):
   ```bash
   # Add to your monitoring service
   curl https://yourdomain.com/health
   ```

## 🚀 Deployment Workflow

### Automatic Deployments

- **Production**: Pushes to `main` branch → Auto-deploy to production
- **Preview**: Pull requests → Auto-deploy preview URLs
- **Development**: Feature branches → Preview deployments

### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Deploy specific branch
git checkout feature-branch
vercel
```

## 🔧 Troubleshooting

### Common Issues

1. **Build Fails**:
   ```bash
   # Test build locally first
   npm run build
   
   # Check Node.js version (must be 18.17+)
   node --version
   ```

2. **Environment Variables**:
   - Ensure `NEXT_PUBLIC_` prefix for client-side variables
   - Redeploy after adding new environment variables

3. **Domain Issues**:
   - DNS propagation can take up to 48 hours
   - Use `dig yourdomain.com` to check DNS records

4. **Function Timeouts**:
   - API routes have 10-second timeout (configured in vercel.json)
   - For longer operations, consider background jobs

### Debug Commands

```bash
# Check deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Get deployment info
vercel inspect [deployment-url]
```

## 📊 Performance Checklist

- ✅ **Static Generation**: All pages are statically generated
- ✅ **Image Optimization**: Using Next.js Image component
- ✅ **Bundle Size**: Under 150KB first load JS
- ✅ **Security Headers**: Comprehensive security configuration
- ✅ **Health Monitoring**: `/api/health` endpoint available
- ✅ **SEO**: robots.txt and sitemap.xml configured
- ✅ **Error Handling**: Custom error pages and boundaries

## 🎯 Post-Deployment

### Verify Deployment

1. **Check main site**: `https://yourdomain.com`
2. **Test health endpoint**: `https://yourdomain.com/health`
3. **Verify security headers**:
   ```bash
   curl -I https://yourdomain.com
   ```
4. **Test mobile responsiveness**
5. **Check Lighthouse score**

### Optional Enhancements

1. **Google Analytics**: Add GA4 tracking ID to environment variables
2. **Sentry**: Add error tracking for production monitoring
3. **Uptime Monitoring**: Set up external health check monitoring
4. **CDN**: Vercel's global CDN is automatically configured

---

🎉 **Your Next.js application is now live on Vercel with production-grade configuration!**

For support, check the [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment).