class DashboardController < ApplicationController
	before_action :authenticate_user!, except: :index

	# base landing for angular SPA
	def index
		# ensure user has signed in
		if user_signed_in?
			render layout: 'dashboard'
		else
			# if user is not signed in kick back to splash
			redirect_to root_path, notice: 'Please Log In, or Sign Up!'
		end
	end

end
