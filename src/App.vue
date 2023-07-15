
<script setup lang="ts">
import BaseList, { type Item, type BaseListProps } from './components/BaseList.vue';
const itemList: Array<Item> = [{ name: "van" }, { name: "hung" }];
const format: BaseListProps["format"] = (a) => {
  return a.toUpperCase();
}
</script>

<template>
  <BaseList :item-list="itemList" :format="format" />
</template>

<style scoped></style>
