# Travel Website Documentation

## Project Overview
This project is a modern travel website built with React, TypeScript, and Vite. It features a visually appealing UI, dynamic holiday and destination listings, and a user-friendly search experience.

## Features
- Responsive navigation bar with dropdowns for destinations and holiday deals
- Hero image and holiday carousels
- Detailed destination and offer pages
- Themed with custom colors and typography
- Enhanced search overlay for quick site-wide search
- Modular, scalable component structure
- will be updated (time to time)

## Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url> (added soon)
   cd travel_website
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Project
Start the development server with:
```bash
npm run dev
```
The site will be available at `http://localhost:5173` by default.

## Project Structure
```
travel_website/
  ├── public/                # Static assets
  ├── src/
  │   ├── assets/           # Images and logos
  │   ├── components/       # Reusable React components
  │   ├── hooks/            # Custom React hooks
  │   ├── pages/            # Page-level components
  │   ├── services/         # Data fetching and business logic
  │   ├── theme/            # Theme and style configuration
  │   ├── types/            # TypeScript type definitions
  │   ├── index.css         # Global styles
  │   ├── App.tsx           # Main app component
  │   └── main.tsx          # App entry point
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  └── README.md
```

## Theming
- Theme configuration is in `src/theme/theme.ts`.
- Uses custom primary and secondary colors, background, and typography.
- All MUI components are styled to match the brand.

**Recent Update:**
- The `HolidayCarousel` heading now uses the theme's dark blue (`primary.dark`).
- The subtitle below the heading uses the theme's light blue (`secondary.light`).

## Main Components
- **Navbar**: Main navigation bar with dropdowns and search icon.
- **HeroImageCarousel**: Rotating hero images on the homepage.
- **HolidayCarousel**: Carousel for holiday offers. The heading and subtitle colors are now aligned with the theme for improved visual consistency.
- **SearchOverlay**: Fullscreen search modal for quick site search.
- **DestinationDetail, Destinations, HolidayDeals2025, etc.**: Page components for various site sections.

## Using the Search Overlay
- Click the search icon in the navbar to open the overlay.
- Enter a keyword and press Enter or click 'Search'.
- Click a popular search to auto-search for that term.
- Click the close (X) button or press Escape to close the overlay.
- The overlay is styled to match the site theme and is accessible from any page.

## Customization
- To change theme colors or fonts, edit `src/theme/theme.ts`.
- To add or modify destinations/offers, update the relevant service files in `src/services/` and page components in `src/pages/`.

---
For further development or deployment instructions, see the README.md or contact the project maintainer. 
Saad Abdullah 
+92-320-7480116