#!/usr/bin/env bundle exec ruby

class Checksum
  attr_accessor :rows, :method

  def initialize(filename, method='MAX_MIN')
    file = File.read(filename)
    @rows = file.split("\n")
    @method = method
  end

  def result
    sum = 0
    rows.each do |row|
      columns = row.split(' ').map(&:to_f)
      sum += rowChecksum(columns)
    end
    sum
  end

  private def rowChecksum(columns)
    if method == 'MAX_MIN'
      maxMinChecksum(columns)
    elsif method == 'DIVISIBLE'
      divisibleChecksum(columns)
    end
  end

  private def maxMinChecksum(columns)
    highest = columns.max
    lowest = columns.min
    highest - lowest
  end

  private def divisibleChecksum(columns)
    numerator = nil
    denominator = columns.find do |denominator|
      numerator = columns.find do |numerator|
        denominator != numerator && numerator % denominator == 0
      end
    end
    numerator / denominator
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts Checksum.new( ARGV[0] ).result
end
