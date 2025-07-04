import { API_ERROR_TEXT, REPO_DETAILS_ERROR_TEXT } from '../constants/strings';
import { fetchRepos, fetchRepoDetails } from './api';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([{ id: 1, name: 'repo1', description: 'Test repo' }]),
  })
) as unknown as Mock;

describe('fetchRepos', () => {
  beforeEach(() => {
    (global.fetch as Mock).mockClear();
  });

  it('fetches repos from API', async () => {
    const repos = await fetchRepos();
    expect(repos).toEqual([{ id: 1, name: 'repo1', description: 'Test repo' }]);
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );
    await expect(fetchRepos()).rejects.toThrow(API_ERROR_TEXT);
  });

  it('calls fetch with correct URL', async () => {
    await fetchRepos();
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/orgs/godaddy/repos');
  });
});

describe('fetchRepoDetails', () => {
  const testName = 'test-repo';
  const mockRepoDetails = {
    id: 1,
    name: 'test-repo',
    description: 'Test repo details',
  };

  beforeEach(() => {
    (global.fetch as Mock).mockClear();
  });

  it('fetches repo details from API', async () => {
    (global.fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(mockRepoDetails),
      })
    );

    const repo = await fetchRepoDetails(testName);
    expect(repo).toEqual(mockRepoDetails);
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    await expect(fetchRepoDetails(testName)).rejects.toThrow(
      `${REPO_DETAILS_ERROR_TEXT}: ${testName}`
    );
  });

  it('calls fetch with correct URL', async () => {
    (global.fetch as Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(mockRepoDetails),
      })
    );

    await fetchRepoDetails(testName);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/godaddy/${testName}`
    );
  });
});
