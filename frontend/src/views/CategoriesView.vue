<!-- Страница категорий -->

<template>
  <div class="categories-wrapper">

    <div class="category-wrapper">
      <CategoryItem :type="'owner'"/>
    </div>

    <div class="category-wrapper">
      <CategoryItem :type="'size'"/>
    </div>

    <div class="category-wrapper">
      <CategoryItem :type="'season'"/>
    </div>

    <div class="category-wrapper">
      <CategoryItem :type="'location'"/>
    </div>

    <div class="category-wrapper">
      <CategoryItem :type="'type'"/>
    </div>

  </div>

</template>

<script>
import CategoryItem from "@/components/CategoryItem.vue";

export default {
  name: 'Categories-View',
  components: { CategoryItem }
}

</script>

<style scoped lang="scss">

.categories-wrapper {
  display: flex;
  flex-wrap: wrap;

  .category-wrapper {
    min-height: 200px;
    width: 300px;
    margin: 10px;
  }
}

</style>