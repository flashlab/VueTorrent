<template>
  <v-card flat>
    <v-subheader>
      {{ $t("modals.settings.connectionlimits") }}
    </v-subheader>
    <v-list-item>
      <v-text-field
        v-model="settings.max_connec"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.globalmaxconnection')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_connec_per_torrent"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.maxconnectioneach')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_uploads"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.globalmaxupload')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_uploads_per_torrent"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.maxuploadeach')"
      />
    </v-list-item>
    <v-divider />
    <v-subheader>
      {{ $t("modals.settings.proxySubHeader") }}
    </v-subheader>
    <v-list-item>
      <v-row class="ml-5 mr-5 pb-4">
        <v-col cols="5" class="pa-0 pr-2">
          <v-select
            v-model="settings.proxy_type"
            outlined
            dense
            hide-details
            small-chips
            :items="proxyTypes"
          />
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-text-field
            v-model="settings.proxy_ip"
            class="mr-1"
            outlined
            dense
            hide-details
            :label="$t('modals.settings.ipAddress')"
          />
        </v-col>
        <v-col cols="3" class="pa-0">
          <v-text-field
            v-model="settings.proxy_port"
            class="ml-1"
            outlined
            dense
            type="number"
            hide-details
            :label="$t('modals.settings.port')"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.proxy_peer_connections"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.proxyPeerConnections')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.proxy_torrents_only"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.proxyTorrentOnly')"
      />
    </v-list-item>
    <v-divider />
    <v-list-item>
      <v-checkbox
        v-model="settings.proxy_auth_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.proxyAuth')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.proxy_username"
        class="mb-2"
        outlined
        dense
        hide-details
        :disabled="!settings.proxy_auth_enabled"
        :label="$t('username')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.proxy_password"
        class="mb-2"
        outlined
        dense
        hide-details
        type="password"
        :disabled="!settings.proxy_auth_enabled"
        :label="$t('password')"
      />
    </v-list-item>
  </v-card>
</template>

<script>
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'Connection',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      proxyTypes: [
        {
          value: -1,
          text: 'None'
        },
        {
          value: 1,
          text: 'HTTP proxy without authentication'
        },
        {
          value: 2,
          text: 'SOCKS5 proxy without authentication'
        },
        {
          value: 3,
          text: 'HTTP proxy with authentication'
        },
        {
          value: 4,
          text: 'SOCKS5 proxy with authentication'
        },
        {
          value: 5,
          text: 'SOCKS4 proxy without authentication'
        }
      ]
    }
  },
  computed: {
    getProxyTypeName(value) {
      return this.proxyTypes.filter(item => item.value !== value)[0]
    }
  }
}
</script>
