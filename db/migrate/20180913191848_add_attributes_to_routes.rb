class AddAttributesToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :est_duration, :integer, null: false
    add_column :routes, :elevation, :integer, null: false
    add_column :routes, :distance, :float, null: false
  end
end
