<template>
  <div>
    <input type="file" @change="handleFileUpload" accept="video/*" />
    <button @click="uploadVideo">Enviar Video</button>
  </div>
</template>

<script>
export default {
  name: 'VideoUploader',
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    uploadVideo() {
      if (this.selectedFile) {
        this.saveVideo(this.selectedFile);
      } else {
        console.error('No file selected');
      }
    },
    saveVideo(file) {
      const formData = new FormData();
      formData.append('video', file);

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>