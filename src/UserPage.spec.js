import { render, waitFor } from "@testing-library/svelte";
import UserPage from "./UserPage.svelte";
import { setupServer } from "msw/node";
import { rest } from "msw";

let counter = 0;
const server = setupServer(
  rest.get("/users/:id", async (req, res, ctx) => {
    counter += 1;
    return res(ctx.status(200), ctx.json({
      username: 'test-user'
    }));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

afterAll(() => server.close());

const setup = (userId) => {
  return render(UserPage, { props: { userId } });
}

it('loads user after userId is changed', async () => {
  const { rerender } = setup('123');
  rerender({ props: { userId: '456'}});
  await waitFor(() => {
    expect(counter).toBe(2);
  });
})