const fs = require('fs');

const UP_DIRECTION = 'UP';
const DOWN_DIRECTION = 'DOWN';

const getScannersAndDepth = (input) => {
  let scanners = [];
  input.split("\n").forEach((line) => {
    const [ programId, depth ] = line.split(': ').map((i) => +i);
    scanners[programId] = {
      depth,
      direction: UP_DIRECTION,
      position: 0,
    };
  });
  return scanners;
};

const incrementScanner = (depth, position, direction) => {
  if (direction === UP_DIRECTION) {
    if (depth > position + 1) return {
      depth,
      direction,
      position: position + 1,
    };
    return {
      depth,
      direction: DOWN_DIRECTION,
      position: position - 1,
    };
  }
  if (0 <= position - 1) return {
    depth,
    direction,
    position: position - 1,
  };
  return {
    depth,
    direction: UP_DIRECTION,
    position: position + 1,
  };
};

const incrementScanners = (scanners) =>
  scanners.map(({ depth, position, direction }) => incrementScanner(depth, position, direction));

const getDetections = (scanners) => {
  let detections = [];
  [...Array(scanners.length)].forEach((_, i) => {
    if (scanners[i] && scanners[i].position === 0) {
      detections.push({
        depth: scanners[i].depth,
        range: i,
      });
    }
    scanners = incrementScanners(scanners);
  });
  return detections;
};

const isDetected = (scanners) =>
  [...Array(scanners.length)].some((_, i) => {
    if (scanners[i] && scanners[i].position === 0) {
      return true;
    }
    scanners = incrementScanners(scanners);
    return false;
  });

const calculateSeverity = (detections) =>
  detections.reduce((sum, detection) => sum + (detection.depth * detection.range), 0);

const getSeverity = (filename) => {
  const input = fs.readFileSync(filename).toString().trim();
  const scanners = getScannersAndDepth(input);
  const detections = getDetections(scanners);
  return calculateSeverity(detections);
};

const getDelayToAvoidCapture = (filename) => {
  const input = fs.readFileSync(filename).toString().trim();
  let scanners = getScannersAndDepth(input);
  let delayCount = 0;
  while(isDetected(scanners)) {
    scanners = incrementScanners(scanners);
    delayCount++;
  }
  return delayCount;
};

module.exports = {
  getSeverity,
  getDelayToAvoidCapture,
};
