FactoryGirl.define do
  
  factory :event_user do
    event
    user
    owner false
    admin false
  end

end
