FactoryGirl.define do
  
  factory :event do
    user
    # location nil
    title 'Test Event'
    description 'This is a test event created by FactoryGirl'
    start_date Date.today
    end_date Date.today + 1.day
    cancelled false

    factory :event_with_users do
    	transient do
				users_count 5
			end

			after(:create) do |event, evaluator|
				users = create_list(:user, evaluator.users_count)
				users.each do |user|
					create(:event_user, event: event, user: user)
				end
			end
    end
  end

end
