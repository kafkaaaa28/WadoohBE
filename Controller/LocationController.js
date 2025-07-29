const axios = require('axios');

const LocationController = {
  CheckLocation: async (req, res) => {
    const { location } = req.body;

    try {
      const geoRes = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.GEOCODE_API}`);
      const { lat, lng } = geoRes.data.results[0].geometry;

      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.OPENWEATHER_API}`);
      const weather = weatherRes.data.main;

      const soilRes = await axios.get('https://rest.isric.org/soilgrids/v2.0/properties/query', {
        params: {
          lon: 107.6070833,
          lat: -6.9218457,
          property: ['bdod', 'phh2o'],
          value: 'mean',
        },
        headers: {
          Accept: 'application/json',
          'User-Agent': 'WadoohApp/1.0',
        },
      });
      const soil = soilRes.data.properties;

      res.json({
        location,
        coordinates: { lat, lng },
        weather,
        soil,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal mengambil data' });
    }
  },
  NewsApi: async (req, res) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=pertanian&language=id&apiKey=${process.env.BERITA_API_KEY}`);
      const data = await response.json();

      if (data.articles && Array.isArray(data.articles)) {
        const limitedArticles = data.articles.slice(0, 6);
        res.json({ articles: limitedArticles });
      } else {
        res.json({ articles: [] });
      }
    } catch (error) {
      console.error('Error from NewsAPI:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  },
};
module.exports = LocationController;
