import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { useToast } from '../context/ToastContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { showToast } = useToast();

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await taskService.getAll();
      setTasks(res.data);
    } catch (error) {
      showToast('Failed to load tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        await taskService.update(editingTask._id, data);
        showToast('Task updated successfully');
      } else {
        await taskService.create(data);
        showToast('Task created successfully');
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to save task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.delete(id);
      showToast('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      showToast('Failed to delete task', 'error');
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
          <p className="text-gray-400">Manage your work efficiently and stay organized.</p>
        </div>
        
        <button 
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20 flex-shrink-0"
        >
          + Create Task
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-panel rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="bg-white/5 p-4 rounded-full mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">No tasks yet</h3>
          <p className="text-gray-400 max-w-sm mb-6">You haven't created any tasks yet. Click the button above to get started.</p>
          <button 
            onClick={openCreateModal}
            className="text-primary-light font-medium hover:underline"
          >
            Create your first task &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Edit Task" : "Create Task"}
      >
        <TaskForm 
          initialData={editingTask}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}
