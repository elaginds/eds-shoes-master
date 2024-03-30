<!-- Фильтры для карточек -->

<template>

  <div class="card-filter-wrapper" v-if="rawCategories && values">

    <div class="owner-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.owner">
      <div>
        <span class="form-select-label elements-select-label">Владелец</span>
      </div>
      <select class="form-select elements-select"
              v-model="values.ownerId"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.owner"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="size-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.size">
      <div>
        <span class="form-select-label elements-select-label">Размер</span>
      </div>
      <select class="form-select elements-select"
              v-model="values.size"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.size"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="season-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.season">
      <div>
        <span class="form-select-label elements-select-label">Сезон</span>
      </div>
      <select class="form-select elements-select"
              v-model="values.season"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.season"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="location-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.location">
      <div>
        <span class="form-select-label elements-select-label">Где находится</span>
      </div>
      <select class="form-select elements-select"
              v-model="values.location"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.location"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="type-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.type">
      <div>
        <span class="form-select-label elements-select-label">Тип</span>
      </div>

      <select class="form-select elements-select"
              v-model="values.type"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.type"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="type-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.outdoor">
      <div>
        <span class="form-select-label elements-select-label">Уличная</span>
      </div>

      <select class="form-select elements-select"
              v-model="values.outdoor"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.outdoor"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="type-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.casual">
      <div>
        <span class="form-select-label elements-select-label">Повседневная</span>
      </div>

      <select class="form-select elements-select"
              v-model="values.casual"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.casual"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="type-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.favorites">
      <div>
        <span class="form-select-label elements-select-label">Избранное</span>
      </div>

      <select class="form-select elements-select"
              v-model="values.favorites"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.favorites"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="type-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.filled">
      <div>
        <span class="form-select-label elements-select-label">Незаполненные</span>
      </div>

      <select class="form-select elements-select"
              v-model="values.filled"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.filled"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>

    <div class="type-select select-wrapper elements-filter-select-wrapper" v-if="rawCategories.trash">
      <div>
        <span class="form-select-label elements-select-label">На выброс</span>
      </div>

      <select class="form-select elements-select"
              v-model="values.trash"
              @change="onChangeFilter()"
      >
        <option v-for="item in rawCategories.trash"
                :name="item.name"
                :value="item.id"
                :key="item.id"
        >
          {{item.name}}
        </option>
      </select>
    </div>


  </div>

</template>

<script>
export default {
  name: 'CardFilter',
  props: {
    rawValues: null,
    rawCategories: null
  },
  emits: ['filter'],
  data() {
    return {
      values: null
    }
  },
  mounted() {
    this.values = this.rawValues;
  },
  methods: {
    // При изменении значения фильтра - отправляется новое значение
    onChangeFilter() {
      this.$emit('filter', this.values);
    }
  }
}

</script>

<style scoped lang="scss">
  @import "../styles/elements";

  .card-filter-wrapper {
    display: flex;
    flex-wrap: wrap;

    .select-wrapper {
      margin: 0 10px 20px 0;
    }
  }
</style>