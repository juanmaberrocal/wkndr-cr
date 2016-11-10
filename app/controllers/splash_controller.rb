class SplashController < ApplicationController
	# base landing for angular SPA
	def index
		# check if user has signed in
		if user_signed_in?
			# if signed in skip splash landing
			redirect_to dashboard_path, notice: 'Welcome back!'
		else
			render layout: 'splash'
		end
	end
end
