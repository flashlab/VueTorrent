<template>
  <v-flex xs6 sm1 md1>
    <div class="caption grey--text">
      {{ $t('torrent.eta') }}
    </div>
    <div>
      {{ torrent.eta }}
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'ETA',
  props: ['torrent']
}
</script>
