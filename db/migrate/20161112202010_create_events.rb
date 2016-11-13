class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :user, index: true #, foreign_key: true
      t.references :location, index: true #, foreign_key: true
      t.string :title
      t.text :description
      t.date :start_date
      t.date :end_date
      t.boolean :cancelled, default: false

      t.timestamps null: false
    end
  end
end
