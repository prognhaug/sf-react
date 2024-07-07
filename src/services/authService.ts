const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    // Adjusted to handle the new response structure
    const responseBody = await response.json();
    const { accessToken } = responseBody.result.data;
    localStorage.setItem("token", accessToken);

    const userResponse = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error(
        `Failed to fetch user info with status: ${userResponse.status}`
      );
    }

    // Extracting user information and storing in local storage
    const userInfo = await userResponse.json();
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Assuming the entire response is the user info

    return true;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error(
        "Network error: Failed to fetch. Check server availability and CORS policy."
      );
    } else {
      console.error(error);
    }
    return false;
  }
};

const getToken = () => localStorage.getItem("token");

const isLoggedIn = () => !!getToken();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
};

export const authService = {
  getToken,
  isLoggedIn,
  login,
  logout,
};
