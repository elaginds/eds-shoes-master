<!-- Меню с фильтрами, обеспечивает фильтрацию -->

<template>

  <MqResponsive class="filter-menu-sm" target="sm">

    <div class="filters-top-menu-wrapper">

      <div class="filters-top-menu-button button-first">
        <button class="elements-button" @click="showModal = true">Фильтры</button>
      </div>

      <div class="filters-top-menu-button">
        <button class="filters-top-menu-button-circle filters-top-menu-button-star"
                :class="{ pressed: (filter.favorites === true)}"
                @click="onChangeFastIcon('favorites')">
          <font-awesome-icon icon="star" />
        </button>
      </div>

      <div class="filters-top-menu-button">
        <button class="filters-top-menu-button-circle filters-top-menu-button-triangle"
                :class="{ pressed: (filter.filled === false)}"
                @click="onChangeFastIcon('filled')">
          <font-awesome-icon icon="triangle-exclamation" />
        </button>
      </div>

      <div class="filters-top-menu-items">
        <div class="filters-top-menu-item" v-for="(item, index) in topMenuItems" :key="index">
          {{ item.label }}
          <div class="filter-top-menu-item-remove-wrapper">
            <div class="filter-top-menu-item-remove-arrow" @click.prevent="onRemoveTopMenuItem(item)">
              <div class="filter-top-menu-item-remove-line"></div>
              <div class="filter-top-menu-item-remove-line"></div>
            </div>
          </div>
        </div>



      </div>

    </div>


    <transition name="modal" v-if="showModal">
      <div class="common-modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="filters-wrapper">
              <CardFilter :rawValues="filter" :rawCategories="categories" @filter="onFilter"></CardFilter>
            </div>

            <div class="filters-buttons">
              <button class="elements-button" @click="showModal = false">Закрыть</button>
            </div>

          </div>
        </div>
      </div>
    </transition>
  </MqResponsive>

  <MqResponsive class="filter-menu-lg" target="md-lg" v-if="filter && categories">
    <CardFilter :rawValues="filter" :rawCategories="categories" @filter="onFilter"></CardFilter>
  </MqResponsive>


<!--  <div class="filter-menu-wrapper">
    <div class="filter-menu-label">
      <span>Фильтры</span>
    </div>

    <div class="filter-menu-names">
      NAMES
    </div>
  </div>-->

</template>

<script>
import CardFilter from "@/components/CardFilter.vue";
import { MqResponsive } from "vue3-mq";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'FilterMenu',
  components: {
    FontAwesomeIcon,
    CardFilter,
    MqResponsive
  },
  props: {
    rawCards: null,
    rawCategories: null
  },
  emits: ['filter'],
  data() {
    return {
      showModal: false,
      filteredCards: null,
      categories: null,
      filter: {
        ownerId: -1,
        size: -1,
        season: -1,
        location: -1,
        type: -1,
        outdoor: -1,
        casual: -1,
        favorites: -1,
        filled: -1,
        trash: -1,
      },
      defaultFilterValues: {
        owner: {id: -1, name: 'Любой'},
        size: {id: -1, name: 'Любой'},
        season: {id: -1, name: 'Любой'},
        location: {id: -1, name: 'Не важно'},
        type: {id: -1, name: 'Любой'},
        outdoor: [
          { id: -1, name: 'Любая'},
          { id: false, name: 'Домашняя'},
          { id: true, name: 'Уличная'}
        ],
        casual: [
          { id: -1, name: 'Любая'},
          { id: false, name: 'Выходная'},
          { id: true, name: 'Повседневная'}
        ],
        favorites: [
          { id: -1, name: 'Любая'},
          { id: false, name: 'Обычное'},
          { id: true, name: 'Избранное'}
        ],
        filled: [
          { id: -1, name: 'Любая'},
          { id: false, name: 'Незаполненные'},
          { id: true, name: 'Заполненные'}
        ],
        trash: [
          { id: -1, name: 'Любая'},
          { id: false, name: 'Хорошая'},
          { id: true, name: 'На выброс'}
        ]
      },
      topMenuItems: []
    }
  },
  mounted() {
    this.addAllCategories();

    this.filterCards(this.filter);
  },
  methods: {

    // Добавляет все категории
    addAllCategories() {
      const categories = JSON.parse(JSON.stringify(this.rawCategories));

      for (const name in categories) {
        categories[name].unshift(this.defaultFilterValues[name]);
      }

      categories.outdoor = this.defaultFilterValues.outdoor;
      categories.casual = this.defaultFilterValues.casual;
      categories.favorites = this.defaultFilterValues.favorites;
      categories.filled = this.defaultFilterValues.filled;
      categories.trash = this.defaultFilterValues.trash;

      this.categories = categories;
    },

    // Фильтрация карточек
    filterCards(values) {
      let cards = [...this.rawCards];

      for (const name in values) {
        cards = this.filterCategory(name, cards);
      }

      this.$emit('filter', cards);
    },

    // Фильтрация карточек по одной категории
    filterCategory(name, cards) {
      if (this.filter[name] === -1) {
        return cards;
      }

      return cards.filter(item => {
        return item[name] === this.filter[name];
      });
    },

    // Запрос на фильтрацию
    onFilter(values) {
      this.changeTopMenuItems(values);
      this.filterCards(values);
    },

    // Названия значений фильтра для мобильной версии
    changeTopMenuItems(values) {
      this.topMenuItems = [];

      for (const name in values) {
        const categoriesName = (name === 'ownerId') ? 'owner' : name;

        if (values[name] !== -1) {
          const fItem = this.categories[categoriesName].filter(item => {
            return (item.id === values[name]);
          });

          this.topMenuItems.push({
            id: fItem[0].id,
            name,
            label: fItem[0].name
          });
        }
      }
    },

    // Убираем название значения фильтра для мобильной версии
    onRemoveTopMenuItem(item) {
      if (this.filter && this.filter[item.name] !== undefined) {
        this.filter[item.name] = -1;
      }

      this.onFilter(this.filter);
    },

    // Применение значений для ИЗБРАННОГО и НЕЗАПОЛНЕННОГО для мобильной версии
    onChangeFastIcon(name) {
      if (name === 'favorites') {
        this.filter.filled = -1;

        if (this.filter[name] === -1) {
          this.filter[name] = true;
        } else if (this.filter[name] === true) {
          this.filter[name] = -1;
        }
      } else if (name === 'filled') {
        this.filter.favorites = -1;

        if (this.filter[name] === -1) {
          this.filter[name] = false;
        } else if (this.filter[name] === false) {
          this.filter[name] = -1;
        }
      }

      this.filterCards(this.filter);
    }
  }
}

</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/elements";

.filters-top-menu-wrapper {
  display: flex;
  margin-bottom: 20px;

  .filters-top-menu-button {
    margin-left: 10px;

    &.button-first {
      margin-left: 20px;
    }

    .filters-top-menu-button-circle {
      height: 26px;
      width: 26px;
      font-size: 16px;
      //padding-left: 3px;
      border: 1px solid $variables-text-primary;
      background-color: $variables-background-primary;
      border-radius: 30px;
      color: $variables-text-primary;

      &.filters-top-menu-button-star {
        padding-left: 3px;
      }

      &.filters-top-menu-button-triangle {
        padding-left: 4px;
      }

      &.pressed {
        color: $variables-main;
        border: 1px solid $variables-main;
      }
    }
  }

  .filters-top-menu-items {
    display: flex;
    flex-wrap: wrap;

    .filters-top-menu-item {
      background-color: $variables-background-primary;
      color: $variables-text-primary;
      border: 1px solid $variables-main;
      margin-left: 10px;
      margin-bottom: 15px;

      height: 26px;
      line-height: 30px;
      padding: 0 10px;
      border-radius: $variables-card-border-radius;
    }
  }
}

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

</style>