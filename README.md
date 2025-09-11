# SAAEED FLUX STUDIO

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and shadcn/ui components. Features 3D graphics, animations, and a sleek design.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd saaeed-flux-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: GSAP, Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **3D Graphics**: Interactive 3D elements using Three.js
- **Smooth Animations**: GSAP and Framer Motion for fluid transitions
- **Modern UI**: shadcn/ui components with custom styling
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized images and code splitting
- **Accessibility**: ARIA labels and keyboard navigation
- **SEO**: Meta tags and structured data

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Hero section
│   ├── Navigation.tsx  # Navigation bar
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   └── Contact.tsx     # Contact form
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── test/               # Test files
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Configure redirects for SPA routing

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 📝 Development

### Code Quality

- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks for quality checks

### Git Hooks

Pre-commit hooks automatically run:
- ESLint checks
- Prettier formatting
- TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact [your-email@example.com].

---

Built with ❤️ using React, TypeScript, and Tailwind CSS.