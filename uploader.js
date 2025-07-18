document.getElementById('imageUpload').addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    window.lastUploadedImage = e.target.result; // base64 URL
    appendMessage('Bot', '📸 Image uploaded successfully.');
  };
  if (file) reader.readAsDataURL(file);
});

function capturePhoto() {
  alert('📷 Camera capture not yet implemented.');
}