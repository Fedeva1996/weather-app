import { loginUser, logoutUser, registerUser } from "./AuthActions";
import { jwtDecode } from "jwt-decode";

// Mock jwt-decode
jest.mock("jwt-decode");

describe("AuthActions", () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("logout exitoso", () => {
    const dispatch = jest.fn();

    logoutUser(dispatch);

    // Verifica que localStorage.removeItem haya sido llamado con 'jwt'
    expect(localStorage.removeItem).toHaveBeenCalledWith("jwt");
    // Verifica que dispatch haya sido llamado con la acción correcta
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CURRENT_USER",
      payload: {
        email: "",
      },
    });
  });

  test("login exitoso", async () => {
    const dispatch = jest.fn();

    const mockResponse = {
      ok: true,
      token: "mock-jwt-token",
    };

    // Simula la respuesta de fetch
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    // Mockea jwtDecode para devolver un email simulado
    const mockDecodedToken = { email: "test@mail.com" };
    jwtDecode.mockReturnValue(mockDecodedToken);

    await loginUser({ email: "test@mail.com", password: "test123" }, dispatch);

    // Verifica que fetch haya sido llamado con la URL y el body correcto
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_PATH}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@mail.com",
          password: "test123",
        }),
      }
    );

    // Verifica que localStorage.setItem haya sido llamado con el token correcto
    expect(localStorage.setItem).toHaveBeenCalledWith("jwt", "mock-jwt-token");

    // Verifica que dispatch haya sido llamado con la acción correcta
    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CURRENT_USER",
      payload: {
        email: "test@mail.com",
      },
    });
  });
});
