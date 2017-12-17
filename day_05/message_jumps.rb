#!/usr/bin/env bundle exec ruby

class MessageJumps
  attr_accessor :input, :threshold

  def initialize(input, threshold = Float::INFINITY)
    @input = input
    @threshold = threshold
  end

  def result
    step = 0
    stepCount = 0
    while input[step]
      increment = input[step]
      input[step] += threshold > increment ? 1 : -1
      step += increment
      stepCount += 1
    end
    stepCount
  end
end

class MessageJumpsCalculator
  attr_accessor :filename, :threshold

  def initialize(filename, threshold = Float::INFINITY)
    @filename = filename
    @threshold = threshold
  end

  def result
    file = File.read(filename)
    input = file.split("\n").map(&:to_i)
    MessageJumps.new(input, threshold).result
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts MessageJumpsCalculator.new( ARGV[0], ARGV[1].to_i ).result
end
