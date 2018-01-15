const expect = require('chai').expect;
const PacketScanners = require('./packetScanners');

const {
  getDelayToAvoidCapture,
  getSeverity,
} = PacketScanners;

describe('PacketScanners', () => {
  it('returns the severity', () => {
    expect(getSeverity('input/example_01.txt')).to.equal(24);
    expect(getSeverity('input/example_02.txt')).to.equal(648);
  });

  it('returns the delay to not get caught', () => {
    expect(getDelayToAvoidCapture('input/example_01.txt')).to.equal(10);
    expect(getDelayToAvoidCapture('input/example_02.txt')).to.equal(3933124);
  }).timeout(100000); // Takes about 39s to run
});
