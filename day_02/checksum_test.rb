require 'minitest/autorun'
require './checksum'

describe Checksum do
  it 'returns the correct response' do
    Checksum.new('input/example_01.txt').result.must_equal 18
    Checksum.new('input/example_02.txt').result.must_equal 492
  end
end
