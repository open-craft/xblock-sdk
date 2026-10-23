import { describe, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { stubJquery } from "@opencraft/xblock-react-utils/testing";
import { initDataFactory, specRender } from "@/lib/specHelpers.tsx";
import { App } from "./App.tsx";

describe("App.tsx", () => {
  const { getLastDeferred, mockPost } = stubJquery();
  it("renders", () => {
    const { screen } = specRender(<App {...initDataFactory()} />);
    // getByText throws if the query fails. Check the React Testing
    // Library documentation for more details.
    screen.getByText("Count: 0");
    screen.getByRole("button", {name: "Increase"});
  });
  it("increments", async () => {
    const user = userEvent.setup();
    const { screen } = specRender(<App {...initDataFactory({code: "Bork", count: 1})} />);
    // getByText throws if the query fails. Check the React Testing
    // Library documentation for more details.
    const button = screen.getByRole("button", {name: "Increase"});
    await user.click(button);
    expect(mockPost).toHaveBeenCalledWith({
      "contentType": "application/json",
      "data": JSON.stringify({code: "Bork"}),
      "url": "/handler/increment",
    });
    const lastDeferred = getLastDeferred();
    lastDeferred._resolveDone({count: 10})
    await waitFor(() => screen.getByText("Count: 10"))
  });
});
