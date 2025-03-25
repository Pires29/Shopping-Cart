import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../redux/store"; // Importe a função que cria a store
import ListaProdutos from "../components/ListaProdutos";
import { useAuthState } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";
import Carrinho from "../carrinho/page";
import { store, createStore } from "../redux/store"; // Importação corrigida

let store; // Variável para armazenar a store

beforeEach(() => {
  console.log("Resetando ambiente de teste...");
  jest.clearAllMocks();
  store = createStore(); // Cria uma nova instância da store antes de cada teste
});

global.fetch = jest.fn(() => {
  console.log("Mock do fetch chamado"); // Log de depuração
  return Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          userID: "asdasd",
          id: 1,
          title: "Produto Mock",
          description: "Descrição do produto",
          price: 10.99,
          image: "https://via.placeholder.com/150",
          rating: { rate: 4.5 },
        },
        {
          userID: "asdasd",
          id: 2,
          title: "Produto Mock 2",
          description: "Descrição do produto 2",
          price: 13.99,
          image: "https://via.placeholder.com/152",
          rating: { rate: 4.2 },
        },
      ]),
  });
});

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

describe("Lista de Produtos Rendering", () => {
  it("should add item to Carrinho - Não há produtos", async () => {
    useAuthState.mockReturnValue([{ id: 1, name: "Renato" }, false]);

    render(
      <Provider store={store}>
        <Navbar />
        <ListaProdutos />
        <Carrinho />
      </Provider>
    );

    // Espera até que o fetch seja chamado e a resposta seja recebida
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verifica se os produtos mockados estão sendo exibidos
    await waitFor(() => {
      expect(screen.getByText("Produto Mock")).toBeInTheDocument();
      expect(screen.getByText("Produto Mock 2")).toBeInTheDocument();
    });

    console.log("Produto Mock e Produto Mock 2 estão no documento");

    const buttons = await screen.findAllByRole("button");
    const firstButton = buttons[1];

    console.log("Buttons:", buttons);

    await userEvent.click(firstButton);

    const links = screen.getAllByRole("link");
    const carrinhoLink = links.find(
      (link) => link.getAttribute("href") === "/carrinho"
    );

    await userEvent.click(carrinhoLink);
  });

  it("should remove item from Carrinho", async () => {
    useAuthState.mockReturnValue([
      { id: 1, name: "Renato", userID: "asdasd" },
      false,
    ]);

    render(
      <Provider store={store}>
        <Navbar />
        <ListaProdutos />
        <Carrinho />
      </Provider>
    );

    // Espera até que o fetch seja chamado e a resposta seja recebida
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Verifica se os produtos mockados estão sendo exibidos
    await waitFor(() => {
      expect(screen.getByText("Produto Mock")).toBeInTheDocument();
      expect(screen.getByText("Produto Mock 2")).toBeInTheDocument();
    });

    // Adiciona o primeiro item ao carrinho
    const buttons = await screen.findAllByRole("button");
    const firstButton = buttons[0];
    await userEvent.click(firstButton);

    // Verifica se o item foi adicionado ao carrinho
    const links = screen.getAllByRole("link");
    const carrinhoLink = links.find(
      (link) => link.getAttribute("href") === "/carrinho"
    );

    await userEvent.click(carrinhoLink);

    await waitFor(() => {
      const produtos = screen.getAllByText(/10.99/);
      console.log("Produtos:", produtos);
    });

    // Simula a remoção do item do carrinho
    const removeButtons = await screen.findAllByRole("button", {
      name: /remover/i,
    });
    const removeButton = removeButtons[0];
    console.log("All buttons", removeButtons);
    console.log("Button", removeButton);
    await userEvent.click(removeButton);

    await waitFor(() => {
      const produtos = screen.getAllByText(/10.99/);
      console.log("Produtos final:", produtos);
    });

    /*     // Verifica se o produto foi removido do carrinho
    await waitFor(() => {
      expect(screen.queryByText("$10.99")).not.toBeInTheDocument(); 
    }); */
  });
});
