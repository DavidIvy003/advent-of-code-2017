#!/usr/bin/env bundle exec ruby

class InverseCaptcha
  attr_accessor :digits

  def initialize(number)
    @digits = number.to_s.split('')
  end

  def result
    numberMatches.inject(0, :+)
  end

  private def numberMatches
    numberMatches = []
    digits.each_with_index do |digit, index|
      nextDigit = nextDigit(index)
      if nextDigit == digit
        numberMatches.push(nextDigit.to_i)
      end
    end
    numberMatches
  end

  private def nextDigit(index)
    index + 1 < digits.length ? digits[index + 1] : digits.first
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts InverseCaptcha.new( ARGV[0] ).result
end
