import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { Projects } from '@/pages/Projects';
import { Contact } from '@/pages/Contact';
import { TermsOfUse } from '@/pages/TermsOfUse';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { PrivacyNotice } from '@/pages/PrivacyNotice';
import { Navigation } from '@/components/Navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Footer } from '@/components/Footer';
import { ScheduleModal } from '@/components/ScheduleModal';
import { RegisterModal } from '@/components/RegisterModal';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/termos" element={<TermsOfUse />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/politica-de-privacidade" element={<PrivacyNotice />} />
      </Routes>
      <Footer />
      <ScheduleModal />
      <RegisterModal />
    </div>
  );
}

export default App;