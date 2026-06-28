import { Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const statusColors = {
    'Pending': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    'In Progress': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'Completed': 'text-green-400 bg-green-400/10 border-green-400/20',
  };

  const priorityColors = {
    'Low': 'text-gray-400 bg-gray-400/10',
    'Medium': 'text-orange-400 bg-orange-400/10',
    'High': 'text-red-400 bg-red-400/10',
  };

  const StatusIcon = {
    'Pending': Clock,
    'In Progress': AlertCircle,
    'Completed': CheckCircle2,
  }[task.status];

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col h-full transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold line-clamp-2" title={task.title}>
          {task.title}
        </h3>
        <span className={cn('px-2.5 py-1 text-xs font-semibold rounded-full flex-shrink-0', priorityColors[task.priority])}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-between items-center text-sm">
          <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full border', statusColors[task.status])}>
            <StatusIcon className="w-4 h-4" />
            <span>{task.status}</span>
          </div>
          
          {task.dueDate && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-white/10">
          <button 
            onClick={() => onEdit(task)}
            className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
