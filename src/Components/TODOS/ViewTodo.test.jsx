import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ViewTodo from './ViewTodo';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useTodo } from '../../Context/TodoContext';
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// 🔧 Mock useTodo
vi.mock('../../Context/TodoContext', async () => {
  const actual = await vi.importActual('../../Context/TodoContext');
  return {
    ...actual,
    useTodo: vi.fn(),
  };
});

const renderWithProviders = (todoList, id = '123') => {
  useTodo.mockReturnValue({ tasks: todoList });

  render(
    <MemoryRouter initialEntries={[`/view/${id}`]}>
      <Routes>
        <Route path="/view/:id" element={<ViewTodo />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ViewTodo Component', () => {
  const sampleTodo = {
    id: '123',
    taskName: 'Test Task',
    priority: 'high',
    createdTime: new Date().toISOString(),
    updatedTime: new Date().toISOString(),
    isCompleted: true,
    tags: ['Work', 'Urgent']
  };

  it('displays not found if todo is missing', () => {
    renderWithProviders([], '999');
    expect(screen.getByText(/todo not found/i)).toBeInTheDocument();
  });

  it('renders all details of the todo', () => {
    renderWithProviders([sampleTodo]);
    expect(screen.getByText('📄 Task Details')).toBeInTheDocument();
    expect(screen.getByText(/Test Task/)).toBeInTheDocument();
    expect(screen.getByText(/High/)).toBeInTheDocument();
    expect(screen.getByText(/✅ Completed/)).toBeInTheDocument();
    expect(screen.getByText(/Work/)).toBeInTheDocument();
    expect(screen.getByText(/Urgent/)).toBeInTheDocument();
  });

  it('shows "No tags" if todo has no tags', () => {
    const todoWithoutTags = { ...sampleTodo, id: '321', tags: [] };
    renderWithProviders([todoWithoutTags], '321');
    expect(screen.getByText(/No tags/)).toBeInTheDocument();
  });

  it('has back to list button', () => {
    renderWithProviders([sampleTodo]);
    expect(screen.getByRole('button', { name: /back to list/i })).toBeInTheDocument();
  });
});
