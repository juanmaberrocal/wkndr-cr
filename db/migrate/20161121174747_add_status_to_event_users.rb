class AddStatusToEventUsers < ActiveRecord::Migration
  def change
    add_column :event_users, :status, :string, default: 'pending'
    remove_column :event_users, :owner
    remove_column :event_users, :admin
  end
end
