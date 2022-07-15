<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.whenaddtorrent') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.create_subfolder_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.createsubfolder')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.start_paused_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.donotautostart')"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.publicsettings') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.preallocate_all"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.preallocateforall')"
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.incomplete_files_ext"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.appendtoincomplete')"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>{{ $t('modals.settings.savingmanage') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.auto_tmm_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.automanage')"
      />
    </v-list-item>
    <v-list-item class="mb-2">
      <v-checkbox
        v-model="settings.save_path_changed_tmm_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.relocateoncatchange')"
      />
    </v-list-item>
    <v-list-item class="mb-2">
      <v-text-field
        v-model="settings.save_path"
        class="mb-2"
        outlined
        dense
        :label="$t('modals.settings.defaultdavepath')"
        hide-details
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.temp_path_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.keepincompletein')"
      />
    </v-list-item>
    <v-list-item v-if="settings.temp_path_enabled">
      <v-text-field
        v-model="settings.temp_path"
        class="mb-2"
        outlined
        dense
        hide-details
      />
    </v-list-item>
    <v-list-item>
      <v-checkbox
        v-model="settings.autorun_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.enableautorun')"
      />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled">
      <v-text-field
        v-model="settings.autorun_program"
        class="mb-2"
        outlined
        dense
        :label="$t('modals.settings.autorunprogram')"
        hide-details
      />
    </v-list-item>
    <v-list-item v-if="settings.autorun_enabled" class="mb-4">
      <v-card flat color="grey--text selected">
        <v-card-text>
          <h5>{{ $t('modals.settings.supportparam') }}</h5>
          <ul>
            <li>%N: {{ $t('modals.settings.torrentname') }} </li>
            <li>%L: {{ $t('category') }}</li>
            <li>%G: {{ $t('modals.settings.tags') }}</li>
            <li>%F: {{ $t('modals.settings.contentpath') }}</li>
            <li>%R: {{ $t('modals.settings.rootpath') }}</li>
            <li>%D: {{ $t('modals.settings.savepath') }}</li>
            <li>%C: {{ $t('modals.settings.numofiles') }}</li>
            <li>%Z: {{ $t('modals.settings.torrentsize') }}</li>
            <li>%T: {{ $t('modals.settings.currtracker') }}</li>
            <li>%I: {{ $t('modals.settings.infohash') }} v1</li>
            <li>%J: {{ $t('modals.settings.infohash') }} v2</li>
            <li>%K: {{ $t('modals.settings.torrentid') }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-list-item>
  </v-card>
</template>
<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'Downloads',
  mixins: [SettingsTab, FullScreenModal]
}
</script>
