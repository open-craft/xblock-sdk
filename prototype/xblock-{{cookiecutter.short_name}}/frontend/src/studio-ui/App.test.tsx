import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { stubJquery, fireEvent } from "@opencraft/xblock-react-utils/testing";
import { initDataFactory, specRender } from "@/lib/specHelpers.tsx";
import { App } from "./App.tsx";

describe("App.tsx", () => {
  const { mockPost } = stubJquery();
  it("renders", () => {
    const { screen } = specRender(<App {...initDataFactory()} />);
    screen.getByText("Code");
  });
  it("submits changes to the server", async () => {
    const user = userEvent.setup();
    const { screen } = specRender(<App {...initDataFactory()} />);
    const displayName = screen.getByLabelText("Display Name");
    await user.clear(displayName);
    await user.type(displayName, "My new block");
    const codeField = screen.getByLabelText("Code");
    fireEvent.change(codeField, { target: { value: "O hai!" } });
    await user.click(screen.getByText("Save"));
    expect(mockPost).toHaveBeenCalledWith(
      "/handler/studio_save",
      JSON.stringify(
        initDataFactory({
          display_name: "My new block",
          code: "O hai!",
        }),
      ),
    );
  });
});
