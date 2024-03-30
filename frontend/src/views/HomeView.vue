<!-- Страница с карточками и фильтрами -->

<template>

  <MqResponsive class="filter-responsive-sm" target="sm">

    <div class="cards-filter-menu-wrapper" v-if="rawCards && categories">
      <FilterMenu :rawCards="rawCards"
                  :rawCategories="categories"
                  @filter="onFilter"></FilterMenu>
    </div>

    <div class="cards-wrapper" v-if="cards && categories">
      <div class="card-wrapper" v-for="card in cards" :key="card.id">
        <CardItem :cardProp="card" :categoriesProp="categories"/>
      </div>
    </div>


  </MqResponsive>

  <MqResponsive class="filter-responsive-lg" target="md-lg">

    <div class="card-filter-wrapper" v-if="rawCards && categories">
      <FilterMenu :rawCards="rawCards"
                  :rawCategories="categories"
                  @filter="onFilter"></FilterMenu>
    </div>

    <div class="cards-wrapper" v-if="cards && categories">
      <div class="card-wrapper" v-for="card in cards" :key="card.id">
        <CardItem :cardProp="card" :categoriesProp="categories"/>
      </div>
    </div>

  </MqResponsive>

</template>

<script>
import CardItem from '@/components/CardItem.vue'
import CardsService from '@/services/card.service'
import CategoryService from "@/services/category.service";
import FilterMenu from "../components/FilterMenu.vue"
import { MqResponsive } from "vue3-mq";

export default {
  name: 'HomeView',
  components: {
    CardItem,
    FilterMenu,
    MqResponsive
  },
  data() {
    return {
      rawCards: null,
      cards: null,
      categories: null
    }
  },
  mounted(){
    this.getCards().then(cardsFromServer => {
      this.rawCards = cardsFromServer.data;
    });

    this.getCategories().then(categories => {
      this.categories = categories.data;
    });
  },
  methods: {

    // Получение всех карточек
    async getCards() {
      return await CardsService.getCards();
    },

    // Получение всех категорий
    async getCategories() {
      return await CategoryService.getCategories();
    },

    // При фильтрации меняем отображаемые карточки
    onFilter(cards) {
      console.log(cards);
      this.cards = cards;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

  .filter-div {
    height: 50px;
    background-color: $variables-background-primary;
  }

.filter-responsive-lg {
  display: grid;
  grid-template-columns: 200px auto;
}

  .cards-filter-menu-wrapper {
    //position: fixed;
    //right: 20px;
    top: 78px;
    width: 100%;
    background-color: $variables-background-primary;
    z-index: 1;
  }

  .cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .card-wrapper {
    }
  }
</style>