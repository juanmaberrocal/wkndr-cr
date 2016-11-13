FactoryGirl.define do
  
  factory :location do
    name 'Test Location'
    description 'This is a test location created by FactoryGirl'
    lat 95
    lng 180
    url_website 'test_website_url'
    url_facebook 'test_facebook_url'

    factory :location_with_events do
    	transient do
				event_count 5
			end

			after(:create) do |location, evaluator|
				create_list(:event, evaluator.event_count, location: location)
			end
		end
  end

end
