import { fetchRepos } from './api';
import { describe, expect, it, vi, type Mock } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, name: 'repo1', description: 'Test repo' },
    ]),
  }),
) as unknown as Mock;

describe('fetchRepos', () => {
  it('fetches repos from API', async () => {
    const repos = await fetchRepos();
    expect(repos).toEqual([
      { id: 1, name: 'repo1', description: 'Test repo' },
    ]);
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as Mock).mockImplementationOnce(() =>
          Promise.resolve({ ok: false }),
        );
    await expect(fetchRepos()).rejects.toThrow('Failed to fetch repos');
  });
});
