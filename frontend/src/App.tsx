
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedSchemesProvider } from './context/SavedSchemesContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryDetail } from './pages/CategoryDetail';
import { Questionnaire } from './pages/Questionnaire';
import { Results } from './pages/Results';
import { SchemeDetails } from './pages/SchemeDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <AuthProvider>
      <SavedSchemesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#E8E6E1] flex flex-col font-sans text-[#0F1A2B] antialiased selection:bg-[#BDC4D4] selection:text-[#0F1A2B]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:slug" element={<CategoryDetail />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/results" element={<Results />} />
                <Route path="/scheme/:slug" element={<SchemeDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </SavedSchemesProvider>
    </AuthProvider>
  );
}

export default App;
