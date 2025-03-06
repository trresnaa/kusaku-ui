// Fungsi untuk login
const login = async (email, pin) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, pin })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login gagal');
    }

    setToken(data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk register
const register = async (name, email, phone, pin) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, pin })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registrasi gagal');
    }

    setToken(data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk reset PIN
const resetPin = async (email, newPin) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, newPin })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Reset PIN gagal');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk logout
const logout = () => {
  removeToken();
  window.location.href = '/login.html';
}; 