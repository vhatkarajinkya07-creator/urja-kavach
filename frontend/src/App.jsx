import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import RiskIntelligence from './pages/RiskIntelligence';
import Scenarios from './pages/Scenarios';
import Procurement from './pages/Procurement';
import Reserves from './pages/Reserves';
import DigitalTwin from './pages/DigitalTwin';
import ResponseLog from './pages/ResponseLog';
import Architecture from './pages/Architecture';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/risk-intelligence" element={<RiskIntelligence />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/reserves" element={<Reserves />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/response-log" element={<ResponseLog />} />
            <Route path="/architecture" element={<Architecture />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
