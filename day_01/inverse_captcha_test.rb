require 'minitest/autorun'
require './inverse_captcha'

describe InverseCaptcha do
  it 'returns the correct response' do
    InverseCaptcha.new(1122).result.must_equal 3
    InverseCaptcha.new(1111).result.must_equal 4
    InverseCaptcha.new(1234).result.must_equal 0
    InverseCaptcha.new(91212129).result.must_equal 9
  end
end
