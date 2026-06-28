import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function TaskForm({ initialData, onSubmit, onCancel, isLoading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'Pending',
      priority: 'Medium',
      dueDate: '',
    }
  });

  useEffect(() => {
    if (initialData) {
      // Format date for datetime-local or date input if needed
      const formattedData = {
        ...initialData,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      };
      reset(formattedData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
        <input
          {...register('title', { 
            required: 'Title is required',
            minLength: { value: 3, message: 'Minimum length is 3' }
          })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          placeholder="What needs to be done?"
        />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
        <textarea
          {...register('description', {
            maxLength: { value: 500, message: 'Maximum length is 500 characters' }
          })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow min-h-[100px]"
          placeholder="Add more details..."
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
          <select
            {...register('priority')}
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
        <input
          type="date"
          {...register('dueDate')}
          className="w-full bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : (initialData ? 'Update Task' : 'Create Task')}
        </button>
      </div>
    </form>
  );
}
