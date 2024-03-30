<!-- Селектор категории -->

<template>
  <div class="category-wrapper">

    <div class="category-label">
      <span>{{label}}</span>
    </div>

    <div class="category-add elements-input-with-button">
      <input class="category-add-input elements-input"
             placeholder="Добавить"
             v-model="categoryName">
      <button class="category-add-button elements-button"
              :disabled="!categoryName"
              @click.prevent="addCategory()"
      >
<!--        <span>{{addLabel}}</span>-->
        <span>+</span>
      </button>
    </div>

    <div class="category-table-wrapper">
      <table>
        <tr v-for="item in list" :key="item.id">
          <td class="category-table-text">
            {{item.name}}
          </td>
          <td class="category-table-button">

            <div class="category-table-remove-wrapper">
              <div class="category-table-remove-arrow" @click.prevent="removeCategory(item.id)">
                <div class="category-table-remove-line"></div>
                <div class="category-table-remove-line"></div>
              </div>
            </div>

<!--            <div class="category-list-remove-wrapper">
              <div class="category-list-remove-arrow">
                <div class="category-list-remove-line"></div>
                <div class="category-list-remove-line"></div>
              </div>
            </div>-->

<!--            <button class="category-list-remove-button elements-button"
                    @click.prevent="removeCategory(item.id)">
              X
            </button>-->
          </td>
        </tr>
      </table>
    </div>

<!--    <div class="category-list">
      <ul class="category-list-ul">
        <li class="category-list-li" v-for="item in list" :key="item.id">
          <span class="category-list-span">{{item.name}}</span>
          <button class="category-list-remove-button"
                  @click.prevent="removeCategory(item.id)">
            X
          </button>
        </li>
      </ul>
    </div>-->

  </div>
</template>

<script>
import CategoryService from '../services/category.service'

export default {
  name: 'Category-Item',
  components: {  },
  props: ['type'],
  data() {
    return {
      categoryName: '',
      list: [],
      defaults: {
        owner: {
          label: 'Владельцы',
          addLabel: 'Добавить владельца'
        },
        size: {
          label: 'Размеры',
          addLabel: 'Добавить размер'
        },
        season: {
          label: 'Сезоны',
          addLabel: 'Добавить сезон'
        },
        location: {
          label: 'Где находится',
          addLabel: 'Добавить место'
        },
        type: {
          label: 'Тип обуви',
          addLabel: 'Добавить тип'
        }
      }
    }
  },
  computed: {

    // Возвращаем название категории
    label() {
      return this.defaults[this.type].label;
    },

    // Возвращаем текст добавления нового значения для категории
    addLabel() {
      return this.defaults[this.type].addLabel;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {

    // Получем значения для категории
    getList() {
      CategoryService.getCategories(this.type).then(result => {
        this.list = result.data;
      });
    },

    // Добавляем значение в категорию
    addCategory() {
      CategoryService.setCategory(this.type, this.categoryName).then(result => {
        this.list = result.data;
      });
      this.categoryName = '';
    },

    // Удаляем значение из категории
    removeCategory(id) {
      CategoryService.removeCategory(this.type, id).then(result => {
        this.list = result.data;
      });
    }
  }
}
</script>


<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/elements";

.category-wrapper {
  border: 1px solid $variables-main;
  border-radius: $variables-card-border-radius;
  //background-color: $variables-background-secondary;

  .category-label {
    text-align: left;
    margin-top: -15px;
    padding: 5px;

    span {
      background-color: $variables-background-primary;
      color: $variables-main;
      padding: 0 3px;
      margin-left: 10px;
    }
  }

  .category-add {
    padding-left: 10px;
    text-align: left;

    .category-add-input {
      width: 240px;
    }
  }

  .category-table-wrapper {
    margin-top: 10px;
    width: 100%;
    color: $variables-text-primary;

    table {
      width: 100%;

      tr {
        height: 30px;

        .category-table-text {
          text-align: left;
          padding-left: 10px;
        }

        .category-table-button {
          width: 40px;

          button {
            //margin-right: 4px;
          }
        }
      }
    }
  }
}

</style>