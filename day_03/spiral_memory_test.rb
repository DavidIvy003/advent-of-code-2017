require 'minitest/autorun'
require './spiral_memory'

describe SpiralMemory do
  it 'finds the distance to 0,0' do
    SpiralMemory.new(1).distance.must_equal 0
    SpiralMemory.new(12).distance.must_equal 3
    SpiralMemory.new(23).distance.must_equal 2
    SpiralMemory.new(1024).distance.must_equal 31
    SpiralMemory.new(347991).distance.must_equal 480
  end

  it 'gets the value at specified point' do
    SpiralMemory.new(1).value.must_equal 1
    SpiralMemory.new(2).value.must_equal 1
    SpiralMemory.new(3).value.must_equal 2
    SpiralMemory.new(4).value.must_equal 4
    SpiralMemory.new(5).value.must_equal 5
    SpiralMemory.new(6).value.must_equal 10
    SpiralMemory.new(23).value.must_equal 806
  end

  it 'finds the first value higher than input number' do
    SpiralMemory.new(6).first_value_above_input.must_equal 10
    SpiralMemory.new(7).first_value_above_input.must_equal 10
    SpiralMemory.new(23).first_value_above_input.must_equal 25
    SpiralMemory.new(34).first_value_above_input.must_equal 54
    SpiralMemory.new(347991).first_value_above_input.must_equal 349975
  end
end
