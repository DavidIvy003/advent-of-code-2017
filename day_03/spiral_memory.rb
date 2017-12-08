#!/usr/bin/env bundle exec ruby

class SpiralMemory
  attr_accessor :number

  def initialize(number)
    @number = number.to_i
  end

  def result
    x, y = grid_position(@number)
    x.abs + y.abs
  end

  def grid_position(number)
    direction = :down
    x = 0
    y = 0
    grid = {}
    number -= 1
    number.times do |num|
      grid["#{x},#{y}"] = num
      direction = adjust_direction(x, y, direction, grid)
      x, y = move_coordinates(x, y, direction)
    end
    [x,y]
  end

  def move_coordinates(x, y, direction)
    case direction
    when :left
      x -= 1
    when :right
      x += 1
    when :up
      y += 1
    when :down
      y -= 1
    end
    [x, y]
  end

  def adjust_direction(x, y, direction, grid)
    case direction
    when :left
      direction = :down unless grid["#{x},#{y - 1}"]
    when :right
      direction = :up unless grid["#{x},#{y + 1}"]
    when :up
      direction = :left unless grid["#{x - 1},#{y}"]
    when :down
      direction = :right unless grid["#{x + 1},#{y}"]
    end
    direction
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts SpiralMemory.new( ARGV[0] ).result
end
