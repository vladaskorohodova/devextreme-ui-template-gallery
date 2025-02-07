<template>
  <dx-popup
    ref="popup"
    v-if="isVisible"
    :title="props.title"
    :visible="isVisible"
    :full-screen="screenInfo.isSmall || screenInfo.isXSmall"
    width="auto"
    height="auto"
    @option-changed="() => popup?.instance?.repaint()"
  >
    <dx-popup-item
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="{
        text: 'Save',
        stylingMode: 'outlined',
        type: 'default',
        onClick: save,
      }"
    />
    <dx-popup-item
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="{
        text: 'Cancel',
        stylingMode: 'text',
        type: 'default',
        onClick: close
      }"
    />
    <dx-validation-group ref="validationGroup">
      <slot />
    </dx-validation-group>
  </dx-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DxPopup, DxToolbarItem as DxPopupItem } from 'devextreme-vue/popup';
import { screenInfo } from '@/utils/media-query';
import { DxValidationGroup } from 'devextreme-vue';
import validationEngine from 'devextreme/ui/validation_engine';

const props = withDefaults(
  defineProps<{
    title: string,
  isVisible: boolean,
}>(),
  {
    isVisible: false,
  },
);
const validationGroup = ref<InstanceType<typeof DxValidationGroup>>();

const emit = defineEmits(['save', 'update:isVisible']);

const isVisible = ref(props.isVisible);
const popup = ref<InstanceType<typeof DxPopup>>();

watch(
  () => props.isVisible,
  (newValue) => {
    isVisible.value = newValue;
  },
);

const save = () => {
  if (validationEngine.validateGroup(validationGroup.value?.instance).isValid) {
    emit('save');
  }
};

const close = () => {
  isVisible.value = false;
  emit('update:isVisible', false);
};
</script>
