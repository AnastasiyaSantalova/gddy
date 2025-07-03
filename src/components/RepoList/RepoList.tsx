import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRepos, type Repo } from "../../services/api";
import styles from "./RepoList.module.css";

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
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Godaddy Repositories</h1>
      <ul className={styles.list}>
        {repos.map((repo) => (
          <li key={repo.id} className={styles.item}>
            <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
            <p className={styles.description}>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
