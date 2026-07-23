import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicPortal } from './components/PublicPortal';
import { HomeScreen } from './components/HomeScreen';
import type { Referral } from './types';

function App() {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const handleAddReferral = (newRef: Referral) => {
    setReferrals([newRef, ...referrals]);
    console.log('New referral submitted:', newRef);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/portal" element={<PublicPortal onAddReferral={handleAddReferral} />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;