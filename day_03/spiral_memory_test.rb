require 'minitest/autorun'
require './spiral_memory'

describe SpiralMemory do
  it 'returns the correct response' do
    SpiralMemory.new(1).result.must_equal 0
    SpiralMemory.new(12).result.must_equal 3
    SpiralMemory.new(23).result.must_equal 2
    SpiralMemory.new(1024).result.must_equal 31
    SpiralMemory.new(347991).result.must_equal 480
  end
end
