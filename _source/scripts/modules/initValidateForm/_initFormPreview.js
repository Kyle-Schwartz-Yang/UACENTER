

export const initFormPreview = (argFormImage, argFormPreview) => {
  const formImage = document.getElementById(argFormImage);
  const formPreview = document.getElementById(argFormPreview);

  if (!formImage || !formPreview) {
    console.error('Image input or preview element not found');
    return;
  }

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Разрешены только изображения.');
      formImage.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть менее 2 МБ.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Превью">`;
    };
    reader.onerror = function (e) {
      alert('Ошибка загрузки файла');
    };
    reader.readAsDataURL(file);
  }
};


