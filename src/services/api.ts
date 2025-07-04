import { API_ERROR_TEXT, REPO_DETAILS_ERROR_TEXT } from '../constants/strings';

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
}

const BASE_URL = 'https://api.github.com/orgs/godaddy';

export async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(`${BASE_URL}/repos`);
  if (!response.ok) {
    throw new Error(API_ERROR_TEXT);
  }
  return await response.json();
}

export async function fetchRepoDetails(name: string): Promise<Repo> {
  const response = await fetch(`https://api.github.com/repos/godaddy/${name}`);
  if (!response.ok) {
    throw new Error(`${REPO_DETAILS_ERROR_TEXT}: ${name}`);
  }
  return await response.json();
}
