const mongoose = require('mongoose');

const corridorSchema = new mongoose.Schema({
  name: String,
  currentRiskScore: Number, // 0-100
  history30d: [Number],
  activeSignals: [String]
});

const signalSchema = new mongoose.Schema({
  sourceType: String, // news, AIS, sanctions, price
  corridorId: mongoose.Schema.Types.ObjectId,
  summary: String,
  severity: String, // low, medium, high, critical
  timestamp: Date,
  sourceUrl: String
});

const scenarioSchema = new mongoose.Schema({
  name: String,
  params: {
    severityPct: Number,
    durationDays: Number,
    startDate: Date
  },
  computedImpacts: {
    refineryRunRate: [Number], // array for time series or single value
    fuelPrice: [Number],
    powerStress: [Number],
    gdpImpact: [Number]
  }
});

const supplierSchema = new mongoose.Schema({
  name: String,
  country: String,
  gradeCompatibility: [String],
  basePrice: Number,
  currentPremium: Number
});

const routeSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  distanceNm: Number,
  transitDays: Number,
  congestionLevel: String, // low, medium, high
  riskCorridorId: mongoose.Schema.Types.ObjectId,
  pathCoordinates: [[Number]] // [lng, lat] arrays for mapbox/leaflet mapping
});

const recommendationSchema = new mongoose.Schema({
  supplierId: mongoose.Schema.Types.ObjectId,
  routeId: mongoose.Schema.Types.ObjectId,
  compositeScore: Number,
  confidence: Number,
  generatedAt: { type: Date, default: Date.now },
  status: String // pending, accepted, rejected
});

const incidentSchema = new mongoose.Schema({
  firstSignalAt: Date,
  scenarioRunAt: Date,
  recommendationAt: Date,
  actionedAt: Date,
  title: String,
  status: String
});

const Corridor = mongoose.model('Corridor', corridorSchema);
const Signal = mongoose.model('Signal', signalSchema);
const Scenario = mongoose.model('Scenario', scenarioSchema);
const Supplier = mongoose.model('Supplier', supplierSchema);
const Route = mongoose.model('Route', routeSchema);
const Recommendation = mongoose.model('Recommendation', recommendationSchema);
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = {
  Corridor,
  Signal,
  Scenario,
  Supplier,
  Route,
  Recommendation,
  Incident
};
