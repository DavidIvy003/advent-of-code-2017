require 'minitest/autorun'
require './checksum'

describe Checksum do
  it 'max min checksum' do
    Checksum.new('input/example_01.txt').result.must_equal 18
    Checksum.new('input/example_02.txt').result.must_equal 492
    Checksum.new('input/example_03.txt').result.must_equal 45351
  end

  it 'divisible checksum' do
    Checksum.new('input/example_04.txt', 'DIVISIBLE').result.must_equal 9
    Checksum.new('input/example_03.txt', 'DIVISIBLE').result.must_equal 275
  end
end
