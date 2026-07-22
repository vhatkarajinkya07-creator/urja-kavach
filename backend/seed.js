const mongoose = require('mongoose');
require('dotenv').config();
const { Corridor, Signal, Scenario, Supplier, Route, Recommendation, Incident } = require('./models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/urjakavach')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDB = async () => {
  await mongoose.connection.dropDatabase();
  console.log('Database dropped');

  // Corridors
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

  // Scenarios
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

  // Routes
  const r1 = await Route.create({
    origin: 'Ras Tanura, Saudi Arabia',
    destination: 'Vadinar, India',
    distanceNm: 1500,
    transitDays: 5,
    congestionLevel: 'medium',
    riskCorridorId: c1._id,
    pathCoordinates: [[50.0, 26.6], [55.0, 26.0], [56.4, 24.5], [60.0, 23.0], [69.6, 22.3]]
  });

  // Suppliers
  const sup1 = await Supplier.create({
    name: 'Saudi Aramco (Arab Light)',
    country: 'Saudi Arabia',
    gradeCompatibility: ['Medium', 'Sour'],
    basePrice: 85.50,
    currentPremium: 2.30
  });

  // Recommendations
  await Recommendation.create({
    supplierId: sup1._id,
    routeId: r1._id,
    compositeScore: 88,
    confidence: 92,
    status: 'pending'
  });

  // Incidents
  await Incident.create({
    firstSignalAt: new Date(Date.now() - 86400000),
    scenarioRunAt: new Date(Date.now() - 80000000),
    recommendationAt: new Date(Date.now() - 75000000),
    actionedAt: null,
    title: 'Hormuz Escort Warning',
    status: 'Active'
  });

  console.log('Database seeded successfully');
  process.exit();
};

seedDB();
