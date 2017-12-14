require 'minitest/autorun'
require './passphrase'

describe Passphrase do
  it 'validates unique words' do
    passphrase = Passphrase.new('UNIQUE_WORDS')
    passphrase.valid?('aa bb cc dd ee').must_equal true
    passphrase.valid?('aa bb cc dd aa').must_equal false
    passphrase.valid?('aa bb cc dd aaa').must_equal true
  end

  it 'validates anagrams' do
    passphrase = Passphrase.new('ANAGRAM_WORDS')
    passphrase.valid?('abcde fghij').must_equal true
    passphrase.valid?('abcde xyz ecdab').must_equal false
    passphrase.valid?('a ab abc abd abf abj').must_equal true
    passphrase.valid?('iiii oiii ooii oooi oooo').must_equal true
    passphrase.valid?('oiii ioii iioi iiio').must_equal false
  end
end

describe PassphraseValidator do
  it 'validates unique words' do
    PassphraseValidator.new('./input/example_01.txt', 'UNIQUE_WORDS').valid_count.must_equal 337
    PassphraseValidator.new('./input/example_02.txt', 'UNIQUE_WORDS').valid_count.must_equal 2
  end

  it 'validates anagrams' do
    PassphraseValidator.new('./input/example_01.txt', 'ANAGRAM_WORDS').valid_count.must_equal 231
    PassphraseValidator.new('./input/example_02.txt', 'ANAGRAM_WORDS').valid_count.must_equal 2
  end
end
