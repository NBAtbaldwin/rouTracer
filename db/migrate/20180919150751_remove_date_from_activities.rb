class RemoveDateFromActivities < ActiveRecord::Migration[5.2]
  def change
    remove_column :activities, :date, :datetime
    add_column :activities, :date, :string, null: false
  end
end
