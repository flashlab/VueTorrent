<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.privacy') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.dht"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.enabledht')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.pex"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.enablepex')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.lsd"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.enablelpd')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.lsd"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.enableano')"
      />
    </v-list-item>
    <v-divider insert />
    <v-list-item>
      <v-checkbox
        v-model="settings.queueing_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.torrentqueue')" 
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_downloads"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.maxdownload')"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_uploads"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.maxupload')"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_active_torrents"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.maxtorrent')"
        :disabled="!settings.queueing_enabled"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.dont_count_slow_torrents"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.donotcountslow')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_dl_rate_threshold"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.downloadthreshold')"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_ul_rate_threshold"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.uploadthreshold')"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.slow_torrent_inactive_timer"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.inactivetimer')"
        :disabled="!settings.dont_count_slow_torrents"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.seedlimits') }}</v-subheader>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox
            v-model="settings.max_ratio_enabled"
            hide-details
            class="ma-0 pa-0"
            :label="$t('modals.settings.whenratioreaches')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="settings.max_ratio"
            class="mb-2"
            outlined
            dense
            type="number"
            hide-details
            :disabled="!settings.max_ratio_enabled"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row dense>
        <v-col>
          <v-checkbox
            v-model="settings.max_seeding_time_enabled"
            hide-details
            class="ma-0 pa-0"
            :label="$t('modals.settings.whenseedtimeup')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="settings.max_seeding_time"
            class="mb-2"
            outlined
            dense
            type="number"
            hide-details
            :disabled="!settings.max_seeding_time_enabled"
          />
        </v-col>
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'BitTorrent',
  mixins: [SettingsTab, FullScreenModal]
}
</script>