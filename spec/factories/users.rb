FactoryGirl.define  do

	factory :user do
		sequence(:username){ |n| "user#{n}" }
		sequence(:email){ |n| "user#{n}@testers.com" }
		password 'password'

		factory :user_with_friends do
			transient do
				friend_count 5
			end

			after(:create) do |user, evaluator|
				create_list(:user_friend, evaluator.friend_count, user: user)
			end
		end

		factory :user_with_events do
			transient do
				event_count 5
			end

			after(:create) do |user, evaluator|
				create_list(:event, evaluator.event_count, user: user)
			end
		end

		factory :user_with_comments do
			transient do
				comment_count 5
			end

			after(:create) do |user, evaluator|
				create_list(:comment, evaluator.comment_count, user: user)
			end
		end
	end
	
end