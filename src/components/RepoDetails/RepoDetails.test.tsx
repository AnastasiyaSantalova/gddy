import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RepoDetails from "./RepoDetails";
import * as api from "../../services/api";
import { describe, expect, it, vi, type Mock } from "vitest";

vi.mock("../services/api");

describe("RepoDetails", () => {
  it("renders repo details from API", async () => {
    const mockRepo = {
      id: 1,
      name: "repo1",
      description: "Test repo details",
      html_url: "https://github.com/godaddy/repo1",
      language: "TypeScript",
      forks_count: 5,
      open_issues_count: 2,
      watchers_count: 10,
    };

    (api.fetchRepoDetails as Mock).mockResolvedValue(mockRepo);

    render(
      <MemoryRouter initialEntries={["/repo/repo1"]}>
        <Routes>
          <Route path="/repo/:name" element={<RepoDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("repo1")).toBeInTheDocument());

    expect(screen.getByText("Test repo details")).toBeInTheDocument();
    expect(screen.getByText(/View on GitHub/i)).toHaveAttribute(
      "href",
      "https://github.com/godaddy/repo1"
    );
    expect(screen.getByText(/Language/i)).toHaveTextContent("TypeScript");
    expect(screen.getByText(/Forks/i)).toHaveTextContent("5");
    expect(screen.getByText(/Open Issues/i)).toHaveTextContent("2");
    expect(screen.getByText(/Watchers/i)).toHaveTextContent("10");
  });
});
