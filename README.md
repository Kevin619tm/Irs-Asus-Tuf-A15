# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

✨ **Real-time Weather Data**
- Current weather conditions with detailed metrics
- 5-day weather forecast
- Temperature, humidity, wind speed, pressure, and more

📍 **Location Services**
- Search weather by city name
- Auto-detect location using geolocation
- Last searched city is saved locally

🎨 **Modern UI/UX**
- Responsive design that works on all devices
- Beautiful gradient background and smooth animations
- Weather icons that match current conditions
- Clean and intuitive interface

💾 **Local Storage**
- Remembers your last searched city
- Instant access to previous weather data

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Free API key from OpenWeatherMap

### Setup Instructions

1. **Get a Free API Key**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your default API key

2. **Add Your API Key**
   - Open `app.js`
   - Find line 4: `const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key

3. **Run the Application**
   - Open `index.html` in your web browser
   - The dashboard will load with New York's weather by default
   - Search for any city or use geolocation

## Usage

### Search by City
1. Type a city name in the search box
2. Press Enter or click the "Search" button
3. Weather data for that city will display

### Use Current Location
1. Click the 📍 button
2. Allow the browser to access your location
3. Weather data for your current location will display

## File Structure

```
weather-dashboard/
├── index.html      # Main HTML file with structure
├── styles.css      # CSS styling and responsive design
├── app.js          # JavaScript logic and API integration
└── README.md       # This file
```

## API Details

**API Provider:** OpenWeatherMap

**Free Tier Includes:**
- Current weather data
- 5-day forecast
- Geolocation support
- 60 requests per minute

**Endpoints Used:**
- `/weather` - Current weather
- `/forecast` - 5-day forecast

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - No dependencies, pure JS
- **Fetch API** - For API requests
- **Geolocation API** - For location detection
- **LocalStorage** - For persistent user preferences

## Customization

### Change Default Units
In `app.js`, replace `units=metric` with `units=imperial` to use Fahrenheit instead of Celsius.

### Change Default City
In `app.js`, line 31, replace `'New York'` with your preferred default city.

### Modify Colors
Edit the CSS variables in `styles.css` to customize the color scheme.

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### "City not found" Error
- Make sure you're entering the correct city name
- Try using the city name in English
- Use geolocation as an alternative

### No Weather Data Displays
- Verify your API key is correctly entered in `app.js`
- Check if your API key is active on OpenWeatherMap
- Ensure you have an internet connection
- Check browser console for error messages (F12)

### Geolocation Not Working
- Enable location access in browser settings
- Ensure the site is using HTTPS (if hosting online)
- Check if your browser supports geolocation

## Performance

- ⚡ Fast loading times with optimized API calls
- 📦 Lightweight (~15KB uncompressed)
- 🚀 No external dependencies
- 📱 Mobile-optimized with responsive design

## Future Enhancements

- [ ] Hourly weather updates
- [ ] Extended 16-day forecast
- [ ] Multiple city tracking
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Charts and graphs for data visualization
- [ ] Dark mode toggle
- [ ] Weather conditions translation

## License

Free to use and modify for personal and commercial projects.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Icons and design inspired by modern weather applications

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Visit [OpenWeatherMap Documentation](https://openweathermap.org/api)
3. Review browser console for error messages

---

Enjoy your weather dashboard! ☀️🌧️❄️
