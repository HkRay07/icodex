# iCodeX Academy Website

A modern, responsive website for iCodeX Academy with pre-registration functionality.

## Features

- 🎨 Modern, responsive design with TailwindCSS
- ✨ Smooth animations with Framer Motion
- 📱 Mobile-first design with bottom navigation
- 📝 Pre-registration form with data storage
- 🚀 Serverless backend with Netlify Functions

## Deployment Instructions

### 1. Deploy to Netlify

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Deploy settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Click "Deploy site"

### 2. Access Your Data

After deployment, your registrations will be stored in:
- **Netlify Dashboard** → Your Site → Functions → `submit-registration`
- **Data file**: `netlify/data/registrations.json`

### 3. View Registrations

You can view all registrations by visiting:
```
https://your-site.netlify.app/api/get-registrations
```

## File Structure

```
icodex/
├── index.html              # Homepage
├── pre-register.html       # Pre-registration form
├── netlify.toml           # Netlify configuration
├── netlify/
│   └── functions/
│       ├── submit-registration.js  # Handle form submissions
│       └── get-registrations.js    # Retrieve registrations
└── README.md
```

## Features

### Homepage (`index.html`)
- Hero section with animated code editor
- Programs showcase with hover effects
- Community section with Discord integration
- Mobile bottom navigation
- Scroll-to-top button

### Pre-Registration (`pre-register.html`)
- Animated form with validation
- Loading states and error handling
- Success animation with celebration
- Data stored in JSON file via Netlify Functions

### Backend (Netlify Functions)
- `submit-registration.js`: Handles form submissions
- `get-registrations.js`: Retrieves stored data
- Automatic CORS handling
- Input validation and error handling

## Customization

### Colors
Edit `tailwind.config` in each HTML file:
```javascript
colors: {
  brand: { 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490' },
  accent: { 600: '#16a34a', 700: '#15803d' }
}
```

### Form Fields
Modify the form fields in `pre-register.html` and update the validation in `submit-registration.js`.

## Support

For issues or questions:
1. Check the Netlify Functions logs in your dashboard
2. Verify the form data is being sent correctly
3. Check browser console for any JavaScript errors

---

Built with ❤️ for iCodeX Academy
