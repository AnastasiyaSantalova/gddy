import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRepoDetails, type Repo } from '../../services/api';
import styles from './RepoDetails.module.css';
import { LOADING_TEXT, REPO_NOT_FOUND_TEXT } from '../../constants/strings';

export default function RepoDetails() {
  const { name } = useParams();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRepoDetails = async () => {
      try {
        if (name) {
          const data = await fetchRepoDetails(name);
          setRepo(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRepoDetails();
  }, [name]);

  if (loading) return <p>{LOADING_TEXT}</p>;
  if (!repo) return <p>{REPO_NOT_FOUND_TEXT}</p>;

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={styles.goBack}
        onClick={() => navigate(-1)}
      >
        ← Back to list
      </button>
      <div className={styles.contentWrapper}>
        <div className={styles.details}>
          <h1 className={styles.title}>{repo.name}</h1>
          <p>{repo.description}</p>
          <p>
            <a
              className={styles.link}
              href={repo.html_url}
              target='_blank'
              rel='noreferrer'
            >
              View on GitHub
            </a>
          </p>
        </div>
        <div className={styles.info}>
          <p data-testid='Language'>
            <span className={styles.bold}>Language:</span> {repo.language}
          </p>
          <p data-testid='Forks'>
            <span className={styles.bold}>Forks:</span> {repo.forks_count}
          </p>
          <p data-testid='Open Issues'>
            <span className={styles.bold}>Open Issues:</span>{' '}
            {repo.open_issues_count}
          </p>
          <p data-testid='Watchers'>
            <span className={styles.bold}>Watchers:</span> {repo.watchers_count}
          </p>
        </div>
      </div>
    </div>
  );
}
