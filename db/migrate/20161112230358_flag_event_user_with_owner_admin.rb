class FlagEventUserWithOwnerAdmin < ActiveRecord::Migration
  def change
  	add_column :event_users, :owner, :boolean, default: false
  	add_column :event_users, :admin, :boolean, default: false

  	remove_reference :events, :user
  end
end
