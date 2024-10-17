export const sendFormData = async (formData, config = {}) => {
  const { url = 'your-default-server-url', method = 'POST' } = config;

  try {
    const response = await fetch(url, {
      method: method,
      body: formData
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке формы');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Произошла ошибка при отправке формы');
  }
};

