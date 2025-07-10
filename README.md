# Personal Portfolio Website

A modern, responsive portfolio website built with React.js to showcase my professional journey, skills, and projects.

## 🚀 Features

- **Dark/Light Theme** - Toggle between dark and light modes for comfortable viewing
- **Responsive Design** - Optimized for all screen sizes (mobile, tablet, desktop)
- **Dynamic Content** - Easily updateable sections for:
  - Work Experience
  - Education
  - Projects
  - Skills & Technologies
  - Achievements
  - Contact Information
- **Performance Optimized** - Fast loading times with optimized assets
- **Modern UI/UX** - Clean, professional design with smooth animations

## 🛠️ Built With

- React.js
- SCSS for styling
- React Lottie for animations
- React Reveal for scroll animations
- GitHub API integration

## ⚙️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nilavra17ghosh/Basic_Portfolio.git
   cd Basic_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your GitHub token:
   ```
   REACT_APP_GITHUB_TOKEN=your_github_token
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The site will be available at `http://localhost:3000`

## 📝 Customization

1. Edit `src/portfolio.js` to update:
   - Personal Information
   - Work Experience
   - Education Details
   - Project Showcase
   - Skills & Achievements

2. Replace images in `src/assets/images/` with your own
3. Update social media links in `src/components/socialMedia/SocialMedia.js`
4. Modify color schemes in `src/_globalColor.scss`

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform (GitHub Pages, Netlify, Vercel, etc.)

## 📱 PWA Support

This portfolio is PWA (Progressive Web App) enabled. Users can install it on their devices for offline access.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 🙏 Acknowledgments

- Design inspiration from various portfolio templates
- React.js community for excellent documentation and support
- GitHub for providing API access for portfolio integration 
