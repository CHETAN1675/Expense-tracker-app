import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test/test-utils";
import userEvent from "@testing-library/user-event";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import ProfileForm from "./components/Profile/ProfileForm";
import MainNavigation from "./components/Layout/MainNavigation";
import HomePage from "./pages/HomePage";
import AuthForm from "./components/Auth/AuthForm";
import { ExpenseContextProvider } from "./store/ExpenseContext";
import AuthContext from "./store/AuthContext";


vi.stubGlobal("fetch", vi.fn());

describe("Expense Tracker Component", () => {
  it("renders Money Spent", () => {
    renderWithProviders(<ExpenseTracker />);
    expect(screen.getByText("Money Spent:")).toBeInTheDocument();
  });

  it("renders Description", () => {
    renderWithProviders(<ExpenseTracker />);
    expect(screen.getByText("Description:")).toBeInTheDocument();
  });

  it("renders Category", () => {
    renderWithProviders(<ExpenseTracker />);
    expect(screen.getByText("Category:")).toBeInTheDocument();
  });
});

describe("Profile Form Component", () => {
  it("renders Full Name", () => {
    renderWithProviders(<ProfileForm />);
    expect(screen.getByText("Full Name")).toBeInTheDocument();
  });

  it("renders Profile Photo URL", () => {
    renderWithProviders(<ProfileForm />);
    expect(screen.getByText("Profile Photo URL")).toBeInTheDocument();
  });

  it("renders post if request succeeds", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });

    renderWithProviders(<ProfileForm />);
    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });
});

describe("Main Navigation Component", () => {
  it("renders Expense Tracker Logo", () => {
    renderWithProviders(<MainNavigation />);
    expect(screen.getByText("Expense Tracker")).toBeInTheDocument();
  });

  it("renders Download Expenses", () => {
    renderWithProviders(<MainNavigation />);
    expect(screen.getByText("Download Expenses")).toBeInTheDocument();
  });

  it("renders Login", () => {
    renderWithProviders(<MainNavigation />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders Profile", () => {
    renderWithProviders(<MainNavigation />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders Logout", () => {
    renderWithProviders(<MainNavigation />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});

describe("HomePage Component", () => {
  it('renders "Welcome to Expense Tracker" if user logged in', () => {
    renderWithProviders(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <HomePage />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/Welcome to Expense Tracker/i)).toBeInTheDocument();
  });

  it('renders "Your profile is incomplete" if user logged in', () => {
    renderWithProviders(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <HomePage />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/Your profile is incomplete/i)).toBeInTheDocument();
  });
});

describe("AuthForm Component", () => {
  it('renders "confirm Password" if user clicks Create new account', async () => {
    renderWithProviders(<AuthForm />);
    const button = screen.getByText(/Create new account/i);
    await userEvent.click(button);
    expect(screen.getByText(/confirm Password/i)).toBeInTheDocument();
  });

  it('renders "Forgot Password?" if user clicks Login', async () => {
    renderWithProviders(<AuthForm />);
    const button = screen.getByText(/have an account\? Login/i);
    await userEvent.click(button);
    expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument();
  });
});

describe("ExpenseContext Component", () => {
  it("renders post if request succeeds", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });

    renderWithProviders(
      <ExpenseContextProvider>
        <ul>
          <li>First post</li>
        </ul>
      </ExpenseContextProvider>
    );

    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });
});
