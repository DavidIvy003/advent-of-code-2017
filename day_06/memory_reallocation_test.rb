require 'minitest/autorun'
require './memory_reallocation'

describe MemoryReallocation do
  it 'returns the correct response' do
    MemoryReallocation.new([0, 0, 0, 0, 0]).result.must_equal 1
    MemoryReallocation.new([0, 2, 7, 0]).result.must_equal 5
    MemoryReallocation.new([4, 1, 15, 12, 0, 9, 9, 5, 5, 8, 7, 3, 14, 5, 12, 3]).result.must_equal 6681
  end
end
