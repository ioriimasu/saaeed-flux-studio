# Deployment Checklist

## Pre-deployment Verification

### ✅ Build & Test
- [x] `npm run build` succeeds without errors
- [x] `npm run start` serves production build correctly
- [x] All TypeScript errors resolved
- [x] Security headers configured and working

### ✅ Node & Engines
- [x] Pin Node in package.json: `"engines": { "node": ">=18.17 <21" }`

### ✅ Environment Variables
- [x] `.env.example` created with all required variables
- [x] `.env` is in `.gitignore`
- [x] No sensitive data committed to version control
- [x] Client-side variables prefixed with `NEXT_PUBLIC_`

### ✅ App Router Features
- [x] Error boundaries (`error.tsx`) implemented
- [x] 404 page (`not-found.tsx`) implemented
- [x] Metadata configured with `metadataBase`
- [x] All components using browser APIs marked with `'use client'`

### ✅ SEO & Crawlers
- [x] `metadataBase` set to production URL
- [x] `app/robots.ts` and `app/sitemap.ts` present

### ✅ Loading & Error UX
- [x] Route-level error boundaries
- [ ] Route-level `loading.tsx` for data-heavy routes

### ✅ Monitoring
- [x] `/api/health` endpoint returning `{ ok: true }`
- [ ] Error tracking enabled (Sentry, LogRocket, or Vercel Analytics)

### ✅ CI
- [x] CI runs: install → typecheck → lint → build
- [x] `NEXT_TELEMETRY_DISABLED=1` in CI to reduce noise

### ✅ Security
- [x] Security headers configured in `next.config.mjs`
- [x] Image domains configured (`images.domains` or `images.remotePatterns`)
- [x] No sensitive data in client-side code

## Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository
2. Framework: **Next.js** (auto-detected)
3. Build Command: `next build` (default)
4. Output Directory: (none — for Next.js on Vercel, leave this blank)
5. Set environment variables in Project Settings
6. Deploy

### Other Platforms
- Ensure Node.js 18.17+ runtime
- Set build command: `npm run build`
- Set start command: `npm run start`
- Configure environment variables
- Ensure port binding to `process.env.PORT || 3000`

## Bundle Analysis

To analyze bundle size:

```bash
ANALYZE=true npm run build
```

## Post-deployment Verification

### Test Core Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] All sections render properly
- [ ] Contact form functions (if applicable)
- [ ] 404 page displays for invalid routes
- [ ] Error boundaries catch and display errors gracefully
- [ ] `/api/health` returns `{ ok: true }`

### Performance & SEO
- [ ] Lighthouse score > 90
- [ ] Meta tags and Open Graph images work
- [ ] Images load and optimize correctly
- [ ] Static assets cache properly
- [ ] `/robots.txt` and `/sitemap.xml` accessible

### Security
- [ ] Security headers present in response
- [ ] No sensitive data exposed in client
- [ ] HTTPS enforced
- [ ] CSP headers (add later if needed)

## Monitoring Setup

Consider adding:
- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring

## Rollback Plan

If issues occur:
1. Revert to previous deployment
2. Check error logs
3. Test fixes locally
4. Redeploy with fixes

---

**Migration Status**: ✅ Complete - Vite to Next.js migration successful with production hardening
**Last Updated**: 2025-09-15
**Build Status**: ✅ Passing