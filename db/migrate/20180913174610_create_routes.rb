class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.string :route_name, null: false
      t.string :activity_type, null: false
      t.string :coordinates_list, null: false
      t.integer :user_id, null:false
      t.string :description
      t.timestamps
    end
  end
end
