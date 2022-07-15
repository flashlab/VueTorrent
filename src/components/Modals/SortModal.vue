<template>
  <v-dialog
    v-model="dialog"
    scrollable
    content-class="rounded-form"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="justify-center primarytext--text">
        <h2>{{ $t('panel.sorttorrent') }}</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-6 mt-3 justify-center mx-auto">
          <v-container class="sortmodal">
            <v-select
              v-model="sort_options.sort"
              :value="sortProperty"
              flat
              class="ml-2 mr-2"
              :items="options"
              item-text="name"
              item-value="value"
              dense
              solo
              height="55"
            />
            <v-switch
              v-model="sort_options.reverse"
              class="v-input--reverse v-input--expand pa-0 ma-0"
              inset
              color="accent"
              style="padding-left: 10px !important"
            >
              <template #label>
                {{ $t('torrent.reverse') }}
              </template>
            </v-switch>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { Modal } from '@/mixins'
export default {
  name: 'Sort',
  mixins: [Modal],
  data() {
    return {
      sortProperty: { value: 'added_on', name: this.$t('torrent.added') },
      reverse: true
    }
  },
  computed: {
    ...mapState(['sort_options']),
    options() {
      return [
        { value: 'added_on', name: this.$t('torrent.added') },
        { value: 'availability', name: this.$t('torrent.availability') },
        { value: 'category', name: this.$t('category') },
        { value: 'completed', name: this.$t('torrent.completed') },
        { value: 'dlspeed', name: this.$t('torrent.dlspeed') },
        { value: 'downloaded', name: this.$t('torrent.downloaded') },
        { value: 'eta', name: this.$t('torrent.eta') },
        { value: 'name', name: this.$t('modals.search.name') },
        { value: 'num_leechs', name: 'Peers' },
        { value: 'priority', name: this.$t('torrent.priority') },
        { value: 'progress', name: this.$t('torrent.progress') },
        { value: 'ratio', name: this.$t('torrent.ratio') },
        { value: 'size', name: this.$t('modals.search.size') },
        { value: 'state', name: this.$t('torrent.state') },
        { value: 'time_active', name: this.$t('torrent.timeactive') },
        { value: 'uploaded', name: this.$t('torrent.uploaded') },
        { value: 'upspeed', name: this.$t('torrent.upspeed') },
        { value: 'tags', name: this.$t('torrent.tags') }
      ]
    }
  },
  methods: {
    close() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.sortmodal .v-select__selection,
.v-input__icon i {
    color: var(--search) !important;
}
// Reversed input variant
:deep(.v-input--reverse .v-input__slot) {
  @import "src/styles/styles.scss";
  @include reverse-switch;
}
</style>
