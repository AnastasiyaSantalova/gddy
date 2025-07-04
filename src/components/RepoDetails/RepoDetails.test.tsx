import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RepoDetails from './RepoDetails';
import * as api from '../../services/api';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { LOADING_TEXT, REPO_NOT_FOUND_TEXT } from '../../constants/strings';

vi.mock('../../services/api');

describe('RepoDetails', () => {
  const fetchRepoDetailsMock = api.fetchRepoDetails as Mock;

  beforeEach(() => {
    fetchRepoDetailsMock.mockClear();
  });
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/repo/repo1']}>
        <Routes>
          <Route path='/repo/:name' element={<RepoDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });
  it('renders repo details from API', async () => {
    const mockRepo = {
      id: 1,
      name: 'repo1',
      description: 'Test repo details',
      html_url: 'https://github.com/godaddy/repo1',
      language: 'TypeScript',
      forks_count: 5,
      open_issues_count: 2,
      watchers_count: 10,
    };

    (fetchRepoDetailsMock as Mock).mockResolvedValue(mockRepo);

    render(
      <MemoryRouter initialEntries={['/repo/repo1']}>
        <Routes>
          <Route path='/repo/:name' element={<RepoDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('repo1')).toBeInTheDocument());

    expect(screen.getByText('Test repo details')).toBeInTheDocument();
    expect(screen.getByText(/View on GitHub/i)).toHaveAttribute(
      'href',
      'https://github.com/godaddy/repo1'
    );
    expect(screen.getByTestId(/Language/i)).toHaveTextContent('TypeScript');
    expect(screen.getByTestId(/Forks/i)).toHaveTextContent('5');
    expect(screen.getByTestId(/Open Issues/i)).toHaveTextContent('2');
    expect(screen.getByTestId(/Watchers/i)).toHaveTextContent('10');
  });
  it('handles API errors', async () => {
    (fetchRepoDetailsMock as Mock).mockRejectedValue(new Error('API error'));

    render(
      <MemoryRouter initialEntries={['/repo/repo1']}>
        <Routes>
          <Route path='/repo/:name' element={<RepoDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('repo1')).not.toBeInTheDocument()
    );
    expect(screen.getByText(REPO_NOT_FOUND_TEXT)).toBeInTheDocument();
  });
});
