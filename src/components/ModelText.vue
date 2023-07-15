<script setup lang="ts">
import type { PropType } from 'vue';
import { ref, watch } from 'vue';

type PeopleInfo = {
    id: string,
    name: string,
    age: number,
}

const props = defineProps({
    data: {
        type: Object as PropType<PeopleInfo>,
        required: true,
    },
});

const personData = ref<PeopleInfo>({ name: "hung", age: 3, id: "1" });



const nameInput = ref("");

watch(() => props.data, (value) => {
    personData.value = structuredClone(value);
})


const emit = defineEmits<{
    (e: "update:data", value: PeopleInfo): void,
}>();

watch(() => personData.value, (value) => {
    emit("update:title", value.name);
})

const clearInput = () => {
    nameInput.value = "";
}

const confirmName = () => {
    personData.value.name = nameInput.value;
}

</script>


<template>
    <div class="container">
        <input v-model="nameInput" />
        <div class="controller">
            <button @click="clearInput">Clear</button>
            <button @click="confirmName">Confirm</button>
        </div>
    </div>
</template>



<style scoped></style>