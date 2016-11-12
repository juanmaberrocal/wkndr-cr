FactoryGirl.define do
  
  factory :comment do
    event
    user
    comment_block 'This is a test comment created by FactoryGirl'
  end

end
