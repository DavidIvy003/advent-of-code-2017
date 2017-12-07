#!/usr/bin/env bundle exec ruby

class Checksum
  attr_accessor :rows

  def initialize(filename)
    file = File.read(filename)
    @rows = file.split("\n")
  end

  def result
    sum = 0
    rows.each do |row|
      columns = row.split(' ').map(&:to_f)
      highest = columns.max
      lowest = columns.min
      sum += highest - lowest
    end
    sum
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts InverseCaptcha.new( ARGV[0] ).result
end
