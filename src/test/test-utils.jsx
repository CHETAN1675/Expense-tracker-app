
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test/test-utils";
import store  from "../store/index.jsx";
import { AuthContextProvider } from "../store/AuthContext";
import { ExpenseContextProvider } from "../store//ExpenseContext";

export function renderWithProviders(ui, { route = '/', withRouter = true, ...options } = {}) {
  const wrappedUi = withRouter ? (
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
  ) : (
    ui
  );

  return render(
    <Provider store={store}>
      <AuthContextProvider>
        <ExpenseContextProvider>
          {wrappedUi}
        </ExpenseContextProvider>
      </AuthContextProvider>
    </Provider>,
    options
  );
}

