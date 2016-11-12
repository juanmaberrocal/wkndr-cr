FactoryGirl.define do
  
  factory :event do
    user
    # location nil
    title 'Test Event'
    description 'This is a test event created by FactoryGirl'
    start_date Date.today
    end_date Date.today + 1.day
    cancelled false
  end

end
