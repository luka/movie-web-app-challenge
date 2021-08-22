import { render, screen } from "./utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { moviesList, moviett1673430 } from "./movies-data";
import { MemoryRouter } from "react-router-dom";
import { SimpleMoviesList } from "../app/components/SimpleMoviesList";
import App from "../app/App";

function TestApp() {
  return (
    <MemoryRouter>
      <App List={SimpleMoviesList} />
    </MemoryRouter>
  );
}

export const handlers = [
  rest.get("https://www.omdbapi.com/", (req, res, ctx) => {
    const query = req.url.searchParams;
    // movie list fetch
    const s = query.get("s");
    const page = query.get("page");
    // single movie fetch
    const id = query.get("i");
    const result =
      s && page
        ? res(ctx.json(moviesList), ctx.delay(150))
        : id === "tt1673430"
        ? res(ctx.json(moviett1673430), ctx.delay(150))
        : res(ctx.json({}), ctx.delay(150));
    // console.log(s, page);
    return result;
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

function fetchMovies(query) {
  const { container } = render(<TestApp />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: query } });
  expect(input.value).toContain(query);
  fireEvent.click(screen.getByText("Search"));
  return container;
}

function expectsHeaderMovieData() {
  expect(screen.getByText("Superman/Batman: Apocalypse")).toBeInTheDocument();
  expect(screen.getByText("2010")).toBeInTheDocument();
}

test("renders page with search bar", async () => {
  render(<TestApp />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  const h1 = screen.getByRole("heading");
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Search");
  expect(h1).toBeInTheDocument();
  expect(h1).toHaveTextContent("Search Movie DB");
});

test("does not fetch data when input is empty", async () => {
  const listDiv = fetchMovies("").querySelector(".movies-list");
  await waitFor(() => expect(listDiv.children.length).toEqual(0));
});

test("fetches movies on click", async () => {
  const listDiv = fetchMovies("batman").querySelector(".movies-list");
  await waitFor(() => {
    expect(listDiv.children.length).toEqual(10);
    expectsHeaderMovieData();
  });
});

test("shows movie page and loads details", async () => {
  const container = fetchMovies("batman");
  const links = await screen.findAllByRole("link");
  fireEvent.click(links[0]);
  expect(screen.getByText("Back")).toBeInTheDocument();
  expectsHeaderMovieData();
  expect(screen.getByAltText("Movie poster")).toBeInTheDocument();
  // spinner showing
  expect(container.querySelector(".spinner-icon")).toBeInTheDocument();
  // no details data yet
  expect(screen.queryByText("Director", { exact: false })).toBeNull();
  expect(screen.queryByText("Lauren Montgomery")).toBeNull();
  // spinner gone
  await waitFor(() =>
    expect(container.querySelector(".spinner-icon")).toBeNull()
  );
  // title still there
  expect(screen.getByText("Superman/Batman: Apocalypse")).toBeInTheDocument();

  // details data loaded
  // Director
  expect(screen.getByText("Director", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Lauren Montgomery")).toBeInTheDocument();
  // Genre
  expect(screen.getByText("Genre", { exact: false })).toBeInTheDocument();
  expect(
    screen.getByText("Animation, Action, Adventure, Sci-Fi")
  ).toBeInTheDocument();
  // ... more attribs can be tested here
});

test("can go back to the list", async () => {
  fetchMovies("batman");
  const links = await screen.findAllByRole("link");
  fireEvent.click(links[0]);
  const backButton = screen.getByText("Back");
  expect(backButton).toBeInTheDocument();
  expect(screen.getByText("Superman/Batman: Apocalypse")).toBeInTheDocument();
  fireEvent.click(backButton);
  expectsHeaderMovieData();
});

test("caches movie details", async () => {
  const container = fetchMovies("batman");
  const links = await screen.findAllByRole("link");
  fireEvent.click(links[0]);
  expect(container.querySelector(".spinner-icon")).toBeInTheDocument();
  await waitFor(() =>
    expect(container.querySelector(".spinner-icon")).toBeNull()
  );
  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  const links2 = screen.getAllByRole("link");
  fireEvent.click(links2[0]);
  // Director
  expect(screen.getByText("Director", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("Lauren Montgomery")).toBeInTheDocument();
});
