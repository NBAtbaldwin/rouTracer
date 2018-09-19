class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.float :distance, null: false
      t.integer :duration, null: false
      t.integer :elevation
      t.string :activity_type, null: false
      t.datetime :date, null: false
      t.string :title, null: false
      t.integer :user_id, null: false
      t.integer :route_id
      t.timestamps
    end
  end
end

# id	integer	not null, primary key
# distance	integer	not null
# duration	time	not null
# elevation	integer	not null
# sport	string	not null
# date	datetime	not null
# title	string	not null
# user_id	integer	not null, foreign key
# created_at	datetime	not null
# updated_at	datetime	not null
