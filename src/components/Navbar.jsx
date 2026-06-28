import { CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="glass-panel sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between shadow-lg">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
          <CheckSquare className="w-6 h-6 text-primary-light" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          Task<span className="text-gradient">Tracker</span>
        </span>
      </Link>
      
      <div className="flex gap-4">
        {/* We can add more nav links or a theme toggle here later */}
      </div>
    </nav>
  );
}
