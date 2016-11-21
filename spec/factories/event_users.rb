FactoryGirl.define do
  
  factory :event_user do
    event
    user
    status 'accepted'
  end

end
