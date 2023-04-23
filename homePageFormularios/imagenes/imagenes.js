function downloadSelectedImages() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach((checkbox) => {
    const imageSrc = checkbox.parentElement.parentElement.lastElementChild.querySelector('img').src;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageSrc, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = new Blob([this.response], { type: 'image/jpeg' }); // cambiar el tipo de archivo según el formato de la imagen
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'image.jpg'; // cambiar el nombre del archivo según la imagen
        link.click();
      }
    };
    xhr.send();
  });
}



