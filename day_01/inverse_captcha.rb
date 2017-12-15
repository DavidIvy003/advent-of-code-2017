#!/usr/bin/env bundle exec ruby

class InverseCaptcha
  attr_accessor :digits, :increment

  def initialize(number, half_way = false)
    @digits = number.to_s.split('')
    @increment = half_way ? digits.length / 2 : 1
  end

  def result
    number_matches.inject(0, :+)
  end

  private def number_matches
    matches = []
    digits.each_with_index do |digit, index|
      next_digit = next_digit(index)
      if next_digit == digit
        matches.push(next_digit.to_i)
      end
    end
    matches
  end

  private def next_digit(index)
    position = index + increment
    if index + increment >= digits.length
      position = index + increment - digits.length
    end
    digits[position]
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts InverseCaptcha.new( ARGV[0], ARGV[1] == 'true' ).result
end
