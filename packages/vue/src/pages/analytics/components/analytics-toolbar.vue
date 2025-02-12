<template>
  <dx-toolbar>
    <dx-item location="before">
      <span class="toolbar-header">
        <slot />
      </span>
    </dx-item>

    <dx-item
      v-if="props.showTabs"
      location="before"
      locate-in-menu="auto"
    >
      <dx-tabs
        :selected-item-keys="[5]"
        key-expr="key"
        :items="analyticsPanelItems"
        @item-click="selectionChange($event)"
      />
    </dx-item>

    <dx-item
      location="after"
      locate-in-menu="auto"
      css-class="add-card"
    >
      <div>
        <dx-button
          icon="plus"
          text="Add Card"
          type="default"
          styling-mode="contained"
        />
      </div>
    </dx-item>

    <dx-item
      location="after"
      locate-in-menu="auto"
      widget="dxButton"
      show-text="inMenu"
      :options="{
        text: 'Refresh',
        icon: 'refresh'
      }"
    />

    <dx-item
      location="after"
      locate-in-menu="auto"
    >
      <div>
        <div class="separator" />
      </div>
    </dx-item>

    <dx-item
      location="after"
      locate-in-menu="auto"
      widget="dxButton"
      show-text="inMenu"
      :options="{
        icon: 'export',
        text: 'Export'
      }"
    />
  </dx-toolbar>
</template>

<script setup lang="ts">
import DxButton from 'devextreme-vue/button';
import {
  DxToolbar,
  DxItem,
} from 'devextreme-vue/toolbar';
import { DxTabs } from 'devextreme-vue/tabs';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { onMounted } from 'vue';
import { analyticsPanelItems } from '@/types/resource';

const props = withDefaults(defineProps<{
  showTabs?: boolean
}>(), { showTabs: false });

const emit = defineEmits(['tab-change']);
const [initialStartDate, initialEndDate] = analyticsPanelItems[4].value.split('/');

const selectionChange = (e: TabsItemClickEvent) => {
  const [startDate, endDate] = e.itemData.value.split('/');
  emit('tab-change', [startDate, endDate]);
};

onMounted(() => {
  emit('tab-change', [initialStartDate, initialEndDate]);
});
</script>

<style lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";

@include separator();
.toolbar-header {
  @include header();
}

.dx-tabs .dx-tab {
  background-color: $background-color;
  text-align: center;
}

@media only screen and (max-width: 400px) {
  .dx-tab {
    min-width: 70px;
  }
}
</style>
