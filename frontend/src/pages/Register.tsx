
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Landmark, User, Mail, Lock } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name || 'Rahul Sharma', email || 'citizen@gov.in');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#E8E6E1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#0F1A2B]">
      <div className="max-w-md w-full bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#0F1A2B] text-[#D1CFC9] border border-[#BDC4D4]/30 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Landmark className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#0F1A2B]">Citizen Registration</h2>
          <p className="text-xs text-[#52677D] mt-1 font-light">
            Create an account to save schemes and track customized recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#0F1A2B]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] placeholder-[#52677D]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1A2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#0F1A2B]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@gov.in"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] placeholder-[#52677D]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1A2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#0F1A2B]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] placeholder-[#52677D]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1A2B]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2">
            Create Citizen Account
          </Button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#BDC4D4]/60 text-xs text-[#52677D]">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#0F1A2B] hover:text-[#52677D] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
