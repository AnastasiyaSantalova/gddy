import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import * as api from '../services/api'; // Импорт твоего сервиса
import { describe, expect, it, vi, type Mock } from 'vitest';
import { LOADING_TEXT, REPO_LIST_TITLE } from '../constants/strings';

vi.mock('../services/api');

describe('AppRoutes', () => {
  it('renders RepoList on "/" route', async () => {
    (api.fetchRepos as Mock).mockResolvedValue([
      { id: 1, name: 'repo1', description: 'Test repo' }
    ]);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(REPO_LIST_TITLE)).toBeInTheDocument();
    });
  });

  it('renders RepoDetails on "/repo/:name" route', () => {
    render(
      <MemoryRouter initialEntries={['/repo/test-repo']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });
});
