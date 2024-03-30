<!-- Добавление изображений -->

<!--https://github.com/saimow/vue-media-upload-->
<!--https://webcraft-notes.com/blog/vuejs-prepare-images-for-upload-with-compressorjs-->

<template>

  <div class="file-upload">

    <input type="file"
           ref="uploadButton"
           v-show="false"
           multiple
           @change="onFileChange"
           accept=".jpg, .png"
    />

    <button @click="$refs.uploadButton.click" class="elements-button"
    >Добавить фотографии</button>
  </div>

  <div class="image-wrapper">
    <div class="image-item-div" v-for="(imgfile, index) in imgfiles" :key="index">
<!--      <button class="image-item-button elements-button" @click="onRemoveImage">X</button>-->

      <div class="category-list-remove-wrapper">
        <div class="category-list-remove-arrow" @click.prevent="onRemoveImage(index)">
          <div class="category-list-remove-line"></div>
          <div class="category-list-remove-line"></div>
        </div>
      </div>

      <img class="image-item-img" alt="alt" :src="imgfile.url" />
    </div>
  </div>

<!--  <image-compressor
      :done="getFiles"
      :scale="scale"
      :quality="quality">
  </image-compressor>-->

  <div class="upload-server">
    <button @click="onUploadFile"
            class="elements-button"
            v-if="imgfiles.length"
    >Загрузить на сервер</button>
  </div>

<!--  <div class="upload-results-wrapper">-->
  <div class="upload-results-wrapper" v-if="uploadResults.done || uploadResults.error">
    <div class="upload-results-spans">
      <span class="upload-results-span">
        Загружено фотографий - {{uploadResults.done + uploadResults.error}}
      </span>
      <br>
      <span class="upload-results-span">
        Создано карточек - {{uploadResults.done}}
      </span>
      <br>
      <span class="upload-results-span">
        Ошибок - {{uploadResults.error}}
      </span>
    </div>
  </div>

</template>

<script>

import ImageService from "@/services/image.service";
// import imageCompressor from 'vue-image-compressor'
import Compressor from 'compressorjs';

export default {
  components: {  },
  data() {
    return {
      imgfiles: [],
      uploadResults: {
        done: 0,
        error: 0
      },
      scale: 20,
      quality: 100
    }
  },
  methods: {

    // Добавление изображений со сжатием на страницу
    async onFileChange(e) {
      const files = Array.from(e.target.files);
      let startIndex = this.imgfiles.length;
      const compessedImgFiles = [];

      await files.forEach(file => {
        compessedImgFiles.push(new Compressor(file, {
          quality: 0.1,
          convertTypes: ['image/png', 'image/jpg', 'image/jpeg'],
          success: (result) => {
            this.imgfiles.push({
              id: startIndex,
              file: result,
              url: URL.createObjectURL(result)
            });
          },
          error: (error) => {
            console.warn(error);
          }
        }))

        startIndex++;
      })
    },

    // Загрузка файлов на сервер
    onUploadFile() {
      const formData = new FormData();

      this.imgfiles.forEach(file => {
        formData.append("images", file.file);
      })

      ImageService.uploadImages(formData).then(result => {
        this.uploadResults = result.data;
        this.imgfiles = [];
      });
    },

    // Удаление файла со страницы
    onRemoveImage(index) {
      this.imgfiles.splice(index, 1);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/elements";
@import "../styles/variables";

.image-wrapper{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  .image-item-div{
    //height: 200px;
    width: 200px;
    //border: 1px solid red;
    border-radius: $variables-card-border-radius;
    margin: 10px;

    .image-item-button {
      float: right;
      margin-bottom: -22px;
      position: relative;
    }

    .image-item-img{
      height: 100%;
      width: 100%;
      border-radius: $variables-card-border-radius;
    }
  }
}

.upload-server {
  margin-top: 20px;
}

.upload-results-wrapper {
  position: relative;

  .upload-results-spans {
    display: inline-block;
    border: 1px solid $variables-main;
    border-radius: $variables-card-border-radius;
    width: 250px;
    padding: 20px;
    line-height: 30px;
    text-align: right;

    .upload-results-span {
      color: $variables-text-primary;
      margin-top: 10px;
    }
  }
}

</style>