# Central Automations Website

A modern, professional website for Central Automations - a B2B lead generation agency specializing in recruitment agencies.

## Features

- Professional homepage with hero section and clear value proposition
- About section highlighting company expertise  
- Services section showcasing automation solutions
- Process section explaining the workflow
- Contact form for lead generation
- Responsive design with modern styling
- Dark/light theme support

## GitHub Pages Deployment

This website is optimized for GitHub Pages deployment as a static site.

### Setup Instructions

1. **Fork or clone this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the site:**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "main" branch and "/dist" folder
   - Save the settings

5. **Update the base URL (if needed):**
   - If deploying to a custom path (e.g., `username.github.io/repository-name`), update the `base` property in `vite.config.ts`:
   ```ts
   base: "/your-repository-name/"
   ```

### Contact Form Integration

The contact form currently uses a `mailto:` link to open the user's email client. For better integration, consider using:

- **Formspree**: Easy form handling service
- **EmailJS**: Send emails directly from the frontend
- **Netlify Forms**: If deploying to Netlify instead
- **GitHub Actions**: Custom form processing workflow

### Development

- **Start development server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`

### Customization

- Update brand colors in `src/index.css`
- Modify content in component files under `src/components/`
- Replace logo in `attached_assets/` folder
- Update contact information in footer component

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui components
- Wouter for routing
- Lucide React for icons

## License

MIT License