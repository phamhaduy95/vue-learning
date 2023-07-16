<script setup lang="ts">
import { onUpdated, readonly, ref, watch } from 'vue';
import AnotherChild from './AnotherChild.vue';
import ChildComponent from './ChildComponent.vue';
import { type SampleData } from './type';
import { cloneDeep } from 'lodash';


const initialData: SampleData = readonly({
    id: crypto.randomUUID(),
    person: {
        id: crypto.randomUUID(),
        name: 'Hung'
    }
});

const data = ref(initialData);


const changePersonId = () => {
    // wont update child component when change value for deep child property. 
    data.value.person.id = crypto.randomUUID();
}

const changeToNewPerson = () => {
    data.value = cloneDeep(initialData)
}

const handleChangeIdClick = () => {
    changePersonId()
}

const handleChangeToNewPersonClick = () => {
    changeToNewPerson();
}

watch(
    () => data.value.person,
    (value, oldValue) => {
        console.log(value === oldValue)
    }
)

watch(
    () => data.value,
    (value, oldValue) => {
        console.log(value === oldValue)
    }
)

onUpdated(() => {
    console.log(' component update ')
})
</script>

<template>
    <v-container class="container">
        <v-row>
            <v-col>
                <p>id: {{ data.id }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p>person data :</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ChildComponent :data="data" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <AnotherChild :id="data.person.id" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn :variant="'outlined'" :ripple="false" @click="handleChangeIdClick">Update id</v-btn>
            </v-col>
            <v-col>
                <v-btn :variant="'outlined'" :ripple="false" @click="handleChangeToNewPersonClick">Update Person</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<style scoped lang="scss">
.container {
    width: 25rem;
}
</style>
