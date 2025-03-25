import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ListaProdutos from "../components/ListaProdutos";
import Navbar from "../components/Navbar";
import Carrinho from "../carrinho/page";
import { useAuthState } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  jest.clearAllMocks();  // Limpa os mocks antes de qualquer teste
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: "Produto Mock",
          description: "Descrição do produto",
          price: 10.99,
          image: "https://via.placeholder.com/150",
          rating: { rate: 4.5 },
        },
        {
          id: 2,
          title: "Produto Mock 2",
          description: "Descrição do produto 2",
          price: 13.99,
          image: "https://via.placeholder.com/152",
          rating: { rate: 4.2 },
        },
      ]),
  })
);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(),
}));

describe("Navbar Rendering", () => {
  it("should have text in Navbar", () => {
    render(<Navbar />);

    screen.getByText("Minha Loja");
    screen.getByText("Produtos");
  });
});

describe("Lista de Produtos Rendering", () => {
  it("should render product info - User not logged in", () => {
    useAuthState.mockReturnValue([null, false]);

    render(
      <Provider store={store}>
        <ListaProdutos />
      </Provider>
    );

    screen.findByText("Ocorreu");
    screen.findByText("Produto Mock");
    screen.findByText("4.5");
  });
  it("should render 'Adicionar ao Carrinho' button - User not logged in", () => {
    useAuthState.mockReturnValue([null, false]);
    render(
      <Provider store={store}>
        <ListaProdutos />
      </Provider>
    );

    screen.findByRole("button",  {name :"Adicionar ao carrinho"});
  });
 it("should have text in Carrinho - Não há produtos",async () => {
    //useAuthState.mockReturnValue([{ id: 1, name: "Renato" }, false]);

    render(
      <Provider store={store}>
{/*         <Navbar /> */}
        <ListaProdutos />
{/*         <Carrinho /> */}
      </Provider>
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    console.log("Fetch foi chamado, agora verificando no console");

    /*     const produto = await screen.findByText("Ocorreu");

    console.log("Produto", produto)
    const buttons = await screen.findByRole("button");

    console.log("Buttons:", buttons) */

/*     const links = screen.getAllByRole("link");
    const carrinhoLink = links.find(
      (link) => link.getAttribute("href") === "/carrinho"
    );

    await userEvent.click(carrinhoLink); */
  });
});
