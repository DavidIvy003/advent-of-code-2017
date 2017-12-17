#!/usr/bin/env bundle exec ruby

class MemoryReallocation
  attr_accessor :memory, :seen_memory

  def initialize(number)
    @memory = number
    @seen_memory = {}
  end

  def result
    memory = @memory
    counter = 0
    while !has_seen(memory)
      counter += 1
      add_to_seen(memory)
      max_bank_index = memory.index(memory.max)
      count = memory[max_bank_index]
      memory[max_bank_index] = 0
      memory = redistribute_memory(memory, count, max_bank_index)
    end
    counter
  end

  private def has_seen(memory)
    seen_memory[memory.join('')]
  end

  private def add_to_seen(memory)
    seen_memory[memory.join('')] = true
  end

  private def redistribute_memory(memory, count, current_index)
    count.times do |index|
      current_index += 1
      memory[current_index % memory.length] += 1
    end
    memory
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts MemoryReallocation.new( ARGV[0] ).result
end
