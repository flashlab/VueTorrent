<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <v-data-table
        v-if="trackers"
        v-model="selectedTrackers"
        dense
        show-select
        :headers="headers"
        :items="trackers"
        :items-per-page="-1"
        item-key="url"
        mobile-breakpoint="0"
      >
        <template #body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.url">
              <td>
                <v-checkbox
                  v-if="typeof item.tier === 'number'"
                  v-model="selectedTrackers"
                  :value="item"
                  hide-details
                  class="pa-0 ma-0"
                  color="accent" 
                />
              </td>
              <td>{{ item.tier }}</td>
              <td>{{ item.url }}</td>
              <td>{{ formatTrackerStatus(item.status) }}</td>
              <td>{{ item.num_peers | formatTrackerNum }}</td>
              <td>{{ item.num_seeds | formatTrackerNum }}</td>
              <td>{{ item.num_leeches | formatTrackerNum }}</td>
              <td>{{ item.num_downloaded | formatTrackerNum }}</td>
              <td>{{ item.msg }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        class="error white--text elevation-0 px-4 mx-2"
        @click="DeleteTrackers"
      >
        {{ $t('delete') }}
      </v-btn>
      <v-dialog
        v-model="trackerDialog"
        content-class="rounded-form"
        persistent
        max-width="290"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            class="accent white--text elevation-0 px-4 mx-2"
            v-bind="attrs"
            v-on="on"
          >
            {{ $t('add') }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="justify-center">
            <h3>{{ $t('add') }} Trackers</h3>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="newTrackers"
              label="Trackers"
              rows="1"
              required
              autofocus
              auto-grow
              clearable
              hint="One link per line"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="red darken-1" text @click="closeAddTrackers">
              {{ $t('cancel') }}
            </v-btn>
            <v-btn color="green darken-1" text @click="addTrackers">
              {{ $t('add') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import qbit from '@/services/qbit'
import { FullScreenModal } from '@/mixins'
export default {
  name: 'Trackers',
  filters: {
    formatTrackerNum(num) {
      if (num === -1) {
        return 'N/A'
      }

      return num.toString()
    }
  },
  mixins: [FullScreenModal],
  props: { hash: String, isActive: Boolean },
  data() {
    return {
      trackerDialog: false,
      headers: [
        { text: '#', value: 'tier' },
        { text: 'URL', value: 'url' },
        { text: this.$t('torrent.status'), value: 'status' },
        { text: 'Peers', value: 'num_peers' },
        { text: this.$t('seeds'), value: 'num_seeds' },
        { text: this.$t('torrent.leeches'), value: 'num_leeches' },
        { text: this.$t('torrent.downloaded'), value: 'num_downloaded' },
        { text: this.$t('torrent.message'), value: 'msg' }
      ],
      map: [
        this.$t('torrent.disabled'),
        this.$t('torrent.disconnect'),
        this.$t('torrent.working'),
        this.$t('torrent.updating'),
        this.$t('torrent.notworking')
      ],
      tempTrackers: [],
      newTrackers: '',
      selectedTrackers: []
    }
  },
  computed: {
    trackers() {
      return this.tempTrackers.map(x => ({ ...x, isSelectable: typeof x.tier === 'number' }))
    }
  },
  watch: {
    isActive(active) {
      if (active) {
        this.getTorrentTrackers()
      }
    }
  },
  created() {
    this.getTorrentTrackers()
  },
  methods: {
    async getTorrentTrackers() {
      const { data } = await qbit.getTorrentTrackers(this.hash)
      this.tempTrackers = data
    },
    async addTrackers() {
      if (!this.newTrackers.length) return (this.trackerDialog = false)

      qbit.addTorrenTrackers(this.hash, this.newTrackers)
      this.newTrackers = ''
      await this.getTorrentTrackers()
      this.trackerDialog = false
    },
    closeAddTrackers() {
      this.newTrackers = ''
      this.trackerDialog = false
    },
    async DeleteTrackers() {
      if (!this.selectedTrackers.length) return 
      qbit.removeTorrentTrackers(this.hash, this.selectedTrackers.map(t => t.url))
      this.selectedTrackers = []
      await this.getTorrentTrackers()
    },
    formatTrackerStatus(status) {
      return this.map[status]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/colors.scss";

::v-deep .v-data-table thead th,
::v-deep .v-data-table tbody td {
  padding: 0 3px !important;
  height: auto;

  &:first-child {
    padding: 0 0 0 8px !important;
  }
  &:last-child {
    padding-right: 8px !important;
  }
}
::v-deep .v-data-table-header {
  white-space: nowrap;
}
::v-deep td {
  white-space: nowrap;
}
</style>

