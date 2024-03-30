<!-- Модальное окно карточки -->

<template>

  <transition name="modal">
    <div class="common-modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="card-wrapper" v-if="card">

    <div class="cerd-image-and-upload">
      <div class="card-image">
<!--        <img alt="" class="card-image-img" src="https://images.thevoicemag.ru/upload/img_cache/adc/adc3612156f45e2fd8dbffc54f61dd1d_ce_4887x3258x0x0_cropped_666x444.webp" />-->
        <img alt="" class="card-image-img" :src="'images/' + card.photo" />
      </div>

<!--      <div class="card-remove">
        <button class="card-upload-button elements-button" :disabled="isDisabledUpdateButton" @click="uploadCard">Сохранить</button>
      </div>-->
    </div>


    <div class="card-categories-wrapper">
      <div class="owner-select select-wrapper elements-select-wrapper">
        <select class="form-select elements-select"
                v-model="card.ownerId"
        >
          <option disabled :value="null">Владелец</option>
          <option v-for="item in categories.owner"
                  :name="item.name"
                  :value="item.id"
                  :key="item.id"
          >
            {{item.name}}
          </option>
        </select>
<!--        <span class="form-select-label elements-select-label">Владелец</span>-->
      </div>

      <div class="size-select select-wrapper elements-select-wrapper">
<!--        <span class="form-select-label elements-select-label">Размер</span>-->
        <select class="form-select elements-select"
                v-model="card.size"
        >
          <option disabled :value="null">Размер</option>
          <option v-for="item in categories.size"
                  :name="item.name"
                  :value="item.id"
                  :key="item.id"
          >
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="season-select select-wrapper elements-select-wrapper">
<!--        <span class="form-select-label elements-select-label">Сезоны</span>-->
        <select class="form-select elements-select"
                v-model="card.season"
        >
          <option disabled :value="null">Сезоны</option>
          <option v-for="item in categories.season"
                  :name="item.name"
                  :value="item.id"
                  :key="item.id"
          >
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="location-select select-wrapper elements-select-wrapper">
<!--        <span class="form-select-label elements-select-label">Где находится</span>-->
        <select class="form-select elements-select"
                v-model="card.location"
        >
          <option disabled :value="null">Где находится</option>
          <option v-for="item in categories.location"
                  :name="item.name"
                  :value="item.id"
                  :key="item.id"
          >
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="type-select select-wrapper elements-select-wrapper">
<!--        <span class="form-select-label elements-select-label">Тип</span>-->
        <select class="form-select elements-select"
                v-model="card.type"
        >
          <option disabled :value="null">Тип</option>
          <option v-for="item in categories.type"
                  :name="item.name"
                  :value="item.id"
                  :key="item.id"
          >
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="form-check elements-checkbox-wrapper">
        <input class="form-check-input"
               type="checkbox"
               :value="card.outdoor"
               v-model="card.outdoor">
        <span class="form-check-span">Уличная</span>
      </div>

      <div class="form-check elements-checkbox-wrapper">
        <input class="form-check-input"
               type="checkbox"
               :value="card.casual"
               v-model="card.casual">
        <span class="form-check-span">Повседневная</span>
      </div>

      <div class="form-check elements-checkbox-wrapper">
        <input class="form-check-input"
               type="checkbox"
               :value="card.favorites"
               v-model="card.favorites">
        <span class="form-check-span">Избранное</span>
      </div>

      <div class="form-check elements-checkbox-wrapper">
        <input class="form-check-input"
               type="checkbox"
               :value="card.trash"
               v-model="card.trash">
        <span class="form-check-span">На выброс</span>
      </div>

      <div class="form-text elements-text-wrapper">
        <input name="text"
               type="text"
               class="form-control common-input-text"
               placeholder="Описание"
               v-model="card.description"/>
      </div>

    </div>

  </div>

              <div class="card-buttons-wrapper">

                <div class="card-upload">
                  <button class="card-upload-button elements-button" :disabled="isDisabledUpdateButton" @click="uploadCard">Сохранить</button>
                </div>

                <div class="card-space"></div>

                <div class="card-close">
                  <button class="card-upload-button elements-button error-button" @click="closeCard">Закрыть</button>
                </div>

              </div>

            </div>
      </div>
    </div>
  </transition>

</template>

<script>

import CardService from "@/services/card.service";
import {Shoes} from "@/classes/Shoes";
export default {
  name: 'CardModal',
  props: {
    cardProp: null,
    categoriesProp: null
  },
  data() {
    return {
      card: new Shoes(this.cardProp),
      categories: this.categoriesProp,
      defaultCard: null
    }
  },
  computed: {

    // Если изменений нет - кнопка обновления карточки не активна
    isDisabledUpdateButton() {
      if (!this.card || !this.defaultCard) {
        return false;
      }

      return !!(this.card.ownerId === this.defaultCard.ownerId &&
          this.card.size === this.defaultCard.size &&
          this.card.outdoor === this.defaultCard.outdoor &&
          // this.card.season === this.defaultCard.season &&
          this.card.casual === this.defaultCard.casual &&
          this.card.location === this.defaultCard.location &&
          this.card.favorites === this.defaultCard.favorites &&
          this.card.trash === this.defaultCard.trash &&
          this.card.type === this.defaultCard.type &&
          this.card.description === this.defaultCard.description)
    }
  },
  mounted() {
    this.setDefaults(this.cardProp);
  },
  methods: {

    // Запоминаются первичные значения полей
    setDefaults(defaultCard) {
      this.defaultCard = {
        ownerId: defaultCard.ownerId,
        size: defaultCard.size,
        outdoor: defaultCard.outdoor,
        season: defaultCard.season,
        casual: defaultCard.casual,
        location: defaultCard.location,
        favorites: defaultCard.favorites,
        trash: defaultCard.trash,
        type: defaultCard.type,
        description: defaultCard.description
      }
    },

    // Обновляем карточку и закрываем модальное окно
    uploadCard() {
      CardService.updateCard(new Shoes(this.card)).then(result => {
        // this.setDefaults(result.data);
        this.$emit('close', new Shoes(result.data));
      });
    },

    // Закрывается модальное окно без изменений
    closeCard() {
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/elements";

.common-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.7);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      max-width: 730px;
      margin: 0 auto;
      padding: 20px;
      background-color: $variables-background-primary;
      border-radius: $variables-card-border-radius;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
  }
}

.card-wrapper {
  display: flex;
  flex-wrap: wrap;

  .card-image{
    width: 300px;
    margin-right: 20px;

    .card-image-img{
      width: 300px;
      border-radius: $variables-card-border-radius;
    }
  }

  .card-categories-wrapper {
    color: $variables-text-primary;
    text-align: left;
    margin-top: 10px;
    width: 100%;
    max-width: 400px;

    .select-wrapper,
    .form-check,
    .form-text {
      margin-bottom: 10px;
    }
  }
}

.card-buttons-wrapper {
  width: 100%;
  margin-top: 20px;
  display: flex;

  .card-space {
    width: 100%;
  }
}

</style>
