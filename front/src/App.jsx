import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import FloatingChatButton from './components/FloatingChatButton';
import HomePage from './pages/HomePage';
import PainDiagnosisPage from './pages/PainDiagnosisPage';
import ExerciseVideosPage from './pages/ExerciseVideosPage';
import NutritionPage from './pages/NutritionPage';
import ChatPage from './pages/ChatPage';
import MedicationPage from './pages/MedicationPage';
import SymptomsPage from './pages/SymptomsPage';
import HealthProblemsPage from './pages/HealthProblemsPage';
import ContactPage from './pages/ContactPage';
import EmergencyContactPage from './pages/EmergencyContactPage';
import PersonalSpacePage from './pages/PersonalSpacePage';
import Appointments from './components/Appointment';
import MedicationTracker from './components/MedicationTracker';
import PainLevel from './components/PainLevel';
import AnomalyReport from './components/AnomalyReport';
import FileUpload from './components/Records';

const AppContent = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pain-diagnosis" element={<PainDiagnosisPage />} />
          <Route path="/exercise-videos" element={<ExerciseVideosPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/medication" element={<MedicationPage />} />
          <Route path="/symptoms" element={<SymptomsPage />} />
          <Route path="/health-problems" element={<HealthProblemsPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/emergency-contact" element={<EmergencyContactPage />} />
          <Route path="/personal-space" element={<PersonalSpacePage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medication-tracker" element={<MedicationTracker />} />
          <Route path="/pain-level" element={<PainLevel />} />
          <Route path="/anomaly-report" element={<AnomalyReport />} />
          <Route path="/records" element={<FileUpload />} />
        </Routes>
      </main>
      {!isChatPage && <FloatingChatButton />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;