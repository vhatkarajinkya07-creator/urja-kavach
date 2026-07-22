const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const {
  Corridor,
  Signal,
  Scenario,
  Recommendation,
  Route,
  Supplier,
  Incident
} = require('./models');

// Mock Data Seeding Function
const seedDB = async () => {
  await mongoose.connection.dropDatabase();
  console.log('Database cleared for seeding');

  const c1 = await Corridor.create({
    name: 'Strait of Hormuz',
    currentRiskScore: 82,
    history30d: [60, 62, 61, 65, 70, 75, 78, 80, 82],
    activeSignals: ['High tension in Persian Gulf', 'Naval drills']
  });

  const c2 = await Corridor.create({
    name: 'Red Sea / Bab-el-Mandeb',
    currentRiskScore: 65,
    history30d: [50, 52, 53, 58, 60, 62, 64, 65, 65],
    activeSignals: ['Houthi activity reported']
  });

  const s1 = await Scenario.create({
    name: 'Hormuz Partial Closure',
    params: { severityPct: 40, durationDays: 15, startDate: new Date() },
    computedImpacts: {
      refineryRunRate: [100, 95, 85, 70, 70, 80],
      fuelPrice: [100, 105, 115, 130, 130, 125],
      powerStress: [20, 30, 45, 60, 60, 50],
      gdpImpact: [0, -0.1, -0.3, -0.8, -0.8, -0.5]
    }
  });

  const r1 = await Route.create({
    origin: 'Ras Tanura, Saudi Arabia',
    destination: 'Vadinar, India',
    distanceNm: 1500,
    transitDays: 5,
    congestionLevel: 'medium',
    riskCorridorId: c1._id,
    pathCoordinates: [[50.0, 26.6], [55.0, 26.0], [56.4, 24.5], [60.0, 23.0], [69.6, 22.3]]
  });

  const sup1 = await Supplier.create({
    name: 'Saudi Aramco (Arab Light)',
    country: 'Saudi Arabia',
    gradeCompatibility: ['Medium', 'Sour'],
    basePrice: 85.50,
    currentPremium: 2.30
  });

  await Recommendation.create({
    supplierId: sup1._id,
    routeId: r1._id,
    compositeScore: 88,
    confidence: 92,
    status: 'pending'
  });

  await Incident.create({
    firstSignalAt: new Date(Date.now() - 86400000),
    scenarioRunAt: new Date(Date.now() - 80000000),
    recommendationAt: new Date(Date.now() - 75000000),
    actionedAt: null,
    title: 'Hormuz Escort Warning',
    status: 'Active'
  });

  // Adding a few signals
  await Signal.create({
    sourceType: 'news',
    corridorId: c1._id,
    summary: 'US sanctions announcement on regional shipping entities.',
    severity: 'high',
    timestamp: new Date(Date.now() - 3600000),
    sourceUrl: 'https://example.com/news'
  });

  console.log('Mock Data Seeded');
};

const startServer = async () => {
  let mongoUri = process.env.MONGODB_URI;

  // Use memory server if URI not provided
  if (!mongoUri) {
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    console.log('Using in-memory MongoDB');
  }

  mongoose.connect(mongoUri)
    .then(async () => {
      console.log('MongoDB connected');
      await seedDB();
      
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
};

// Routes
app.get('/api/corridors', async (req, res) => {
  const corridors = await Corridor.find();
  res.json(corridors);
});

app.get('/api/signals', async (req, res) => {
  const signals = await Signal.find().sort({ timestamp: -1 }).limit(20);
  res.json(signals);
});

app.get('/api/scenarios', async (req, res) => {
  const scenarios = await Scenario.find();
  res.json(scenarios);
});

app.post('/api/scenarios/simulate', async (req, res) => {
  const { scenarioId, params } = req.body;
  const scenario = await Scenario.findById(scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  
  const scale = params.severityPct / 100;
  scenario.computedImpacts.refineryRunRate = scenario.computedImpacts.refineryRunRate.map(v => v * (1 - (scale/4)));
  scenario.computedImpacts.fuelPrice = scenario.computedImpacts.fuelPrice.map(v => v * (1 + (scale/4)));
  
  res.json(scenario);
});

app.get('/api/recommendations', async (req, res) => {
  const recommendations = await Recommendation.find().populate('supplierId').populate('routeId').sort({ compositeScore: -1 });
  res.json(recommendations);
});

app.get('/api/incidents', async (req, res) => {
  const incidents = await Incident.find().sort({ firstSignalAt: -1 });
  res.json(incidents);
});

app.get('/api/reserves', async (req, res) => {
  res.json({
    currentCoverDays: 9.5,
    drawdownSchedule: [9.5, 9.0, 8.2, 7.5, 6.9, 6.5, 6.0],
    replenishmentWindow: '2026-08-15'
  });
});

startServer();
