import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepoList from './RepoList';
import * as api from '../../services/api';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { LOADING_TEXT, NO_REPOS_TEXT } from '../../constants/strings';

vi.mock('../../services/api');

describe('RepoList', () => {
  const fetchReposMock = api.fetchRepos as Mock;

  beforeEach(() => {
    fetchReposMock.mockClear();
  });
  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });
  it('renders repos from API', async () => {
    const mockRepos = [{ id: 1, name: 'repo1', description: 'Test repo' }];

    fetchReposMock.mockResolvedValue(mockRepos);

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('repo1')).toBeInTheDocument());
    expect(screen.getByText('Test repo')).toBeInTheDocument();
  });
  it('handles API errors', async () => {
    fetchReposMock.mockRejectedValue(new Error('API error'));

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('repo1')).not.toBeInTheDocument()
    );
    expect(screen.getByText(NO_REPOS_TEXT)).toBeInTheDocument();
  });
  it('handles empty repo list', async () => {
    fetchReposMock.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('repo1')).not.toBeInTheDocument()
    );
    expect(screen.getByText(NO_REPOS_TEXT)).toBeInTheDocument();
  });
});
