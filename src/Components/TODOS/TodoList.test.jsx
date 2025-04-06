import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { TodoProvider } from '../../Context/TodoContext';
import { MemoryRouter } from 'react-router-dom';

const renderWithProviders = () => {
  render(
    <MemoryRouter>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </MemoryRouter>
  );
};

describe('TodoList Component', () => {
  beforeEach(() => {
    renderWithProviders();
  });

  it('renders the heading', () => {
    expect(screen.getByText('📋 Your Todos')).toBeInTheDocument();
  });

  it('toggles filters section', () => {
    const filterBtn = screen.getByRole('button', { name: '' }); 
    fireEvent.click(filterBtn);
    expect(screen.getByText('All Priorities')).toBeInTheDocument();
  });

  it('allows status filter change', () => {
    const filterBtn = screen.getByRole('button', { name: '' }); 
    fireEvent.click(filterBtn);
    const statusSelect = screen.getByDisplayValue('All');
    fireEvent.change(statusSelect, { target: { value: 'completed' } });
    expect(statusSelect.value).toBe('completed');
  });

  it('updates search input', () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  it('selects and deselects tags', () => {
    const filterBtn = screen.getByRole('button', { name: '' }); 
    fireEvent.click(filterBtn);
    const workTagBtn = screen.getByRole('button', { name: /work/i });
    fireEvent.click(workTagBtn);
    expect(workTagBtn.className).toMatch(/bg-blue-500/);
    fireEvent.click(workTagBtn);
    expect(workTagBtn.className).not.toMatch(/bg-blue-500/);
  });
});
