class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.text :description
      t.integer :lat
      t.integer :lng
      t.string :url_website
      t.string :url_facebook

      t.timestamps null: false
    end
  end
end
