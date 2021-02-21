<template>
  <v-list two-line>
    <RecordsListitem
     v-for="record in records" :key="record.id" :record="record"
     />
  </v-list>
</template>
<script>
import RecordsListitem from './RecordsListitem.vue'
import RecordsService from './../services/records-service'
export default {
  name: 'RecordsList',
  components: {
    RecordsListitem
  },
  data: () => ({
    records: []
  }),
  async created () {
    this.records = await RecordsService.records()
  }

}
</script>
