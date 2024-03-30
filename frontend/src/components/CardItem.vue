<!-- Карточка -->

<template>

  <CardModal v-if="showModal"
             :card-prop="card"
             :categories-prop="categories"
             @close="onClose"
  ></CardModal>

  <div class="card-favourites-wrapper" v-if="card && card.favorites">
    <font-awesome-icon icon="bookmark" />
  </div>

  <div class="card-not-filled-wrapper" v-if="card && !card.filled">
    <font-awesome-icon icon="triangle-exclamation" />
  </div>

  <div class="card-wrapper" v-if="card">

    <div class="cerd-image-and-upload">
      <div class="card-image">
<!--        <img alt="" class="card-image-img" src="https://images.thevoicemag.ru/upload/img_cache/adc/adc3612156f45e2fd8dbffc54f61dd1d_ce_4887x3258x0x0_cropped_666x444.webp" />-->
        <img alt="" class="card-image-img" :src="'images/' + card.photo" />
      </div>

      <div class="card-upload">
        <button class="card-upload-button elements-button" @click="changeCard">Изменить</button>
      </div>

    </div>

    <div class="card-info-wrapper">

      <div class="card-info-text">
        <div class="card-info-text-icon">
          <font-awesome-icon icon="user" />
        </div>
        <div class="card-info-text-label">
          {{ getNameById(categories.owner, card.ownerId) }}
        </div>
      </div>

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="up-right-and-down-left-from-center" />
        </span>
        <span class="card-info-text-label">
          {{ getNameById(categories.size, card.size) }}
        </span>
      </div>

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="tree" />
        </span>
        <span class="card-info-text-label">
          {{ getNameById(categories.season, card.season) }}
        </span>
      </div>

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="location-dot" />
        </span>
        <span class="card-info-text-label">
          {{ getNameById(categories.location, card.location) }}
        </span>
      </div>

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="tents" />
        </span>
        <span class="card-info-text-label">
          {{ getNameById(categories.size, card.type) }}
        </span>
      </div>

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="person-hiking" />
        </span>
        <span class="card-info-text-label">
          {{ getNameBySelect('outdoor', card.outdoor) }}
        </span>
      </div>

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="champagne-glasses" />
        </span>
        <span class="card-info-text-label">
          {{ getNameBySelect('casual', card.casual) }}
        </span>
      </div>

<!--      <div class="card-info-text">
        <span>
          {{ getNameBySelect('favorites', card.favorites) }}
        </span>
      </div>-->

      <div class="card-info-text">
        <span class="card-info-text-icon">
          <font-awesome-icon icon="trash" />
        </span>
        <span class="card-info-text-label">
          {{ getNameBySelect('trash', card.trash) }}
        </span>
      </div>

      <div class="card-info-text">
        <span>
          {{ card.description }}
        </span>
      </div>

    </div>

  </div>

</template>

<script>
import CardModal from "@/components/CardModal.vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
// import {Shoes} from "@/classes/Shoes";
export default {
  name: 'CardItem',
  props: {
    cardProp: null,
    categoriesProp: null
  },
  components: {
    FontAwesomeIcon,
    CardModal
  },
  data() {
    return {
      card: this.cardProp,
      categories: this.categoriesProp,
      showModal: false,
      selectText: {
        outdoor: ['Домашняя', 'Уличная'],
        casual: ['Выходная', 'Повседневная'],
        favorites: ['Не избранное', 'Избранное'],
        trash: ['Хорошая', 'На выброс']
      }
    }
  },
  /*computed: {
    isFilledCard() {
      if (!this.card) {
        return false;
      }

      return !!(this.card.ownerId && this.card.size && this.card.season && this.card.location)
    }
  },*/
  methods: {

    // Выводится текстовое значение в категории по ID
    getNameById(arr, id) {
      const item = arr.filter(item => item.id === id);

      return (item && item[0]) ? item[0].name : '-';
    },

    // Выводится текстовое значение в категории по значению
    getNameBySelect (name, select) {
      return this.selectText[name][+select];
    },

    // Открывается модальное окн
    changeCard() {
      this.showModal = true;
    },

    // При закрытии модального окна - применяем изменения
    onClose(data) {
      if (data) {
        this.card = data;
      }
      this.showModal = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/elements";

.card-wrapper {
  width: 350px;
  display: flex;
  border: 1px solid $variables-main;
  border-radius: $variables-card-border-radius;
  margin: 0 0 20px 20px;

  &.not-filled {
    //border: 5px solid red;
    //border-collapse: collapse;

    outline:5px solid $variables-text-secondary;
    outline-offset:-7px;
  }

  .card-favourites-wrapper,
  .card-not-filled-wrapper {
    color: $variables-main;
    height: 0;
    top: 0;
    position: relative;
    text-align: right;
    padding-right: 20px;
    font-size: 30px;
  }

  .card-not-filled-wrapper {
    top: 7px;
    padding-right: 10px;
    color: $variables-text-secondary;
  }

  .card-image{
    width: 170px;
    margin: 10px;

    .card-image-img{
      width: 170px;
      border-radius: $variables-card-border-radius;
    }
  }

  .card-info-wrapper {
    color: $variables-text-primary;
    text-align: left;
    margin-top: 10px;

    .card-info-text {
      //height: 25px;
      margin-bottom: 5px;
      display: grid;
      grid-template-columns: 25px auto;


      .card-info-text-icon {
        //margin-right: 10px;
        //width: 10px;
      }

    }
  }

  /*.card-categories-wrapper {
    color: $variables-text-primary;
    text-align: left;
    margin-top:10px;

    .select-wrapper,
    .form-check,
    .form-text {
      margin-bottom: 10px;
    }
  }*/
}
</style>
