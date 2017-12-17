require 'minitest/autorun'
require './message_jumps'

describe MessageJumps do
  it 'always increments positive' do
    MessageJumps.new([0, 3, 0, 1, -3]).result.must_equal 5
    MessageJumps.new([1, 3, 0, 1, -3]).result.must_equal 4
  end

  it 'alway increment if above threshold' do
    MessageJumps.new([0, 3, 0, 1, -3], 3).result.must_equal 10
    MessageJumps.new([1, 3, 0, 1, -3], 3).result.must_equal 9
  end
end

describe MessageJumpsCalculator do
  it 'always increments positive' do
    MessageJumpsCalculator.new('./input/example_01.txt').result.must_equal 5
    MessageJumpsCalculator.new('./input/example_02.txt').result.must_equal 351282
  end

  it 'alway increment if above threshold' do
    MessageJumpsCalculator.new('./input/example_01.txt', 3).result.must_equal 10
    MessageJumpsCalculator.new('./input/example_02.txt', 3).result.must_equal 24568703
  end
end
