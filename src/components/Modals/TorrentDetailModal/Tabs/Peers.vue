<template>
  <v-card flat>
    <v-data-table
      v-if="peers"
      dense
      :headers="headers"
      :items="peers"
      :items-per-page="-1"
      :hide-default-footer="true"
      mobile-breakpoint="0"
    >
      <template #item="row">
        <tr>
          <td class="ip">
            <template v-if="row.item.country_code">
              <img
                v-if="isWindows"
                class="country-flag"
                :title="row.item.country"
                :alt="codeToFlag(row.item.country_code).char"
                :src="codeToFlag(row.item.country_code).url"
              >
              <template v-else>
                {{
                  codeToFlag(row.item.country_code).char
                }}
              </template>
            </template>
            {{ row.item.ip }}
            <span class="grey--text">:{{ row.item.port }}</span>
          </td>
          <td>{{ row.item.connection }}</td>
          <td :title="row.item.flags_desc">
            {{ row.item.flags }}
          </td>
          <td>{{ row.item.client }}</td>
          <td>{{ row.item.progress | progress }}</td>
          <td>{{ row.item.dl_speed | networkSpeed }}</td>
          <td>{{ row.item.downloaded | networkSize }}</td>
          <td>{{ row.item.up_speed | networkSpeed }}</td>
          <td>{{ row.item.uploaded | networkSize }}</td>
          <td>{{ row.item.relevance | progress }}</td>
          <td>{{ row.item.files }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { map, merge } from 'lodash'
import qbit from '@/services/qbit'
import { codeToFlag, isWindows } from '@/helpers'
import { FullScreenModal } from '@/mixins'
export default {
  name: 'Peers',
  mixins: [FullScreenModal],
  props: { hash: String, isActive: Boolean },
  data() {
    return {
      refreshTimer: '',
      headers: [
        { text: 'IP', value: 'ip' },
        { text: this.$t('modals.settings.connection'), value: 'connection' },
        { text: this.$t('torrent.flags'), value: 'flags' },
        { text: this.$t('torrent.client'), value: 'client' },
        { text: this.$t('torrent.progress'), value: 'progress' },
        { text: this.$t('torrent.dlspeed'), value: 'dl_speed' },
        { text: this.$t('torrent.downloaded'), value: 'downloaded' },
        { text: this.$t('torrent.upspeed'), value: 'up_speed' },
        { text: this.$t('torrent.uploaded'), value: 'uploaded' },
        { text: this.$t('torrent.relevance'), value: 'relevance' },
        { text: this.$t('torrent.files'), value: 'files' }
      ],
      peersObj: null
    }
  },
  computed: {
    rid: {
      get() {
        return this.$store.state.rid
      },
      set(val) {
        this.$store.state.rid = val
      }
    },
    peers() {
      return map(this.peersObj, (value, key) => merge({}, value, { key }))
    }
  },
  watch: {
    isActive(active) {
      if (active) {
        this.getTorrentPeers()
      }
    }
  },
  created() {
    this.getTorrentPeers()
    this.refreshTimer = setInterval(function () {
      this.getTorrentPeers()
    }.bind(this), 2000)
  },
  beforeDestroy() {
    clearTimeout(this.refreshTimer)
  },
  methods: {
    codeToFlag(val) {
      return codeToFlag(val)
    },
    isWindows() {
      return isWindows()
    },
    async getTorrentPeers() {
      const { data } = await qbit.getTorrentPeers(
        this.hash,
        this.rid + 1 || undefined
      )

      this.rid = data.rid

      this.peersObj = data.peers
    }
  }
}
</script>

<style scoped>
::v-deep .ip {
  display: flex;
  align-items: center;
}

::v-deep .ip .country-flag {
  width: 1.5em;
  margin-right: 0.5em;
}
</style>
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
