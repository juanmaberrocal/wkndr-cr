FactoryGirl.define do
  
  factory :user_friend do
    user
    association :friend, factory: :user
  end

end
