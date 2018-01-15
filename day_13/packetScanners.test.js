const expect = require('chai').expect;
const PacketScanners = require('./packetScanners');

const {
  getSeverity,
} = PacketScanners;

describe('PacketScanners', () => {
  it('returns the severity', () => {
    expect(getSeverity('input/example_01.txt')).to.equal(24);
    expect(getSeverity('input/example_02.txt')).to.equal(648);
  });
});
