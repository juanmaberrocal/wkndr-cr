require 'carrierwave/test/matchers'

describe AvatarUploader do
  include CarrierWave::Test::Matchers

  # let(:user) { double('user') }
  let(:user) { create(:user) }
  let(:uploader) { AvatarUploader.new(user, :avatar) }

  before do
    AvatarUploader.enable_processing = true
    File.open(Rails.root.join('app','assets','images','fallback','default.png')) { |f| uploader.store!(f) }
  end

  after do
    AvatarUploader.enable_processing = false
    uploader.remove!
  end

  context 'the thumb version' do
    it "scales down image to be exactly 30 by 30 pixels" do
      expect(uploader.thumb).to have_dimensions(30, 30)
    end
  end

  context 'the small version' do
    it "scales down image to be exactly 90 by 90 pixels" do
      expect(uploader.small).to be_no_larger_than(90, 90)
    end
  end

  context 'the default version' do
    it "scales down image to be exactly 150 by 150 pixels" do
      expect(uploader.small).to be_no_larger_than(150, 150)
    end
  end

  # it "makes the image readable only to the owner and not executable" do
  #   expect(uploader).to have_permissions(0600)
  # end

  # it "has the correct format" do
  #   expect(uploader).to be_format('png')
  # end
end