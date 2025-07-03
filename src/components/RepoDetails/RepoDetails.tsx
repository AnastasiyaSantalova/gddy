import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRepoDetails, type Repo } from "../../services/api";
import styles from "./RepoDetails.module.css";

export default function RepoDetails() {
  const { name } = useParams();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!repo) return <p>Repository not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>
        <a
          className={styles.link}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </p>
      <div className={styles.info}>
        <p>Language: {repo.language}</p>
        <p>Forks: {repo.forks_count}</p>
        <p>Open Issues: {repo.open_issues_count}</p>
        <p>Watchers: {repo.watchers_count}</p>
      </div>
    </div>
  );
}
