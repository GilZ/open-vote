'use strict';

describe('openVote.version module', function() {
  beforeEach(module('openVote.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
