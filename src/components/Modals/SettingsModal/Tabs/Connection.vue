<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.connectionlimits') }}</v-subheader>
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
  </v-card>
</template>

<script>
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'Connection',
  mixins: [SettingsTab, FullScreenModal]
}
</script>