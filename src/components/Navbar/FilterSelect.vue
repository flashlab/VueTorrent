<template>
  <div class="mt-1">
    <label class="white--text text-uppercase font-weight-medium caption ml-4">
      {{ $t('torrent.status') }}
    </label>
    <v-select
      name="state_filter"
      aria-label="state_filter"
      :value="selectedState"
      class="ml-2 mr-2"
      label="STATUS"
      flat
      solo
      :items="selectedOptions"
      item-text="name"
      color="download"
      item-color="download"
      background-color="secondary"
      @input="setState"
    />
    <label class="white--text text-uppercase font-weight-medium caption ml-4">
      {{ $t('category') }}
    </label>
    <v-select
      aria-label="category_filter"
      :value="selectedCategory"
      flat
      solo
      class="ml-2 mr-2"
      label="CATEGORIES"
      :items="availableCategories"
      item-text="name"
      color="download"
      item-color="download"
      background-color="secondary"
      @input="setCategory"
    />
    <div v-if="showTrackerFilter">
      <label class="white--text text-uppercase font-weight-medium caption ml-4">
        Tracker
      </label>
      <v-select
        aria-label="tracker_filter"
        :value="selectedTracker"
        flat
        solo
        class="ml-2 mr-2"
        label="TRACKER"
        :items="availableTrackers"
        item-text="name"
        color="download"
        item-color="download"
        background-color="secondary"
        @input="setTracker"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'FilterSelect',
  props: ['showTrackerFilter'],
  data() {
    return {
      selectedState: null,
      selectedCategory: null,
      selectedTracker: null
    }
  },
  computed: {
    ...mapGetters(['getCategories', 'getTrackers']),
    ...mapState(['sort_options']),
    availableCategories() {
      const categories = [
        { name: this.$t('navbar.all'), value: null },
        { name: this.$t('navbar.uncat'), value: '' }]
      categories.push(...this.getCategories().map(c => {
        return { name: c.name, value: c.name }
      }))

      return categories
    },
    availableTrackers() {
      const trackers = [
        { name: this.$t('navbar.all'), value: null },
        { name: this.$t('torrent.notworking'), value: '' }
      ]
         
      if (this.showTrackerFilter) {
        trackers.push(...this.getTrackers().map(t => {
          return {
            name: t, value: t
          }
        }))
      }

      return trackers
    },
    selectedOptions() {
      return [
        { value: null, name: this.$t('navbar.all') },
        { value: 'downloading', name: this.$t('navbar.downloading') },
        { value: 'seeding', name: this.$t('navbar.seeding') },
        { value: 'completed', name: this.$t('torrent.completed') },
        { value: 'resumed', name: this.$t('navbar.resumed') },
        { value: 'paused', name: this.$t('navbar.paused') },
        { value: 'active', name: this.$t('navbar.active') },
        { value: 'inactive', name: this.$t('navbar.inactive') },
        { value: 'stalled', name: this.$t('navbar.stalled') },
        { value: 'stalled_uploading', name: this.$t('navbar.stalledup') },
        { value: 'stalled_downloading', name: this.$t('navbar.stalleddl') },
        { value: 'errored', name: this.$t('navbar.errored') }
      ]
    }
  },
  mounted() {
    this.setDefaultValues()
  },
  methods: {
    applyFilter() {
      this.$store.commit('UPDATE_SORT_OPTIONS', {
        filter: this.selectedState,
        category: this.selectedCategory,
        tracker: this.selectedTracker
      })
    },
    setState(value) {
      this.selectedState = value
      this.applyFilter()
    },
    setTracker(value) {
      this.selectedTracker = value
      this.applyFilter()
    },
    setCategory(value) {
      this.selectedCategory = value
      this.applyFilter()
    },
    setDefaultValues() {
      const options = this.selectedOptions
      this.selectedState = options.find(o => o.value === this.sort_options.filter).value || options[0].value
    }
  }
}
</script>

<style lang="scss">
.v-select__selection,
.v-input__icon svg {
  color: #64ceaa !important;
}
.v-select__slot > label {
  color: white !important;
}
#app .v-select .v-text-field__details {
  display: none;
}

#app .v-select .v-select__selection {
  padding: 16px 0;
  margin: 0;
}
</style>

