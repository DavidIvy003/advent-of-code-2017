#!/usr/bin/env bundle exec ruby

class SpiralMemory
  attr_accessor :number, :grid

  def initialize(number)
    @number = number.to_i
  end

  def distance
    x, y = grid_position(@number)
    x.abs + y.abs
  end

  def value
    x, y = grid_position(@number)
    grid["#{x},#{y}"]
  end

  def first_value_above_input
    grid_position(@number, true)
    grid.values.find { |n| n > @number }
  end

  def grid_position(number)
    direction = :right
    x = 0
    y = 0
    @grid = {}
    number -= 1
    number.times do |num|
      value = cell_value(x, y, grid)
      @grid["#{x},#{y}"] = value
      x, y = move_coordinates(x, y, direction)
      direction = adjust_direction(x, y, direction, grid)
    end
    @grid["#{x},#{y}"] = cell_value(x, y, grid)
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

  def cell_value(x, y, grid)
    return 1 if x == 0 && y == 0
    value = 0
    [-1, 0, 1].each do |x_offset|
      [-1, 0, 1].each do |y_offset|
        if grid["#{x - x_offset},#{y - y_offset}"]
          value += grid["#{x - x_offset},#{y - y_offset}"]
        end
      end
    end
    value
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts SpiralMemory.new( ARGV[0] ).first_value_above_input
end
