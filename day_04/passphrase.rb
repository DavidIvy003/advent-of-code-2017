#!/usr/bin/env bundle exec ruby

class Passphrase
  attr_accessor :algorithm

  def initialize(algorithm)
    @algorithm = algorithm
  end

  def valid?(phrase)
    words = phrase.split(' ')
    return valid_unique_words(words) if algorithm == 'UNIQUE_WORDS'
    return valid_anagram_words(words) if algorithm == 'ANAGRAM_WORDS'
  end

  private def valid_unique_words(words)
    words.uniq.length == words.length
  end

  private def valid_anagram_words(words)
    aranged_words = words.map do |word|
      word.split('').sort
    end
    aranged_words.uniq.length == words.length
  end
end

class PassphraseValidator
  attr_accessor :filename, :method

  def initialize(filename, method)
    @filename = filename
    @method = method
  end

  def valid_count
    validator = Passphrase.new(method)
    file = File.read(filename)
    passwords = file.split("\n")
    count = 0
    passwords.each do |password|
      count += 1 if validator.valid?(password)
    end
    count
  end
end

if __FILE__ == $0
  # this will only run if the script was the main, not load'd or require'd
  puts PassphraseValidator.new( ARGV[0], ARGV[1] ).valid_count
end
