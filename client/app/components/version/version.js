'use strict';

angular.module('openVote.version', [
  'openVote.version.interpolate-filter',
  'openVote.version.version-directive'
])

.value('version', '0.1');
