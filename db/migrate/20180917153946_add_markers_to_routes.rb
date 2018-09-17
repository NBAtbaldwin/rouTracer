class AddMarkersToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :marker_coordinates, :float, array: true, null: false
  end
end
