import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRepos, type Repo } from '../../services/api';
import styles from './RepoList.module.css';
import {
  LOADING_TEXT,
  NO_REPOS_TEXT,
  REPO_LIST_TITLE,
} from '../../constants/strings';

export default function RepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchRepos();
        setRepos(data);
      } catch (error) {
        console.error(error);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  if (loading) return <p>{LOADING_TEXT}</p>;

  return (
    <div>
      <h1>{REPO_LIST_TITLE}</h1>
      <ul className={styles.list}>
        {repos.length ? (
          repos.map((repo) => (
            <Link className={styles.item} to={`/repo/${repo.name}`}>
              <li key={repo.id}>
                <h2>{repo.name}</h2>
                <p className={styles.description}>{repo.description}</p>
              </li>
            </Link>
          ))
        ) : (
          <p>{NO_REPOS_TEXT}</p>
        )}
      </ul>
    </div>
  );
}
