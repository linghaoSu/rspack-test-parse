<template>
  <remote-component
    v-if="!asyncLoading"
    ref="remoteComponentRef"
    :install-data="installData"
  />
</template>
<script lang="ts" setup>
import loadRemoteComponent from './loadRemoteComponent';

const props = defineProps({
  workload: {
    type: Object as PropType<any>,
    require: true,
    default: () => ({}),
  },
  cluster: {
    type: String,
    require: true,
    default: '',
  },
});

const emits = defineEmits(['resolve', 'reject']);

const installData = computed(() => ({
  workload: props.workload,
  cluster: props.cluster,
}));

const RemoteComponent = shallowRef<unknown>();

const remoteComponentRef = ref<RemoteComponentRef | null>();

const asyncLoading = ref(true);

const initComponent = async () => {
  asyncLoading.value = true;

  try {
    const remoteUrl = process.env.NODE_ENV === 'development' ? './remoteEntry.js' : '';

    const resCp = await loadRemoteComponent({
      url: remoteUrl,
      appId: 'test',
      scope: 'test',
      module: './CreateDialog.vue',
    });

    RemoteComponent.value = resCp;
  } catch (error) {
    console.error(error);
  } finally {
    asyncLoading.value = false;
  }
};

initComponent();
</script>
