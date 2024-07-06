const loginUser = async (email: string, password: string): Promise<boolean> => {
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

export { loginUser };
