import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepoList from "./RepoList";
import * as api from "../../services/api";
import { describe, expect, it, vi, type Mock } from "vitest";

vi.mock("../services/api");

describe("RepoList", () => {
  it("renders repos from API", async () => {
    const mockRepos = [{ id: 1, name: "repo1", description: "Test repo" }];

    (api.fetchRepos as Mock).mockResolvedValue(mockRepos);

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("repo1")).toBeInTheDocument());
    expect(screen.getByText("Test repo")).toBeInTheDocument();
  });
});
