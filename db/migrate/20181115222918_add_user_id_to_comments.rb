class AddUserIdToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :user_id, :integer, null: false
  end
end
